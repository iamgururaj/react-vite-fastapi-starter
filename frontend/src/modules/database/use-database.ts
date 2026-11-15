import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet, apiRequest } from "@/common/api";

interface DatabaseStatus {
	status: string;
	sqliteVersion: string;
	databaseName: string;
	sizeBytes: number;
	tables: string[];
}
interface QueryResult {
	columns: string[];
	rows: (string | number | null)[][];
	rowCount: number;
	truncated: boolean;
	elapsedMs: number;
}

export function useDatabaseStatus() {
	return useQuery({ queryKey: ["database-status"], queryFn: ({ signal }) => apiGet<DatabaseStatus>("/api/database/status", signal), retry: false });
}
export function useDatabaseQuery() {
	return useMutation({
		mutationFn: (sql: string) =>
			apiRequest<QueryResult>("/api/database/query", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sql }),
			}),
	});
}
