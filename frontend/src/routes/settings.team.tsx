import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/modules/examples/example-page";
export const Route = createFileRoute("/settings/team")({
	component: () => <ExamplePage title="Team settings" description="People and roles in your workspace." />,
});
