import {
	brandMetadataType,
	brandType,
} from "@/app/_interfaces/brand.interface";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function AllBrands(
	page: ReadonlyURLSearchParams
): Promise<{
	data: brandType[];
	metadata: brandMetadataType;
}> {
	try {
		let response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/brands?limit=30&${page}`
		);
		let data: { data: brandType[]; metadata: object } =
			await response.json();

		return data;
	} catch (err: unknown) {
		throw new Error("server communication error");
	}
}
