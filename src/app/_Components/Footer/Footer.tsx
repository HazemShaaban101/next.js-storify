"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { siGithub, siHackerrank, siGmail } from "simple-icons";
import linkedin from "../../../../public/linkedin.png";
import * as motion from "motion/react-client";

export default function Footer() {
	const { theme } = useTheme();
	return (
		<div className="w-full rounded-sm bg-[#F3F4F6] dark:bg-[#0F172B] py-4 ">
			<p className="font-mono text-center text-lg">
				Created by Hazem Shaaban Bakry for Route Academy
			</p>
			<div className="links flex items-center justify-center gap-2 w-full mt-2">
				<motion.div
					className="icon text-center"
					initial={{ y: 0 }}
					whileHover={{
						y: -3,
						transition: {
							duration: 0.3,
							type: "spring",
							stiffness: 1000,
						},
					}}>
					<Link href={"https://github.com/HazemShaaban101"}>
						<svg
							role="img"
							viewBox="0 0 24 24" // Simple Icons are typically 24x24
							xmlns="http://www.w3.org/2000/svg"
							width={28}
							height={28}
							style={
								theme == "light"
									? { fill: "#000000" }
									: { fill: "#ffffff" }
							} // Use the icon's hex color
						>
							<title>{siGithub.title}</title>
							<path d={siGithub.path} />
						</svg>
					</Link>
				</motion.div>
				<motion.div
					className="icon text-center"
					initial={{ y: 0 }}
					whileHover={{
						y: -3,
						transition: {
							duration: 0.3,
							type: "spring",
							stiffness: 1000,
						},
					}}>
					<Link href={"https://www.linkedin.com/in/hazemshaaban101/"}>
						<div className="rounded-full bg-white flex justify-center items-center w-[28px] h-[28px] invert-100 dark:invert-0">
							<Image
								src={linkedin}
								alt="linkedin"
								width={20}
								height={20}
							/>
						</div>
					</Link>
				</motion.div>
				<motion.div
					className="icon text-center"
					initial={{ y: 0 }}
					whileHover={{
						y: -3,
						transition: {
							duration: 0.3,
							type: "spring",
							stiffness: 1000,
						},
					}}>
					<Link
						href={`https://www.hackerrank.com/profile/7azemsh3baan`}>
						<svg
							className="rounded-full"
							role="img"
							viewBox="0 0 24 24" // Simple Icons are typically 24x24
							xmlns="http://www.w3.org/2000/svg"
							width={28}
							height={28}
							style={
								theme == "light"
									? { fill: "#000000" }
									: { fill: "#ffffff" }
							} // Use the icon's hex color
						>
							<title>{siHackerrank.title}</title>
							<path d={siHackerrank.path} />
						</svg>
					</Link>
				</motion.div>
				<motion.div
					className="icon text-center"
					initial={{ y: 0 }}
					whileHover={{
						y: -3,
						transition: {
							duration: 0.3,
							type: "spring",
							stiffness: 1000,
						},
					}}>
					<Link href={"mailto:7azemsh3baan@gmail.com"}>
						<svg
							role="img"
							viewBox="0 0 24 24" // Simple Icons are typically 24x24
							xmlns="http://www.w3.org/2000/svg"
							width={28}
							height={28}
							style={
								theme == "light"
									? { fill: "#000000" }
									: { fill: "#ffffff" }
							} // Use the icon's hex color
						>
							<title>{siGmail.title}</title>
							<path d={siGmail.path} />
						</svg>
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
