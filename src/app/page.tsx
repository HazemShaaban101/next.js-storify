import { Button } from "@/components/ui/button";
import MainHomeSlider from "./_Components/MainHomeSlider/MainHomeSlider";
import CategorySlider from "./_Components/CategorySlider/CategorySlider";
import { productType } from "./_interfaces/product.interface";
import AllProducts from "../apis/AllProducts.api";
import { ProductCard } from "./_Components/ProductCard/ProductCard";

export default async function Home() {
	const data: productType[] = await AllProducts();
	return (
		<>
			<div className="flex flex-col w-[80%] mx-auto gap-5 mb-10 overflow-hidden">
				<MainHomeSlider />
			</div>
			<div className="flex justify-center mx-auto gap-5 mb-10 overflow-hidden">
				<CategorySlider />
			</div>
			<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
				{data.map((product: productType) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
