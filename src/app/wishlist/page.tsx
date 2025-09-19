"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";
import { wishlistContext } from "../_Components/WishlistContext/WishlistContext";

export default function WishList() {
	// const [wishlistItems, setWishlistItems] = useState<productType[]>();
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const { wishlistState } = useContext(wishlistContext);

	useEffect(() => {
		if (wishlistState) {
			setInitialLoading(false);
		}
	}, [wishlistState]);

	return (
		<>
			{initialLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : wishlistState?.length! > 0 ? (
				<>
					<div className="min-h-[calc(100vh-2rem-60px)]">
						<h1 className="font-mono font-bold text-center text-2xl mb-5">
							Wishlist
						</h1>
						<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
							{wishlistState?.map((product: productType) => (
								<ProductCard
									product={product}
									key={product._id}
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<div className="flex justify-center items-center w-full text-cyan-700 font-mono font-bold text-4xl flex-wrap gap-10 h-[calc(100vh-60px-2rem)] content-center">
					<p className="w-full text-center">
						No items in your Wishlist!
					</p>
					<Link href="/">
						<Button className="text-lg font-mono px-20 py-6 cursor-pointer">
							HomePage
						</Button>
					</Link>
				</div>
			)}
		</>
	);
}
