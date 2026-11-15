import sqlite3
import time
from contextlib import closing
from pathlib import Path

ROW_LIMIT = 200


def connect_read_only(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(f"{path.resolve().as_uri()}?mode=ro", uri=True, timeout=2)
    connection.execute("PRAGMA query_only = ON")
    connection.setlimit(sqlite3.SQLITE_LIMIT_LENGTH, 100000)
    connection.setlimit(sqlite3.SQLITE_LIMIT_SQL_LENGTH, 10000)
    connection.setlimit(sqlite3.SQLITE_LIMIT_COLUMN, 100)
    connection.setlimit(sqlite3.SQLITE_LIMIT_EXPR_DEPTH, 50)
    connection.setlimit(sqlite3.SQLITE_LIMIT_ATTACHED, 0)
    return connection


def read_status(path: Path) -> dict:
    with closing(connect_read_only(path)) as connection:
        tables = connection.execute("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").fetchall()
        pages = connection.execute("PRAGMA page_count").fetchone()[0]
        page_size = connection.execute("PRAGMA page_size").fetchone()[0]
        return {
            "status": "connected",
            "sqlite_version": sqlite3.sqlite_version,
            "database_name": path.name,
            "size_bytes": pages * page_size,
            "tables": [row[0] for row in tables],
        }


def execute_query(path: Path, sql: str) -> dict:
    started = time.monotonic()
    with closing(connect_read_only(path)) as connection:

        def authorize(action, arg1, arg2, database, source):
            if action == sqlite3.SQLITE_FUNCTION and (arg2 or "").lower() == "load_extension":
                return sqlite3.SQLITE_DENY
            return (
                sqlite3.SQLITE_OK
                if action in {sqlite3.SQLITE_SELECT, sqlite3.SQLITE_READ, sqlite3.SQLITE_FUNCTION, sqlite3.SQLITE_RECURSIVE}
                else sqlite3.SQLITE_DENY
            )

        connection.set_authorizer(authorize)
        connection.set_progress_handler(lambda: int(time.monotonic() - started > 2), 1000)
        cursor = connection.execute(sql)
        if cursor.description is None:
            raise ValueError("Enter a SELECT query that returns rows.")
        rows = cursor.fetchmany(ROW_LIMIT + 1)
        # Bound response size as well as row count; oversized SQLite cells are rejected by SQLITE_LIMIT_LENGTH.
        if sum(sum(len(str(cell)) for cell in row) for row in rows) > 1_000_000:
            raise ValueError("Result is too large. Select fewer columns or rows.")
        return {
            "columns": [column[0] for column in cursor.description],
            "rows": [[cell.hex() if isinstance(cell, bytes) else cell for cell in row] for row in rows[:ROW_LIMIT]],
            "row_count": min(len(rows), ROW_LIMIT),
            "truncated": len(rows) > ROW_LIMIT,
            "elapsed_ms": round((time.monotonic() - started) * 1000, 2),
        }
