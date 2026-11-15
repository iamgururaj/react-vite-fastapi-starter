# Backend

Follow root AGENTS.md. Python dependencies are managed by uv. Keep all application and migration directories under src/: modules/<module>/ owns separate routes, services, repositories, database models and response schemas; common/ owns configuration and database infrastructure. Keep project configuration at backend root. Register SQLModel models in src/migrations/env.py; use Alembic for every schema change. Use Ruff for Python formatting/linting with line-length 150 and Pyright for type checking. Start uvicorn with --app-dir src. No tests unless requested.
