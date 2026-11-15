# Database

The /database page shows SQLite connection status, version, file name, logical database size and table names. It provides a read-only SQL editor with a scrollable result table, error feedback and truncation notice. The editor label, textarea and results table use shared shadcn/ui components.

- GET /api/database/status returns status, sqliteVersion, databaseName, sizeBytes and tables.
- POST /api/database/query accepts {"sql": "SELECT * FROM app_metadata"} and returns columns, rows, rowCount, truncated and elapsedMs.

The backend uses a separate mode=ro SQLite connection with query_only enabled. An SQLite authorizer permits reads and functions but denies writes, PRAGMAs, attachments and extension loading. Only one statement is accepted. SQL length is limited to 10,000 characters, execution to approximately 2 seconds, rows to 200, cell size to 100 KB and response text to 1 MB. BLOBs are shown as hex. No schema changes or migrations are needed.

This unauthenticated inspector is for the existing localhost development server. It can read all database tables; add authorization before exposing the API to other users or a network. CORS is not authentication.

Repository behavior was checked against a temporary database without adding test files: status, reads, row limits, blocked writes/attach/extensions/multiple statements, query timeout, and preserved data. End-to-end API integration and browser behavior remain unverified. See the root README for project-wide verification status.
