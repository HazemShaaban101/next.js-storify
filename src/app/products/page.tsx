import React from "react";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";
import AllProducts from "../../apis/AllProducts.api";

export default async function Products() {
	const data: productType[] = await AllProducts();
	return (
		<>
			<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
				{data.map((product: productType) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
