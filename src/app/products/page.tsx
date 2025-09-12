"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";
import AllProducts from "../../apis/AllProducts.api";
import { brandMetadataType, brandType } from "../_interfaces/brand.interface";
import Paginator from "../_Components/Paginator/Paginator";
import { useSearchParams } from "next/navigation";

export default function Products() {
	const searchParams = useSearchParams();
	const [isLoading, setisLoading] = useState(true);
	const [productList, setProductList] = useState<productType[]>([]);
	const [metaData, setMetaData] = useState<brandMetadataType>({});

	useEffect(() => {
		async function workaround() {
			setisLoading(true);
			const {
				data,
				metadata,
			}: { data: productType[]; metadata: brandMetadataType } =
				await AllProducts(searchParams);
			setMetaData(metadata);
			setProductList(data);
			setisLoading(false);
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
				<>
					<h1 className="text-3xl font-bold font-mono text-center mb-3">
						Products, products, products!
					</h1>
					<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
						{productList.map((product: productType) => (
							<ProductCard product={product} key={product._id} />
						))}
					</div>
					<Paginator metaData={metaData} />
				</>
			)}
		</>
	);
}
