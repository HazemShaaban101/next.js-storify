import { ReadonlyURLSearchParams } from "next/navigation";

export default async function AllProducts(
	page: ReadonlyURLSearchParams = new ReadonlyURLSearchParams("page=1")
) {
	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products?limit=30&${page}`
	);
	const data = await response.json();

	return data;
}
