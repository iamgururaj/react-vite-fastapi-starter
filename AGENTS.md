# Agent Instructions

- **Dependencies:** Use latest stable, maintained, open-source libraries. Avoid deprecated APIs and packages.
- **Tooling:** Invoke `pnpm` directly. Run Python skill validators with `uv run --no-project --with pyyaml python <validator-path> <skill-directory>` so PyYAML is available without adding it to application dependencies.
- **Monorepo:** Maintain separate `frontend/` and `backend/` folders.
- **Modules:** Keep each module self-contained under `modules/module_name/`, including its UI and backend code.
- **Shared Code:** Keep reusable frontend and backend code in their respective `common/` directories.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui and ReUI.
- **Backend:** Python, FastAPI and SQLModel.
- **Database:** Local SQLite (`db/app.db`), gitignored. Use Alembic for all schema changes.
- **API:** Follow REST conventions. Use camelCase for API requests/responses and snake_case for Python and database fields.
- **Architecture:** Separate routes, services, repositories and models. Keep request/response schemas separate from database models.
- **Frontend API:** Centralize API calls in a shared API client.
- **Configuration:** Use environment variables. Never hardcode secrets or environment-specific URLs.
- **Error Handling:** Use consistent API errors and meaningful UI error states.
- **Code Reuse:** Reuse existing common utilities and components. Avoid duplication and unnecessary dependencies.
- **UI:** Build responsive, accessible interfaces. Prefer shadcn/ui and ReUI components.
- **Code Quality:** Keep code simple, modular and maintainable. Avoid unnecessary abstractions.
- **Testing:** Do not create tests unless explicitly requested.
- **Documentation:** Keep documentation concise and updated. Avoid redundant content.

## Editing workflow

- Reuse available context; refresh changed files. Read targeted sections with `rg`.
- Format/lint changed files via CLI: Biome for supported files anywhere in the repo; Ruff for Python. Follow repository configuration.
- Resolve diagnostics, then run required checks. Repeat after relevant changes or failures.
- Keep diffs focused. Batch independent checks, preserve exit codes and summarize output.
- Keep guidance stable and concise; report cache/token savings only when measured.

## Context

- **Frontend:** `frontend/AGENTS.md` – Frontend-specific instructions.
- **Backend:** `backend/AGENTS.md` – Backend-specific instructions.
- **Application Docs:** `docs/app/overview.md`
- **Module Docs:** `docs/modules/module_name/README.md`

Maintain application and module context under `docs/`, following the module structure.
