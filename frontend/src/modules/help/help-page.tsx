import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function HelpPage() {
	return (
		<main id="main" className="w-full min-w-0 p-4">
			<p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Workspace guide</p>
			<h1 className="text-2xl font-semibold tracking-tight">Help</h1>
			<p className="mt-2 text-sm text-muted-foreground">A few essentials to get you started.</p>
			<dl className="mt-7 divide-y border-y text-sm">
				<div className="grid gap-2 py-5 sm:grid-cols-[200px_1fr]">
					<dt className="font-medium">Check the connection</dt>
					<dd className="max-w-xl leading-6 text-muted-foreground">Home shows the live API and database status. Select Refresh to check again.</dd>
				</div>
				<div className="grid gap-2 py-5 sm:grid-cols-[200px_1fr]">
					<dt className="font-medium">Trouble connecting?</dt>
					<dd className="max-w-xl leading-6 text-muted-foreground">
						Start the backend and apply its database migrations. Check the environment settings in the project README, then refresh.
					</dd>
				</div>
				<div className="grid gap-2 py-5 sm:grid-cols-[200px_1fr]">
					<dt className="font-medium">Your data</dt>
					<dd className="max-w-xl leading-6 text-muted-foreground">
						The default setup stores data locally. Use Database to inspect tables and run read-only SQL queries.
					</dd>
				</div>
				<div className="grid gap-2 py-5 sm:grid-cols-[200px_1fr]">
					<dt className="font-medium">Appearance</dt>
					<dd className="max-w-xl leading-6 text-muted-foreground">
						Use the header toggle for light or dark mode. Your choice is saved in this browser.
					</dd>
				</div>
			</dl>
			<Link to="/" className="mt-6 inline-flex items-center gap-2 text-xs underline-offset-4 hover:underline">
				<ArrowLeft size={14} aria-hidden="true" />
				Back to overview
			</Link>
		</main>
	);
}
