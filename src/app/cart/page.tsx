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

import React from "react";
import { CartProduct } from "../_interfaces/cartProduct.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Cart() {
	const cartItems = await getUserCart();

	console.log("----------cart items", cartItems);

	const products = [
		{
			id: 101,
			name: "Wireless Headphones",
			category: "Electronics",
			price: 59.99,
			rating: 4.5,
		},
		{
			id: 102,
			name: "Yoga Mat",
			category: "Sports & Fitness",
			price: 25.0,
			rating: 4.8,
		},
		{
			id: 103,
			name: "Coffee Maker",
			category: "Home Appliances",
			price: 80.0,
			rating: 4.2,
		},
		{
			id: 104,
			name: "Running Shoes",
			category: "Sportswear",
			price: 70.0,
			rating: 4.6,
		},
		{
			id: 105,
			name: "Smartwatch",
			category: "Electronics",
			price: 120.0,
			rating: 4.7,
		},
	];

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
					{cartItems.data?.products?.map((product: CartProduct) => (
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
								{product?.count}
							</TableCell>
							<TableCell className="text-center">
								{product?.price * product?.count}
							</TableCell>
							<TableCell className="text-center">
								<Button>Remove</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
