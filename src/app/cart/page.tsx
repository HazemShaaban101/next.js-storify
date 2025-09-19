"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import getUserCart from "@/utilities/getUserCart";
import getUserToken from "@/utilities/getUserToken";

import React, { useContext, useEffect, useState } from "react";
import { CartProduct } from "../_interfaces/cartProduct.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import removeProductFromCart from "@/utilities/removeFromCart";
import CartCounter from "../_Components/CartCounter/CartCounter";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { CartItemType } from "../_interfaces/cartItems.interface";
import Link from "next/link";
import { CartCountBadge } from "../_Components/CartCountContext/CartCountContext";
import { clearCartBadge, removeItemBadge } from "@/utilities/cartBadge.Actions";
import ClearCart from "@/utilities/ClearCart";
import { productType } from "../_interfaces/product.interface";
import * as motion from "motion/react-client";

export default function Cart() {
	const [cartItems, setCartItems] = useState<{
		data: { products: CartProduct[] };
		numOfCartItems: number;
		cartId: string;
	}>();

	const [updateLoading, setUpdataLoading] = useState<boolean>(false);
	const [removing, setRemoving] = useState<boolean>(false);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [clearingCart, setClearingCart] = useState<boolean>(false);

	const { cartCountState, setCartCountState } = useContext(CartCountBadge);
	const [cartTotalPrice, setCartTotalPrice] = useState(0);

	useEffect(() => {
		const dummyFunction = async () => HandleGetCartItems();
		dummyFunction().then(() => {
			setInitialLoading(false);
		});
	}, []);

	useEffect(() => {
		let cartSum = 0;
		cartItems?.data.products.forEach((product: CartProduct) => {
			console.log(product);
			cartSum += product.count * product.price;
			console.log(cartSum);
		});
		setCartTotalPrice(cartSum);
	}, [cartItems]);

	// get user cart items
	async function HandleGetCartItems() {
		const cartData: {
			data: { products: CartProduct[] };
			numOfCartItems: number;
			cartId: string;
		} = await getUserCart();
		// console.log("this is initial data", cartData);
		setCartItems(cartData);
	}

	// remove cart item
	async function handleRemoveFromCart(id: string, itemCount: number) {
		setRemoving(true);
		await removeProductFromCart(id);
		await HandleGetCartItems();
		setRemoving(false);
		removeItemBadge(itemCount, cartCountState, setCartCountState);
	}

	// remove cart item
	async function handleClearCart() {
		setClearingCart(true);
		setRemoving(true);
		await ClearCart();
		await HandleGetCartItems();
		setRemoving(false);
		setClearingCart(false);

		clearCartBadge(setCartCountState);
	}

	return (
		<>
			{initialLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : cartItems?.numOfCartItems! > 0 ? (
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
					<div className="flex justify-end gap-3 mb-3 items-center">
						<p className="font-mono text-md">
							Total: {cartTotalPrice} EGP
						</p>
						<Button
							variant={"destructive"}
							className="hover:bg-red-700 dark:hover:bg-[#863842] cursor-pointer"
							disabled={clearingCart}
							onClick={() => {
								handleClearCart();
							}}>
							{clearingCart ? (
								<Spinner
									className="text-cyan-800"
									variant="ellipsis"
								/>
							) : (
								"Clear Cart"
							)}
						</Button>
						<Link href={`/checkout/${cartItems?.cartId}`}>
							<Button
								className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 cursor-pointer"
								disabled={clearingCart}>
								Check Out
							</Button>
						</Link>
					</div>
					<div className="w-full border rounded-md overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">
										Image
									</TableHead>
									<TableHead className="text-center">
										Product Name
									</TableHead>
									<TableHead className="text-center">
										Quantity
									</TableHead>
									<TableHead className="text-center">
										Price (EGP)
									</TableHead>
									<TableHead className="text-center"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cartItems?.data?.products?.map(
									(product: CartProduct) => (
										<TableRow
											key={product?._id}
											className="odd:bg-muted/50">
											<TableCell className="font-medium flex justify-center">
												<Image
													src={
														product.product
															.imageCover
													}
													alt={product.product.title}
													width={"50"}
													height={"50"}
												/>
											</TableCell>
											<TableCell className="font-medium text-center">
												{product?.product.title}
											</TableCell>
											<TableCell className="text-center">
												<CartCounter
													id={product.product._id}
													count={product?.count}
													removing={removing}
													setUpdateLoading={
														setUpdataLoading
													}
													updateLoading={
														updateLoading
													}
													setCartItems={setCartItems}
												/>
											</TableCell>
											<TableCell className="text-center">
												{product?.price *
													product?.count}
											</TableCell>
											<TableCell className="text-center">
												<Button
													className="w-20 cursor-pointer"
													disabled={
														updateLoading ||
														removing
													}
													onClick={() => {
														handleRemoveFromCart(
															product.product._id,
															product.count
														);
													}}>
													{updateLoading ||
													removing ? (
														<Spinner
															className="text-cyan-800"
															variant="ellipsis"
														/>
													) : (
														"Remove"
													)}
												</Button>
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</motion.div>
			) : (
				<div className="flex justify-center items-center w-full text-cyan-700 font-mono font-bold text-4xl flex-wrap gap-10 h-[calc(100vh-60px-2rem)] content-center">
					<p className="w-full text-center">No items in your cart!</p>
					<Link href="/">
						<Button className="text-lg font-mono px-20 py-6 cursor-pointer">
							HomePage
						</Button>
					</Link>
				</div>
			)}
		</>
	);
}
