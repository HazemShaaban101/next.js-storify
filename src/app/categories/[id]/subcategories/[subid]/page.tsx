"use client";
import SingleBrandAPI, { SingleBrandProducts } from "@/apis/SingleBrand.api";
import SingleCategoryAPI, {
	SingleCategoryProducts,
	SingleCategorySubCategories,
} from "@/apis/singleCategory";
import SingleSubCategoryAPI, {
	SingleSubCategoryProducts,
} from "@/apis/singleSubCategory";
import Paginator from "@/app/_Components/Paginator/Paginator";
import { ProductCard } from "@/app/_Components/ProductCard/ProductCard";
import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { CategoryType } from "@/app/_interfaces/categories.interface";
import { productType } from "@/app/_interfaces/product.interface";
import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SingleSubCategory() {
	const { subid } = useParams();
	const [subCategoryDetails, setSubCategoryDetails] =
		useState<CategoryType | null>(null);
	const [productList, setProductList] = useState<productType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getSingleSubCategory() {
		try {
			const data: {
				data: CategoryType;
			} = await SingleSubCategoryAPI(subid);
			setSubCategoryDetails(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve Categories");
		}
	}

	async function getSingleBrandProducts() {
		try {
			const data: {
				data: productType[];
			} = await SingleSubCategoryProducts(subid);
			setProductList(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve Products");
		}
	}

	useEffect(() => {
		async function workaround() {
			setIsLoading(true);
			await getSingleSubCategory();
			await getSingleBrandProducts();
			setIsLoading(false);
		}
		workaround();
	}, []);
	return (
		<>
			{isLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : (
				<div className="min-h-[calc(100vh-2rem-60px)] relative">
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
				</div>
			)}
		</>
	);
}
