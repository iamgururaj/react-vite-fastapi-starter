import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/modules/health/landing-page";

export const Route = createFileRoute("/")({ component: LandingPage });
