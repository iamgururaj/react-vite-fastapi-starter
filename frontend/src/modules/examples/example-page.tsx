export function ExamplePage({ title, description }: { title: string; description: string }) {
	return (
		<main id="main" className="w-full min-w-0 p-4">
			<p className="mb-2 text-xs text-muted-foreground">Sample workspace</p>
			<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			<p className="mt-2 text-sm text-muted-foreground">{description}</p>
			<section className="mt-6 rounded-xl border p-5">
				<h2 className="text-sm font-medium">Demo content</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Use the sidebar to explore sample pages. Expand or close a section using its arrow, or collapse the sidebar using the header toggle.
				</p>
			</section>
		</main>
	);
}
