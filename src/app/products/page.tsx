import React from "react";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";

export default async function Products() {
	let response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products`
	);
	let { data } = await response.json();

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
