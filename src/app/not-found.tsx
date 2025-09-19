"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import * as motion from "motion/react-client";

export default function handleIntrusiveUser() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/");
		}, 5000);
	}, []);
	return (
		<>
			<motion.div
				className="min-h-[calc(100vh-2rem-60px)] flex justify-center items-center flex-wrap content-center gap-10 bg-[linear-gradient(0deg,#0f172b,#104e64,#0b4f4a)] from-slate-900 via-cyan-900 to-teal-900 rounded-2xl easteregg-bg"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						type: "spring",
						stiffness: 100,
					},
				}}>
				<motion.h1
					className="text-center font-mono font-bold text-3xl w-full text-red-700 animate-EasterEgg"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						opacity: 1,
						scale: 1,
						transition: {
							duration: 0.5,
							delay: 0.5,
							type: "spring",
							stiffness: 100,
						},
					}}>
					Don't be a naughty fella...stick to your routes!
				</motion.h1>
				<motion.h2
					className="funt-mono text-xl w-full text-center animate-EasterEgg"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						opacity: 1,
						scale: 1,
						transition: {
							duration: 0.5,
							delay: 1,
							type: "spring",
							stiffness: 100,
						},
					}}>
					You Are being redirected home.
				</motion.h2>
			</motion.div>
		</>
	);
}
