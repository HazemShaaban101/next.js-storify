"use server";

import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import getUserToken from "./getUserToken";
import { string } from "zod";

export default async function getUserCart() {
	const userToken = await getUserToken();
	const cartItems: { data: CartProduct[] } = await (
		await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: "GET",
			headers: {
				token: userToken,
				"Content-type": "application.json",
			},
		})
	).json();

	console.log(cartItems);
	return cartItems;
}
