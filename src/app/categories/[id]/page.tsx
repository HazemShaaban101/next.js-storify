"use client";
import SingleBrandAPI, { SingleBrandProducts } from "@/apis/SingleBrand.api";
import SingleCategoryAPI, {
	SingleCategoryProducts,
	SingleCategorySubCategories,
} from "@/apis/singleCategory";
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

export default function SingleCategory() {
	const { id } = useParams();
	const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
		null
	);
	const [productList, setProductList] = useState<productType[]>([]);
	const [subCategoryList, setSubCategoryList] = useState<CategoryType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getSingleCategory() {
		try {
			const data: {
				data: CategoryType;
			} = await SingleCategoryAPI(id);
			setCategoryDetails(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve Categories");
		}
	}

	async function getSingleCategoryProducts() {
		try {
			const data: {
				data: productType[];
			} = await SingleCategoryProducts(id);
			setProductList(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve Products");
		}
	}

	async function getSingleCategorySubCategories() {
		try {
			const data: {
				data: CategoryType[];
			} = await SingleCategorySubCategories(id);
			setSubCategoryList(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve SubCategories");
		}
	}

	useEffect(() => {
		async function workaround() {
			setIsLoading(true);
			await getSingleCategory();
			await getSingleCategorySubCategories();
			await getSingleCategoryProducts();
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
						<Image
							src={categoryDetails!.image}
							alt={categoryDetails!.slug}
							width={200}
							height={200}
						/>

						<h2 className="text-center font-bold font-mono text-2xl">
							{categoryDetails?.name} products
						</h2>
					</div>

					<div className="subcategories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto my-4 border-2 rounded-2xl p-4">
						{subCategoryList.map((subCategory) => {
							return (
								<Link
									key={subCategory._id}
									href={`/categories/${id}/subcategories/${subCategory._id}`}>
									<div className="header gap-3 py-4 border-2 rounded-2xl px-2">
										<h2 className="text-center font-bold font-mono text-lg">
											{subCategory?.name} products
										</h2>
									</div>
								</Link>
							);
						})}
					</div>

					<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
						{productList.map((product) => {
							return (
								<ProductCard
									product={product}
									key={product._id}
								/>
							);
						})}
					</div>

					<div className="my-3">
						{productList.length === 0 ? (
							<h2 className="mt-10 text-center text-3xl font-extralight font-mono text-red-900">
								No products available from this Category.
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
