import { CategoryType } from "@/app/_interfaces/categories.interface";

export default async function AllCategories(): Promise<CategoryType[]> {
	try {
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/categories`
		);
		const { data }: { data: CategoryType[] } = await response.json();

		return data;
	} catch {
		throw new Error("server communication error");
	}
}
