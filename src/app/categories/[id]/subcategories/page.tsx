"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function handleIntrusiveUser() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/");
		}, 5000);
	}, []);
	return (
		<>
			<div className="min-h-[calc(100vh-2rem-60px)] flex justify-center items-center flex-wrap content-center gap-10 bg-[linear-gradient(0deg,#0f172b,#104e64,#0b4f4a)] from-slate-900 via-cyan-900 to-teal-900 rounded-2xl easteregg-bg">
				<h1 className="text-center font-mono font-bold text-3xl w-full text-red-700 animate-EasterEgg">
					Don't be a naughty fella...stick to your routes!
				</h1>
				<h2 className="funt-mono text-xl w-full text-center animate-EasterEgg delay-1000">
					You Are being redirected home.
				</h2>
			</div>
		</>
	);
}
