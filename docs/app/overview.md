# **Application Overview**

- Minimal monorepo starter with React frontend and FastAPI backend.
- Frontend uses Zustand, TanStack Router and Query with a shared fetch client.
- FastAPI routes delegate to services and repositories.
- SQLModel manages SQLite metadata; Alembic handles migrations.
- API errors consistently use `error.message`.
- Features live in `frontend/src/modules` and `backend/src/modules`, using matching module names.
- Shared infrastructure lives in each application's `common` directory.
- Domain-specific features are left to consuming applications.
- Root README covers setup, shared UI components and verification status.
- Database provides SQLite details and a bounded, read-only query runner through `/api/database` endpoints.

## **UI**

- Uses shadcn/ui Base Nova preset with compact Base UI controls.
- Support light/dark themes with shared CSS tokens, persisted preference and system default.
- Initialize theme before rendering to prevent flashing.
- Sidebar supports Home, Database and Help, with collapsible icon mode and responsive defaults.
- App shell uses shadcn sidebar-07 with a flush main panel, compact left-aligned breadcrumbs and responsive page content capped at 1440px, a mobile drawer and expandable Projects/Settings sample routes.
