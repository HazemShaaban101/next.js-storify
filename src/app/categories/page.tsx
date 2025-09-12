import { brandMetadataType, brandType } from "../_interfaces/brand.interface";
import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "../_interfaces/categories.interface";
import AllCategories from "@/apis/AllCategories.api";

export default async function Categories() {
	// const searchParams = Object.fromEntries(useSearchParams().entries());

	let categories = null;
	try {
		const data: CategoryType[] = await AllCategories();
		categories = data;
	} catch (error) {
		throw new Error("couldn't retrieve Categories");
	}

	return (
		<>
			<>
				<div className="min-h-[calc(100vh-2rem-60px)] relative flex items-center">
					<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
						{categories?.map((category: CategoryType) => {
							return (
								<Link
									href={`/categories/${category._id}`}
									key={category._id}>
									<div className="flex flex-col items-center justify-center gap-3 border-2 border-solid rounded-2xl py-5">
										<Image
											src={category.image}
											alt={category.slug}
											width={200}
											height={100}
											className="object-cover object-center w-[200px] h-[200px]"
										/>
										<p className="text-center">
											{category.name}
										</p>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</>
		</>
	);
}
