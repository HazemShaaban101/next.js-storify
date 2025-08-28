"use client";
import {
	Calendar,
	Home,
	Inbox,
	Search,
	Settings,
	LogIn,
	UserPlus,
	ShoppingCart,
	Apple,
	Store,
	Sun,
	Moon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Products",
		url: "/products",
		icon: Apple,
	},
	{
		title: "Cart",
		url: "/cart",
		icon: ShoppingCart,
	},
	{
		title: "Login",
		url: "/login",
		icon: LogIn,
	},
	{
		title: "Register",
		url: "/register",
		icon: UserPlus,
	},
	{
		title: "not found",
		url: "/sdasdasdasd",
		icon: Settings,
	},
];

export default function NavSideBar() {
	const { setTheme, theme } = useTheme();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="my-3">
						<div className="flex justify-between items-center w-full">
							<p className="flex items-center gap-2">
								<Store
									color={"oklch(52% 0.105 223.128)"}
									size={20}
								/>
								<span className="text-lg">Storify</span>
							</p>
							<Button
								className="bg-white text-dark shadow-lg hover:bg-cyan-100 focus:bg-cyan-100 dark:bg-slate-800 dark:text-white dark:hover:bg-cyan-950 dark:focus:bg-cyan-950"
								variant={"default"}
								onClick={(e) => {
									theme == "light"
										? (() => {
												setTheme("dark");
												e.currentTarget.blur();
										  })()
										: (() => {
												setTheme("light");
												e.currentTarget.blur();
										  })();
								}}>
								{theme == "light" ? <Sun /> : <Moon />}
							</Button>
						</div>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
