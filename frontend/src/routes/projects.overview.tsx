import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/modules/examples/example-page";
export const Route = createFileRoute("/projects/overview")({
	component: () => <ExamplePage title="Projects overview" description="A place to organize your projects." />,
});
