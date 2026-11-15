import { createFileRoute } from "@tanstack/react-router";
import { DatabasePage } from "@/modules/database/database-page";

export const Route = createFileRoute("/database")({ component: DatabasePage });
