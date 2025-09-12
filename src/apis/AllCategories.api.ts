import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { CategoryType } from "@/app/_interfaces/categories.interface";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function AllCategories(): Promise<CategoryType[]> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories`
		);
		let { data }: { data: CategoryType[] } = await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
