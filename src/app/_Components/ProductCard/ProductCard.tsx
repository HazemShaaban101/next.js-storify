"use client";
import { productType } from "@/app/_interfaces/product.interface";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistButton from "../WishlistButton/WishlistButton";

export function ProductCard({ product }: { product: productType }) {
	// console.log(product);
	return (
		<Card className="w-full max-w-sm mx-auto col-span-1 content-center justify-center">
			<Link href={`/products/${product.id}`}>
				<CardHeader className="">
					<CardTitle className="overflow-hidden">
						<div className="flex items-center justify-between">
							<Image
								src={
									product.brand?.image
										? product.brand.image
										: ""
								}
								alt={
									product.brand?.slug
										? product.brand.slug
										: ""
								}
								width={36}
								height={24}
								className="w-auto h-auto"
							/>
							<p className="text-gray-400 text-sm font-sans font-light">
								{product.category?.name}
							</p>
						</div>
						<p className="truncate text-md mt-2 py-1 ">
							{product?.title}
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex justify-center flex-wrap mt-2">
					<Image
						src={product?.imageCover}
						alt={product?.description}
						width={200}
						height={350}
					/>

					<div className="w-full flex justify-between mt-2">
						<p>{product?.price} EGP</p>
						<div className="flex gap-2 items-center">
							<span className="flex gap-1 items-center">
								{product.ratingsQuantity}
								<User size={"18px"} />
							</span>
							<span className="flex gap-1 items-center">
								{product?.ratingsAverage}{" "}
								<Star
									fill="#FFD700"
									color="#FFD700"
									size={"18px"}
								/>
							</span>
						</div>
					</div>
				</CardContent>
			</Link>
			<CardFooter className="flex flex-col gap-3">
				<AddToCartButton productID={product._id} />
				<WishlistButton productID={product._id} />
			</CardFooter>
		</Card>
	);
}
