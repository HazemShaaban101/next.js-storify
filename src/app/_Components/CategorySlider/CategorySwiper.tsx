"use client";
import React from "react";
import "swiper/css";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CategoryType } from "@/app/_interfaces/categories.interface";
import { motion } from "framer-motion/";
import Image from "next/image";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
	return (
		<>
			{/* <div className="relative overflow-hidden w-full">
				<h2 className="text-center text-xl text-white/70 my-5">
					Trusted by the world&apos;s most innovative companies
				</h2>
				<div className="flex w-full min-w-0">
					<motion.div
						className="flex w-full max-w-full gap-10"
						transition={{
							duration: 10,
							ease: "linear",
							repeat: Infinity,
						}}
						initial={{ translateX: 0 }}
						animate={{ translateX: "-50%" }}>
						{data.map((category) => {
							return (
								<div
									className="w-1/8 h-full"
									key={category._id}>
									<Card className="w-full max-w-sm h-full">
										<CardContent className="">
											<img
												src={category?.image}
												alt={category?.slug}
												className="object-cover w-[100px] h-[100px]"
											/>
										</CardContent>
										<CardFooter className=" overflow-hidden">
											<p className="text-center text-sm w-full ">
												{category?.name}
											</p>
										</CardFooter>
									</Card>
								</div>
							);
						})}
					</motion.div>
				</div>
			</div> */}

			<div className="container p-5 w-full overflow-hidden relative">
				<div className="flex mx-auto relative overflow-hidden before:absolute rounded-lg before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent after:content-['']">
					<motion.div
						transition={{
							duration: 10,
							ease: "linear",
							repeat: Infinity,
							repeatType: "reverse",
						}}
						initial={{ translateX: 0 }}
						animate={{ translateX: "-40%" }}
						className="flex flex-none gap-5 p-5 overflow-hidden">
						{data.map((category) => {
							return (
								<div
									className="w-1/8 h-full"
									key={category._id}>
									<Card className="w-full max-w-sm h-full">
										<CardContent className="">
											<Image
												src={category?.image}
												alt={category?.slug}
												width={100}
												height={100}
												className="object-cover w-[100px] h-[100px]"
											/>
										</CardContent>
										<CardFooter className=" overflow-hidden">
											<p className="text-center text-sm w-full ">
												{category?.name}
											</p>
										</CardFooter>
									</Card>
								</div>
							);
						})}
					</motion.div>
				</div>
			</div>
		</>
	);
}
