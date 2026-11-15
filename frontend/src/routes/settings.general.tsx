import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/modules/examples/example-page";
export const Route = createFileRoute("/settings/general")({
	component: () => <ExamplePage title="General settings" description="Workspace preferences and configuration." />,
});
