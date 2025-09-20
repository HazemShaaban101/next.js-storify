"use client";

import SingleSubCategoryAPI, {
	SingleSubCategoryProducts,
} from "@/apis/singleSubCategory";
import { ProductCard } from "@/app/_Components/ProductCard/ProductCard";

import { CategoryType } from "@/app/_interfaces/categories.interface";
import { productType } from "@/app/_interfaces/product.interface";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";

export default function SingleSubCategory() {
	const { subid } = useParams();
	const [subCategoryDetails, setSubCategoryDetails] =
		useState<CategoryType | null>(null);
	const [productList, setProductList] = useState<productType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getSingleSubCategory() {
			try {
				const data: {
					data: CategoryType;
				} = await SingleSubCategoryAPI(subid);
				setSubCategoryDetails(data.data);
			} catch {
				throw new Error("couldn't retrieve Categories");
			}
		}

		async function getSingleBrandProducts() {
			try {
				const data: {
					data: productType[];
				} = await SingleSubCategoryProducts(subid);
				setProductList(data.data);
			} catch {
				throw new Error("couldn't retrieve Products");
			}
		}

		async function workaround() {
			setIsLoading(true);
			await getSingleSubCategory();
			await getSingleBrandProducts();
			setIsLoading(false);
		}
		workaround();
	}, [subid]);
	return (
		<>
			{isLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : (
				<motion.div
					className="min-h-[calc(100vh-2rem-60px)] relative"
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
					<div className="header flex flex-col items-center justify-center gap-3 py-4">
						<h2 className="text-center font-bold font-mono text-2xl">
							{subCategoryDetails?.name} products
						</h2>
					</div>

					<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
						{productList?.map((product) => {
							return (
								<ProductCard
									product={product}
									key={product._id}
								/>
							);
						})}
					</div>

					<div className="my-3">
						{productList?.length === 0 ? (
							<h2 className="mt-10 text-center text-3xl font-extralight font-mono text-red-900">
								No products available from this Subcategory.
							</h2>
						) : (
							""
						)}
					</div>
				</motion.div>
			)}
		</>
	);
}
