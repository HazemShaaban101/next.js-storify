"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
	const { setTheme, theme } = useTheme();
	return (
		<>
			<h1 className="text-green-400">Home</h1>
			<Button
				variant={"default"}
				onClick={() => {
					theme == "light" ? setTheme("dark") : setTheme("light");
				}}>
				DarkMode toggle
			</Button>
		</>
	);
}
