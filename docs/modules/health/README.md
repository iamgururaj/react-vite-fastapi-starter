# Health

GET /api/health returns status, databaseStatus and schemaLabel in camelCase. It reads app_metadata row 1 through the repository; migration 0001 creates and seeds this row. Missing schema or inaccessible storage produces a 503 error envelope without exposing database details.

The landing page displays loading, connection failure/retry, and the successful JSON response. Refresh requests use TanStack Query; fetch cancellation is propagated through the shared API client.
