import { productType } from "@/app/_interfaces/product.interface";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { ShoppingCart, Star, User } from "lucide-react";
import React from "react";

export default async function GetSingleProduct({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;

	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products/${id}`
	);

	const { data }: { data: productType } = await response.json();
	console.log(data);

	return (
		<>
			<div className="flex container w-[90%] gap-10 mx-auto my-10">
				<div className="w-1/4">
					<img src={data?.imageCover} alt={data?.description} />
				</div>
				<div className="w-3/4 flex flex-wrap items-center content-around">
					<div className="w-full">
						<img
							src={data?.brand?.image}
							alt={data?.brand.slug}
							width={36}
						/>
						<p className="text-2xl text-cyan-700 font- font-sans">
							{data?.title}
						</p>
						<p className="text-lg text-gray-400 font-sans">
							{data?.description}
						</p>
						<p className="font-sans text-sm">
							{data?.category?.name}
						</p>
					</div>
					<div className="flex justify-between w-full flex-wrap gap-3">
						<p>{data?.price} EGP</p>
						<div className="flex gap-2 items-center">
							<span className="flex gap-1 items-center">
								{data.ratingsQuantity}
								<User size={"18px"} />
							</span>
							<span className="flex gap-1 items-center">
								{data?.ratingsAverage}{" "}
								<Star
									fill="#FFD700"
									color="#FFD700"
									size={"18px"}
								/>
							</span>
						</div>
						<Button type="button" className="w-full">
							<ShoppingCart />
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
