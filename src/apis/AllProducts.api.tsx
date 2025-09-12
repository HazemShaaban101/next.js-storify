import { ReadonlyURLSearchParams } from "next/navigation";

export default async function AllProducts(
	page: ReadonlyURLSearchParams = new ReadonlyURLSearchParams("page=1")
) {
	let response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products?limit=30&${page}`
	);
	let data = await response.json();

	return data;
}
