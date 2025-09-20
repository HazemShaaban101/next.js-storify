import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavSideBar from "./_Components/NavSideBar/NavSideBar";
import MySessionProvider from "./_Components/MySessionProvider/MySessionProvider";
import { Toaster } from "@/components/ui/sonner";
import CartCountContext from "./_Components/CartCountContext/CartCountContext";
import WishlistContext from "./_Components/WishlistContext/WishlistContext";
import Footer from "./_Components/Footer/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Storify - by Hazem Shaaban",
	description: "Where products are imaginary!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<CartCountContext>
						<WishlistContext>
							<SidebarProvider defaultOpen={false}>
								<MySessionProvider>
									<NavSideBar />
									<main className="w-full relative">
										<div className="w-full flex">
											<div className="w-full p-2 m-2 rounded-sm bg-gray-100 dark:bg-slate-900">
												<SidebarTrigger className=" p-5 mb-5 bg-white hover:bg-cyan-100 shadow dark:bg-slate-800 dark:hover:bg-cyan-950 cursor-pointer" />
												<Toaster
													closeButton
													position="top-center"
												/>
												{children}
											</div>
										</div>
										<div className="mx-2 mb-2">
											<Footer />
										</div>
									</main>
								</MySessionProvider>
							</SidebarProvider>
						</WishlistContext>
					</CartCountContext>
				</ThemeProvider>
			</body>
		</html>
	);
}
