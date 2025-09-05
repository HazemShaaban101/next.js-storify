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

import React, { useEffect, useState } from "react";
import { CartProduct } from "../_interfaces/cartProduct.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import removeProductFromCart from "@/utilities/removeFromCart";
import CartCounter from "../_Components/CartCounter/CartCounter";

export default function Cart() {
	const [cartItems, setCartItems] = useState<{
		data: { products: CartProduct[] };
	}>();

	const [updateLoading, setUpdataLoading] = useState<boolean>(false);
	const [removing, setRemoving] = useState<boolean>(false);

	useEffect(() => {
		HandleGetCartItems();
	}, []);

	// get user cart items
	async function HandleGetCartItems() {
		const cartData = await getUserCart();
		setCartItems(cartData);
	}

	// remove cart item
	async function handleRemoveFromCart(id: string) {
		setRemoving(true);
		const removeProduct = await removeProductFromCart(id);
		await HandleGetCartItems();
		setRemoving(false);
	}

	return (
		<div className="w-full border rounded-md overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">Image</TableHead>
						<TableHead className="text-center">
							Product Name
						</TableHead>
						<TableHead className="text-center">Quantity</TableHead>
						<TableHead className="text-center">
							Price (EGP)
						</TableHead>
						<TableHead className="text-center"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cartItems?.data?.products?.map((product: CartProduct) => (
						<TableRow
							key={product?._id}
							className="odd:bg-muted/50">
							<TableCell className="font-medium flex justify-center">
								<Image
									src={product.product.imageCover}
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
									setUpdateLoading={setUpdataLoading}
									updateLoading={updateLoading}
									setCartItems={setCartItems}
								/>
							</TableCell>
							<TableCell className="text-center">
								{product?.price * product?.count}
							</TableCell>
							<TableCell className="text-center">
								<Button
									disabled={updateLoading || removing}
									onClick={() => {
										handleRemoveFromCart(
											product.product._id
										);
									}}>
									Remove
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
