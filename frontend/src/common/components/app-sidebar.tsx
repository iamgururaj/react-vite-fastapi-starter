import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, CircleHelp, Database, Folder, House, Settings } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	useSidebar,
} from "./ui/sidebar";

export const navigation = [
	{
		title: "Projects",
		icon: Folder,
		items: [
			{ title: "Overview", to: "/projects/overview" },
			{ title: "Activity", to: "/projects/activity" },
		],
	},
	{
		title: "Settings",
		icon: Settings,
		items: [
			{ title: "General", to: "/settings/general" },
			{ title: "Team", to: "/settings/team" },
		],
	},
] as const;
export function AppSidebar() {
	const { pathname } = useLocation();
	const { setOpenMobile, setOpen, state } = useSidebar();
	return (
		<Sidebar collapsible="icon" variant="sidebar">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" render={<Link to="/" />}>
							<img src="/favicon.svg" alt="" className="size-8" />
							<span className="font-semibold">App Name</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<nav aria-label="Main navigation">
					<SidebarGroup>
						<SidebarGroupLabel>Workspace</SidebarGroupLabel>
						<SidebarMenu>
							{(
								[
									{ title: "Home", to: "/", icon: House },
									{ title: "Database", to: "/database", icon: Database },
									{ title: "Help", to: "/help", icon: CircleHelp },
								] as const
							).map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={pathname === item.to}
										render={<Link to={item.to} />}
										onClick={() => setOpenMobile(false)}
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Examples</SidebarGroupLabel>
						<SidebarMenu>
							{navigation.map((group) => (
								<Collapsible key={group.title} defaultOpen={true} className="group/collapsible" render={<SidebarMenuItem />}>
									<CollapsibleTrigger
										render={<SidebarMenuButton tooltip={group.title} />}
										onClick={() => {
											if (state === "collapsed") setOpen(true);
										}}
									>
										<group.icon />
										<span>{group.title}</span>
										<ChevronRight className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{group.items.map((item) => (
												<SidebarMenuSubItem key={item.to}>
													<SidebarMenuSubButton isActive={pathname === item.to} render={<Link to={item.to} />} onClick={() => setOpenMobile(false)}>
														{item.title}
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</nav>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
