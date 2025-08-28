"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow, EffectFade } from "swiper/modules";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CategoryType } from "@/app/_interfaces/categories.interface";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
	return (
		<>
			<Swiper
				spaceBetween={0}
				slidesPerView={8}
				modules={[Autoplay]}
				autoplay={{ pauseOnMouseEnter: true, delay: 5000 }}
				className=""
				effect=""
				// onSwiper={(swiper) => swiper.update()}
			>
				{data.map((category) => {
					console.log(category);
					return (
						<>
							<SwiperSlide
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
							</SwiperSlide>
						</>
					);
				})}
			</Swiper>
		</>
	);
}
