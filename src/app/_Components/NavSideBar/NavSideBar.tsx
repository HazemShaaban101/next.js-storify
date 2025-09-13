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
	Spotlight,
	ScanBarcode,
	Tags,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
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

import {
	siFacebook,
	siGithub,
	siInstagram,
	siTiktok,
	siWhatsapp,
} from "simple-icons";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "@/nextauth";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { CartCountBadge } from "../CartCountContext/CartCountContext";

// Menu items.
const menuItems = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Products",
		url: "/products",
		icon: ScanBarcode,
	},
	{
		title: "Categories",
		url: "/categories",
		icon: Tags,
	},
	{
		title: "Brands",
		url: "/brands",
		icon: Spotlight,
	},
];
const footerItems = [
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
];

export default function NavSideBar() {
	const { setTheme, theme } = useTheme();
	const session = useSession();

	const cartCount: { cartCountState: number; setCartCountState: Function } =
		useContext(CartCountBadge);

	console.log(session);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="my-3">
						<div className="flex justify-between items-center w-full">
							<p className="flex items-center gap-2">
								<Store
									color={"oklch(52% 0.105 223.128)"}
									size={30}
								/>
								<span className="text-lg/tight font-mono font-extrabold">
									Storify
								</span>
							</p>
							<Button
								className="py-4 bg-white text-dark shadow-lg hover:bg-cyan-100 focus:bg-cyan-100 dark:bg-slate-800 dark:text-white dark:hover:bg-cyan-950 dark:focus:bg-cyan-950 cursor-pointer"
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
					<hr className="my-1 border-2 rounded-full" />
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
							{session.status == "authenticated" && (
								<SidebarMenuItem key={"cart"}>
									<SidebarMenuButton asChild>
										<Link href={"/cart"} className="">
											<ShoppingCart />
											<span>{"Cart"}</span>
											<Badge
												variant="default"
												className="ml-auto">
												{cartCount?.cartCountState!}
											</Badge>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					{session.status == "authenticated" ? (
						<>
							<p className="font-mono font-bold text-center">
								Hello {session.data.user.name}!
							</p>
							<SidebarMenuItem key={"logOut"}>
								<SidebarMenuButton asChild>
									<Button
										className=" hover:bg-red-700 dark:hover:bg-red-800 hover:text-white transition-all duration-300 font-mono font-bold text-sm/relaxed cursor-pointer"
										onClick={() => {
											signOut();
										}}>
										Log out
									</Button>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</>
					) : session.status == "loading" ? (
						<>
							<Skeleton className="h-[30px] w-full rounded-full" />
							<Skeleton className="h-[30px] w-full rounded-full" />
						</>
					) : (
						footerItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))
					)}

					<hr className="my-2 border-2 rounded-full" />

					{/* social media links */}
					<div className="flex">
						<SidebarMenuButton asChild>
							<Link
								href={"https://github.com"}
								className="justify-center">
								<div className="icon text-center box-border py-5">
									<svg
										role="img"
										viewBox="0 0 24 24" // Simple Icons are typically 24x24
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										style={
											theme == "light"
												? { fill: "#000000" }
												: { fill: "#ffffff" }
										} // Use the icon's hex color
									>
										<title>{siGithub.title}</title>
										<path d={siGithub.path} />
									</svg>
								</div>
							</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild>
							<Link
								href={"https://facebook.com"}
								className="justify-center">
								<div className="icon text-center">
									<svg
										role="img"
										viewBox="0 0 24 24" // Simple Icons are typically 24x24
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										style={{ fill: "#0866FF" }} // Use the icon's hex color
									>
										<title>{siFacebook.title}</title>
										<path d={siFacebook.path} />
									</svg>
								</div>
							</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild>
							<Link
								href={"https://instagram.com"}
								className="justify-center">
								<div className="icon text-center">
									<svg
										role="img"
										viewBox="0 0 24 24" // Simple Icons are typically 24x24
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										style={{ fill: "#FF0069" }} // Use the icon's hex color
									>
										<title>{siInstagram.title}</title>
										<path d={siInstagram.path} />
									</svg>
								</div>
							</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild>
							<Link
								href={"https://whatsapp.com"}
								className="justify-center">
								<div className="icon text-center">
									<svg
										role="img"
										viewBox="0 0 24 24" // Simple Icons are typically 24x24
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										style={{ fill: "#25D366" }} // Use the icon's hex color
									>
										<title>{siWhatsapp.title}</title>
										<path d={siWhatsapp.path} />
									</svg>
								</div>
							</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild>
							<Link
								href={"https://tiktok.com"}
								className="justify-center">
								<div className="icon text-center box-border py-5">
									<svg
										role="img"
										viewBox="0 0 24 24" // Simple Icons are typically 24x24
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										style={
											theme == "light"
												? { fill: "#000000" }
												: { fill: "#ffffff" }
										} // Use the icon's hex color
									>
										<title>{siTiktok.title}</title>
										<path d={siTiktok.path} />
									</svg>
								</div>
							</Link>
						</SidebarMenuButton>
					</div>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
