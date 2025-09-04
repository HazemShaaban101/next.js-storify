import { CategoryType } from "@/app/_interfaces/categories.interface";

import CategorySwiper from "./CategorySwiper";

export default async function CategorySlider() {
	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/categories`
	);
	const { data }: { data: CategoryType[] } = await response.json();

	return (
		<>
			<div className="flex justify-center w-[90%]">
				<CategorySwiper data={data} />
			</div>
		</>
	);
}
