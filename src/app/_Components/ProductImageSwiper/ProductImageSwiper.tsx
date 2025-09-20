"use client";
import Image from "next/image";
import React from "react";
import { Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function ProductImageSwiper({ data }: { data: string[] }) {
	return (
		<div className="w-full  md:w-1/5">
			<Swiper
				modules={[Pagination, Zoom]}
				spaceBetween={0}
				slidesPerView={1}
				zoom
				pagination={{ clickable: true }}
				className="">
				{data.map((image, index) => {
					return (
						<SwiperSlide key={index} className="box-border">
							<Image
								src={image}
								alt="product image"
								width={900}
								height={900}
								objectFit="cover"
								objectPosition="center"
								className=""
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
