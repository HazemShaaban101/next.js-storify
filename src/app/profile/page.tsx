"use client";
import React, { useContext, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { wishlistContext } from "../_Components/WishlistContext/WishlistContext";
import { ProductCard } from "../_Components/ProductCard/ProductCard";
import { productType } from "../_interfaces/product.interface";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChangePasswordModal } from "../_Components/ChangePasswordModal/ChangePasswordModal";

export default function Profile() {
	const { wishlistState } = useContext(wishlistContext);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const { data } = useSession();

	useEffect(() => {
		if (wishlistState) {
			setInitialLoading(false);
		}
	}, [wishlistState]);

	return (
		<>
			<div className="min-h-[calc(100vh-2rem-60px)]">
				<motion.div
					className="min-h-[calc(40vh-2rem-60px)] flex justify-center items-center flex-wrap content-center gap-3 bg-[linear-gradient(0deg,#0f172b,#104e64,#0b4f4a)] from-slate-900 via-cyan-900 to-teal-900 rounded-2xl easteregg-bg"
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
					<motion.h1
						className="text-center font-mono font-bold text-3xl w-full"
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
						Edit your profile
					</motion.h1>
					<motion.p className="w-full text-center">
						Name: {data?.user.name}
					</motion.p>
					<motion.p className="w-full text-center">
						Email: {data?.user.email}
					</motion.p>

					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							transition: {
								duration: 0.5,
								delay: 1,
								type: "spring",
								stiffness: 100,
							},
						}}>
						<Button>Edit information</Button>
					</motion.div>
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							transition: {
								duration: 0.5,
								delay: 1.5,
								type: "spring",
								stiffness: 100,
							},
						}}>
						<ChangePasswordModal />
					</motion.div>
				</motion.div>
				<div className="content">
					{initialLoading ? (
						<motion.div
							className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex"
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									duration: 0.5,
									delay: 2,
									type: "spring",
									stiffness: 100,
								},
							}}>
							<span className="loader"></span>
						</motion.div>
					) : wishlistState?.length! > 0 ? (
						<>
							<motion.div
								className="min-h-[calc(100vh-2rem-60px)]"
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
								<h1 className="font-mono font-bold text-center text-2xl my-5">
									Wishlist
								</h1>
								<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
									{wishlistState?.map(
										(product: productType) => (
											<ProductCard
												product={product}
												key={product._id}
											/>
										)
									)}
								</div>
							</motion.div>
						</>
					) : (
						<motion.div
							className="flex justify-center items-center w-full text-cyan-700 font-mono font-bold text-4xl flex-wrap gap-10 h-[calc(100vh-60px-2rem)] content-center"
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
							<p className="w-full text-center">
								No items in your Wishlist!
							</p>
							<Link href="/">
								<Button className="text-lg font-mono px-20 py-6 cursor-pointer">
									HomePage
								</Button>
							</Link>
						</motion.div>
					)}
				</div>
			</div>
		</>
	);
}
