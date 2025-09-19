"use client";
import SingleBrandAPI, { SingleBrandProducts } from "@/apis/SingleBrand.api";
import Paginator from "@/app/_Components/Paginator/Paginator";
import { ProductCard } from "@/app/_Components/ProductCard/ProductCard";
import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { productType } from "@/app/_interfaces/product.interface";
import { Divide } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";

export default function SingleBrand() {
	const searchParams = useSearchParams();
	const searchParamsOBJ = Object.fromEntries(searchParams.entries());

	const { id } = useParams();
	const [brandDetails, setBrandDetails] = useState<brandType | null>(null);
	const [productList, setProductList] = useState<productType[]>([]);
	const [metaData, setMetaData] = useState<brandMetadataType>({});
	const [isLoading, setIsLoading] = useState(true);

	async function getSingleBrand() {
		try {
			const data: {
				data: brandType;
			} = await SingleBrandAPI(id);
			setBrandDetails(data.data);
		} catch (error) {
			throw new Error("couldn't retrieve brands");
		}
	}

	async function getSingleBrandProducts() {
		try {
			const data: {
				data: productType[];
				metadata: brandMetadataType;
			} = await SingleBrandProducts(id, searchParamsOBJ.page);
			setProductList(data.data);
			setMetaData(data.metadata);
		} catch (error) {
			throw new Error("couldn't retrieve brands");
		}
	}

	useEffect(() => {
		async function workaround() {
			setIsLoading(true);
			await getSingleBrand();
			await getSingleBrandProducts();
			setIsLoading(false);
		}
		workaround();
	}, [searchParams]);
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
						<Image
							src={brandDetails!.image}
							alt={brandDetails!.slug}
							width={200}
							height={200}
						/>

						<h2 className="text-center font-bold font-mono text-2xl">
							{brandDetails?.name} products
						</h2>
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
								No products available from this brand.
							</h2>
						) : (
							metaData.numberOfPages !== 1 && (
								<Paginator metaData={metaData} />
							)
						)}
					</div>
				</motion.div>
			)}
		</>
	);
}
