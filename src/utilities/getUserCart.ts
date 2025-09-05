"use server";

import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import getUserToken from "./getUserToken";
import { string } from "zod";

export default async function getUserCart() {
	const userToken = await getUserToken();

	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", String(userToken));
	const cartItems: { data: { products: CartProduct[] } } = await (
		await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: "GET",
			headers,
		})
	).json();

	return cartItems;
}
