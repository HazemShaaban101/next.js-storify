import { CategoryType } from "@/app/_interfaces/categories.interface";
import { productType } from "@/app/_interfaces/product.interface";
import { ParamValue } from "next/dist/server/request/params";

export default async function SingleCategoryAPI(id: ParamValue): Promise<{
	data: CategoryType;
}> {
	try {
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories/${id}`
		);
		const data: { data: CategoryType } = await response.json();

		return data;
	} catch {
		throw new Error("server communication error");
	}
}

export async function SingleCategoryProducts(id: ParamValue): Promise<{
	data: productType[];
}> {
	try {
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/products?limit=30&category=${id}`
		);
		const data: {
			data: productType[];
		} = await response.json();

		return data;
	} catch {
		throw new Error("server communication error");
	}
}

export async function SingleCategorySubCategories(id: ParamValue): Promise<{
	data: CategoryType[];
}> {
	try {
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
		);
		const data: {
			data: CategoryType[];
		} = await response.json();

		return data;
	} catch {
		throw new Error("server communication error");
	}
}
