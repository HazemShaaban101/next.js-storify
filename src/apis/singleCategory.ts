import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { CategoryType } from "@/app/_interfaces/categories.interface";
import { productType } from "@/app/_interfaces/product.interface";
import { ParamValue } from "next/dist/server/request/params";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function SingleCategoryAPI(id: ParamValue): Promise<{
	data: CategoryType;
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories/${id}`
		);
		let data: { data: CategoryType } = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}

export async function SingleCategoryProducts(id: ParamValue): Promise<{
	data: productType[];
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/products?limit=30&category=${id}`
		);
		let data: {
			data: productType[];
		} = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}

export async function SingleCategorySubCategories(id: ParamValue): Promise<{
	data: CategoryType[];
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
		);
		let data: {
			data: CategoryType[];
		} = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
