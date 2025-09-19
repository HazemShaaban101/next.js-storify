import { productType } from "@/app/_interfaces/product.interface";
import { ParamValue } from "next/dist/server/request/params";

export async function SingleProductRelatedProducts(
	id: ParamValue
): Promise<productType[]> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/products?limit=6&category=${id}`
		);
		let {
			data,
		}: {
			data: productType[];
		} = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
