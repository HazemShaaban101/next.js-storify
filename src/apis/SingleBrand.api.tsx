import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { productType } from "@/app/_interfaces/product.interface";
import { ParamValue } from "next/dist/server/request/params";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function SingleBrandAPI(id: ParamValue): Promise<{
	data: brandType;
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/brands/${id}`
		);
		let data: { data: brandType } = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
export async function SingleBrandProducts(
	id: ParamValue,
	page: string
): Promise<{
	data: productType[];
	metadata: brandMetadataType;
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/products?limit=30&brand=${id}&page=${page}`
		);
		let data: {
			data: productType[];
			metadata: brandMetadataType;
		} = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
