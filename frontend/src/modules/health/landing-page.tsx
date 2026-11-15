import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Database, RotateCw } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { useHealth } from "./use-health";

export function LandingPage() {
	const health = useHealth();
	return (
		<main id="main" className="w-full min-w-0 p-4">
			<div className="mb-7 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Personal workspace</p>
					<h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
					<p className="mt-2 text-sm text-muted-foreground">Your workspace, at a glance.</p>
				</div>
				<Link to="/help" className="inline-flex items-center gap-1 text-xs underline-offset-4 hover:underline">
					Getting started <ArrowUpRight size={14} aria-hidden="true" />
				</Link>
			</div>
			<section aria-labelledby="connection-title" className="border bg-card">
				<div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
					<h2 id="connection-title" className="flex items-center gap-2 text-sm font-semibold">
						<Database size={16} aria-hidden="true" />
						Connection
					</h2>
					<Button variant="outline" disabled={health.isFetching} onClick={() => void health.refetch()}>
						<RotateCw size={14} aria-hidden="true" className={health.isFetching ? "animate-spin" : ""} />
						{health.isFetching ? "Checking..." : "Refresh"}
					</Button>
				</div>
				<div aria-live="polite" role="status" className="px-4 py-4">
					{health.isPending ? (
						<p className="text-sm text-muted-foreground">Connecting to your workspace...</p>
					) : health.isError ? (
						<div>
							<p className="text-sm font-medium text-destructive">Unable to connect</p>
							<p className="mt-1 break-words text-xs leading-6 text-muted-foreground">{health.error.message}</p>
							<p className="mt-2 text-xs text-muted-foreground">Check the backend and database setup, then refresh.</p>
						</div>
					) : (
						<dl className="grid gap-5 text-sm sm:grid-cols-3">
							<div>
								<dt className="mb-1 text-xs text-muted-foreground">API status</dt>
								<dd className="font-mono text-success">{health.data.status}</dd>
							</div>
							<div>
								<dt className="mb-1 text-xs text-muted-foreground">Database</dt>
								<dd className="font-mono">{health.data.databaseStatus}</dd>
							</div>
							<div>
								<dt className="mb-1 text-xs text-muted-foreground">Schema</dt>
								<dd className="font-mono">{health.data.schemaLabel}</dd>
							</div>
						</dl>
					)}
				</div>
				{health.data && !health.isError && (
					<details className="border-t px-4 py-3 text-xs">
						<summary className="cursor-pointer text-muted-foreground">API response</summary>
						<pre className="mt-3 overflow-x-auto bg-muted p-3 leading-6">{JSON.stringify(health.data, null, 2)}</pre>
					</details>
				)}
			</section>
			<p className="mt-4 text-xs text-muted-foreground">Local workspace. Ready for your next application.</p>
		</main>
	);
}
