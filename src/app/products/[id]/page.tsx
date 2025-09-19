import AddToCartButton from "@/app/_Components/AddToCartButton/AddToCartButton";
import ProductImageSwiper from "@/app/_Components/ProductImageSwiper/ProductImageSwiper";
import { productType } from "@/app/_interfaces/product.interface";

import { ShoppingCart, Star, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default async function GetSingleProduct({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products/${id}`
	);

	const { data }: { data: productType } = await response.json();
	console.log(data);

	return (
		<>
			<div className="flex flex-wrap justify-center container w-[90%] gap-x-10 gap-y-5 mx-auto my-10">
				<ProductImageSwiper data={data.images} />
				<div className="w-full md:w-3/5 flex flex-wrap items-center content-around gap-2">
					<div className="w-full flex flex-col">
						<div className="flex justify-between items-center mb-3">
							<img
								src={data?.brand?.image}
								alt={data?.brand.slug}
								width={36}
							/>
							<p className="font-sans text-sm">
								{data?.category?.name}
							</p>
						</div>
						<p className="text-2xl text-cyan-700 font- font-sans">
							{data?.title}
						</p>
						<p className="text-lg text-gray-400 font-sans">
							{data?.description}
						</p>
					</div>
					<div className="flex justify-between w-full flex-wrap gap-3 font-semibold font-mono">
						<p className="text-xl">{data?.price} EGP</p>
						<div className="flex gap-2 items-center">
							<span className="flex gap-1 items-center text-xl">
								{data.ratingsQuantity}
								<User size={"22px"} />
							</span>
							<span className="flex gap-1 items-center text-xl">
								{data?.ratingsAverage}{" "}
								<Star
									fill="#FFD700"
									color="#FFD700"
									size={"22px"}
								/>
							</span>
						</div>
						<AddToCartButton productID={data?.id} />
					</div>
				</div>
			</div>
		</>
	);
}
