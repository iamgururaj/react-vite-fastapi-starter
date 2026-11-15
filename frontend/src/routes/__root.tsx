import { createRootRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { AppSidebar, navigation } from "@/common/components/app-sidebar";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/common/components/ui/breadcrumb";
import { Separator } from "@/common/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/common/components/ui/sidebar";
import { TooltipProvider } from "@/common/components/ui/tooltip";

function AppLayout() {
	const { pathname } = useLocation();
	const group = navigation.find((group) => group.items.some((item) => item.to === pathname));
	const title =
		group?.items.find((item) => item.to === pathname)?.title ??
		{ "/": "Home", "/database": "Database", "/help": "Help" }[pathname] ??
		"Page not found";
	return (
		<TooltipProvider>
			<SidebarProvider>
				<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-3">
					Skip to content
				</a>
				<AppSidebar />
				<SidebarInset className="min-w-0">
					<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 my-4" />
						<Breadcrumb className="min-w-0 flex-1">
							<BreadcrumbList className="flex-nowrap">
								<BreadcrumbItem className="min-w-0">
									<BreadcrumbLink render={<Link to="/" />}>Workspace</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								{group && (
									<>
										<BreadcrumbItem className="hidden sm:block">{group.title}</BreadcrumbItem>
										<BreadcrumbSeparator className="hidden sm:block" />
									</>
								)}
								<BreadcrumbItem className="min-w-0">
									<BreadcrumbPage className="truncate">{title}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<ThemeToggle />
					</header>
					<div className="mx-auto w-full min-w-0 max-w-[1440px]">
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
export const Route = createRootRoute({
	component: AppLayout,
	notFoundComponent: () => (
		<main id="main" className="p-6">
			<h1>Page not found</h1>
			<Link to="/">Return home</Link>
		</main>
	),
});
