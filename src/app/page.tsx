import MainHomeSlider from "./_Components/MainHomeSlider/MainHomeSlider";
import CategorySlider from "./_Components/CategorySlider/CategorySlider";
import { productType } from "./_interfaces/product.interface";
import AllProducts from "../apis/AllProducts.api";
import { ProductCard } from "./_Components/ProductCard/ProductCard";
import * as motion from "motion/react-client";

export default async function Home() {
	const data: { data: productType[] } = await AllProducts();
	return (
		<>
			<motion.div
				className="flex flex-col w-[80%] mx-auto gap-5 mb-3 overflow-hidden"
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
				<MainHomeSlider />
			</motion.div>
			<motion.div
				className=" py-10 mt-5 flex justify-center items-center flex-wrap content-center gap-2 bg-[linear-gradient(0deg,#0f172b,#104e64,#0b4f4a)] from-slate-900 via-cyan-900 to-teal-900 rounded-2xl easteregg-bg"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						delay: 0.3,
						type: "spring",
						stiffness: 100,
					},
				}}>
				<motion.h1
					className="text-center font-mono font-bold text-3xl w-full text-white"
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						opacity: 1,
						scale: 1,
						transition: {
							duration: 0.5,
							delay: 0.6,
							type: "spring",
							stiffness: 100,
						},
					}}>
					Welcome to Storify
				</motion.h1>
				<motion.p
					className="text-center font-mono font-bold text-xl w-full text-white"
					initial={{ scale: 0, opacity: 0 }}
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
					Where all products are imaginary!
				</motion.p>
			</motion.div>
			<motion.div
				className="justify-center mx-auto gap-5 mb-10 overflow-hidden hidden md:flex"
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
				<CategorySlider />
			</motion.div>
			<motion.h2
				className="text-center font-mono font-bold text-2xl mb-5 mt-10 md:mt-0"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						delay: 1,
						type: "spring",
						stiffness: 40,
					},
				}}>
				Frequently bought products!
			</motion.h2>
			<motion.div
				className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						delay: 1,
						type: "spring",
						stiffness: 40,
					},
				}}>
				{data?.data.map((product: productType) => (
					<ProductCard product={product} key={product._id} />
				))}
			</motion.div>
		</>
	);
}
