import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/common/api";
export interface Health {
	status: string;
	databaseStatus: string;
	schemaLabel: string;
}
export function useHealth() {
	return useQuery({ queryKey: ["health"], queryFn: ({ signal }) => apiGet<Health>("/api/health", signal), retry: false });
}
