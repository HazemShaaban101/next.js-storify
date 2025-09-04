"use server";
import React from "react";
import getUserToken from "./getUserToken";
import { toast, Toaster } from "sonner";

export default async function addToCart(productID: string) {
	console.log("Adding product to cart");

	const userToken = await getUserToken();
	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/cart`,
		{
			method: "POST",
			body: JSON.stringify({ productId: productID }),
			headers: {
				token: userToken,
				"Content-Type": "application/json",
			},
		}
	);

	const payload = await response.json();
	return payload;
}
