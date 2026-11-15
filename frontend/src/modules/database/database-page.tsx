import { Play, RotateCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Textarea } from "@/common/components/ui/textarea";
import { useDatabaseQuery, useDatabaseStatus } from "./use-database";

export function DatabasePage() {
	const status = useDatabaseStatus();
	const query = useDatabaseQuery();
	const [sql, setSql] = useState("SELECT name, type FROM sqlite_schema ORDER BY name;");
	return (
		<main id="main" className="w-full min-w-0 p-4">
			<div className="mb-6 flex items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Database</h1>
					<p className="mt-2 text-sm text-muted-foreground">Inspect your local SQLite database.</p>
				</div>
				<Button variant="outline" disabled={status.isFetching} onClick={() => void status.refetch()}>
					<RotateCw size={14} aria-hidden="true" />
					Refresh
				</Button>
			</div>
			<section aria-label="Database status" className="border-y py-4">
				<div role="status" aria-live="polite">
					{status.isPending ? (
						<p className="text-sm">Loading database details...</p>
					) : status.isError ? (
						<p className="text-sm text-destructive">{status.error.message}</p>
					) : (
						<>
							<dl className="grid grid-cols-2 gap-4 text-xs lg:grid-cols-4">
								<div>
									<dt className="text-muted-foreground">Connection</dt>
									<dd className="mt-1 font-mono text-success">{status.data.status}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">File</dt>
									<dd className="mt-1 font-mono">{status.data.databaseName}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">SQLite</dt>
									<dd className="mt-1 font-mono">{status.data.sqliteVersion}</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Size</dt>
									<dd className="mt-1 font-mono">{status.data.sizeBytes.toLocaleString()} bytes</dd>
								</div>
							</dl>
							<p className="mt-4 break-words text-xs text-muted-foreground">
								Tables ({status.data.tables.length}): {status.data.tables.join(", ") || "None"}
							</p>
						</>
					)}
				</div>
			</section>
			<form
				className="mt-6"
				onSubmit={(event) => {
					event.preventDefault();
					query.mutate(sql);
				}}
			>
				<Label htmlFor="sql-query" className="text-sm font-semibold">
					SQL query
				</Label>
				<p id="query-hint" className="mt-1 text-xs text-muted-foreground">
					Read-only. Up to 200 rows; queries stop after 2 seconds of execution.
				</p>
				<Textarea
					id="sql-query"
					aria-describedby="query-hint"
					value={sql}
					onChange={(event) => setSql(event.target.value)}
					maxLength={10000}
					required
					spellCheck={false}
					className="mt-3 min-h-32 w-full resize-y border bg-card p-3 font-mono text-xs leading-6 md:text-xs"
				/>
				<div className="mt-2 flex justify-end">
					<Button type="submit" disabled={query.isPending || !sql.trim()}>
						<Play size={14} aria-hidden="true" />
						{query.isPending ? "Running..." : "Run query"}
					</Button>
				</div>
			</form>
			<div className="mt-5" aria-live="polite" role="status">
				{query.isError && <p className="break-words text-sm text-destructive">{query.error.message}</p>}
				{query.isSuccess && (
					<p className="text-xs text-muted-foreground">
						{query.data.rowCount} rows · {query.data.elapsedMs} ms{query.data.truncated ? " · Showing first 200 rows; result truncated." : ""}
					</p>
				)}
			</div>
			{query.isSuccess && (
				<section
					className="mt-3 max-h-96 overflow-auto border [&>[data-slot=table-container]]:overflow-visible"
					// biome-ignore lint/a11y/noNoninteractiveTabindex: Allow keyboard users to scroll query results.
					tabIndex={0}
					aria-label="Query results"
				>
					<Table className="w-full border-collapse text-left text-xs">
						<TableCaption className="sr-only">SQL query results</TableCaption>
						<TableHeader className="sticky top-0 bg-muted">
							<TableRow>
								{query.data.columns.map((column, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: SQL column names can repeat; result positions are fixed.
									<TableHead key={`${index}-${column}`} scope="col" className="h-auto whitespace-nowrap border-b px-3 py-2 font-medium">
										{column}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{query.data.rows.map((row, index) => (
								<TableRow key={JSON.stringify([index, row])} className="border-b last:border-0">
									{row.map((cell, column) => (
										<TableCell
											// biome-ignore lint/suspicious/noArrayIndexKey: SQL column names can repeat; result positions are fixed.
											key={`${column}-${query.data.columns[column]}`}
											className="max-w-xs whitespace-normal break-words px-3 py-2 font-mono align-top"
										>
											{cell === null ? <span className="text-muted-foreground">NULL</span> : String(cell)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
					{query.data.rowCount === 0 && <p className="p-4 text-xs text-muted-foreground">Query returned no rows.</p>}
				</section>
			)}
		</main>
	);
}
