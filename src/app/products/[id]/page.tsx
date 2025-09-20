import { SingleProductRelatedProducts } from "@/apis/singleProductRelatedProducts";
import AddToCartButton from "@/app/_Components/AddToCartButton/AddToCartButton";
import { ProductCard } from "@/app/_Components/ProductCard/ProductCard";
import ProductImageSwiper from "@/app/_Components/ProductImageSwiper/ProductImageSwiper";
import { productType } from "@/app/_interfaces/product.interface";

import { Star, User } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

export default async function GetSingleProduct({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/products/${id}`
	);

	const { data: productDetails }: { data: productType } =
		await response.json();

	const relatedProducts: productType[] = await SingleProductRelatedProducts(
		productDetails.category._id
	);

	return (
		<>
			<motion.div
				className="flex flex-wrap justify-center container w-[90%] gap-x-10 gap-y-5 mx-auto my-10"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						type: "spring",
						stiffness: 100,
					},
				}}>
				<ProductImageSwiper data={productDetails.images} />
				<div className="w-full md:w-3/5 flex flex-wrap items-center content-around gap-2">
					<div className="w-full flex flex-col">
						<div className="flex justify-between items-center mb-3">
							<Image
								src={productDetails?.brand?.image}
								alt={productDetails?.brand.slug}
								width={36}
								height={25}
							/>
							<p className="font-sans text-sm">
								{productDetails?.category?.name}
							</p>
						</div>
						<p className="text-2xl text-cyan-700 font- font-sans">
							{productDetails?.title}
						</p>
						<p className="text-lg text-gray-400 font-sans">
							{productDetails?.description}
						</p>
					</div>
					<div className="flex justify-between w-full flex-wrap gap-3 font-semibold font-mono">
						<p className="text-xl">{productDetails?.price} EGP</p>
						<div className="flex gap-2 items-center">
							<span className="flex gap-1 items-center text-xl">
								{productDetails.ratingsQuantity}
								<User size={"22px"} />
							</span>
							<span className="flex gap-1 items-center text-xl">
								{productDetails?.ratingsAverage}{" "}
								<Star
									fill="#FFD700"
									color="#FFD700"
									size={"22px"}
								/>
							</span>
						</div>
						<AddToCartButton productID={productDetails?.id} />
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						delay: 0.5,
						type: "spring",
						stiffness: 100,
					},
				}}>
				<h2 className="w-full text-center font-mono font-bold text-2xl mb-5">
					Related products
				</h2>

				<div className="w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{relatedProducts.map((product) => {
						return (
							<ProductCard product={product} key={product._id} />
						);
					})}
				</div>
			</motion.div>
		</>
	);
}
