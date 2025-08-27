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
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="my-3">
						<p className="flex items-center gap-2">
							<Store
								color={"oklch(52% 0.105 223.128)"}
								size={20}
							/>
							<span className="text-lg">Storify</span>
						</p>
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
