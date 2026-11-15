export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
	const base = import.meta.env.VITE_API_BASE_URL;
	if (!base) throw new Error("Set VITE_API_BASE_URL in frontend/.env and restart Vite.");
	const response = await fetch(`${base.replace(/\/$/, "")}${path}`, options);
	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new Error(body?.error?.message ?? `Request failed (${response.status})`);
	}
	return response.json() as Promise<T>;
}

export function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
	return apiRequest<T>(path, { signal });
}
