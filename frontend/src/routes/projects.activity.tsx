import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/modules/examples/example-page";
export const Route = createFileRoute("/projects/activity")({
	component: () => <ExamplePage title="Project activity" description="Recent updates across your projects." />,
});
