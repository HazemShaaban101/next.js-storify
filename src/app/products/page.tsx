import React from "react";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";
import AllProducts from "../apis/AllProducts.api";

export default async function Products() {
	const data: productType[] = await AllProducts();
	return (
		<>
			<div className="products grid grid-cols-5 gap-3">
				{data.map((product: productType) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
