"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import image1 from "../../../../public/banner-4.jpeg";
import image2 from "../../../../public/slider-image-2.jpeg";
import image3 from "../../../../public/slider-image-3.jpeg";
import image4 from "../../../../public/grocery-banner.png";
import image5 from "../../../../public/grocery-banner-2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Virtual } from "swiper/modules";

export default function MainHomeSlider() {
	return (
		<>
			<div className="mainHomeSlider flex justify-center mx-auto">
				<div className="flex w-3/4">
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						modules={[Autoplay]}
						autoplay={{ pauseOnMouseEnter: true, delay: 5000 }}
						// onSwiper={(swiper) => swiper.update()}
					>
						<SwiperSlide className=" box-border">
							<Image
								src={image1}
								alt="greens"
								className="w-full h-[300px] object-cover object-center"
							/>
						</SwiperSlide>
						<SwiperSlide className=" box-border">
							<Image
								src={image4}
								alt="greens"
								className="w-full h-[300px] object-cover object-center"
							/>
						</SwiperSlide>
						<SwiperSlide className=" box-border">
							<Image
								src={image3}
								alt="greens"
								className="w-full h-[300px] object-cover object-center"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
				<div className=" flex flex-col object-cover">
					<Image
						src={image2}
						alt="choco"
						className="w-full h-[150px]"
					/>
					<Image
						src={image3}
						alt="food"
						className="w-full h-[150px]"
					/>
				</div>
			</div>
		</>
	);
}
