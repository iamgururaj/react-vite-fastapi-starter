import sqlite3
from pathlib import Path

from fastapi import HTTPException

from common.database import engine
from modules.database import repositories
from modules.database.schemas import DatabaseStatus, QueryResult


def database_path() -> Path:
    name = engine.url.database
    if not name or name == ":memory:":
        raise HTTPException(503, "Database inspection requires a file-backed SQLite database.")
    return Path(name)


def get_status() -> DatabaseStatus:
    try:
        return DatabaseStatus(**repositories.read_status(database_path()))
    except sqlite3.Error as exc:
        raise HTTPException(503, "Database unavailable. Apply migrations and check the server configuration.") from exc


def run_query(sql: str) -> QueryResult:
    if not sql.strip():
        raise HTTPException(422, "Enter a SQL query.")
    try:
        return QueryResult(**repositories.execute_query(database_path(), sql))
    except (sqlite3.Error, ValueError) as exc:
        raise HTTPException(400, f"Query rejected: {exc}") from exc
