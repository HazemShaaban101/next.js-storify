"use server";

import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import getUserToken from "./getUserToken";
import { string } from "zod";
import { CartItemType } from "@/app/_interfaces/cartItems.interface";

export default async function getUserCart(): Promise<CartItemType> {
	const userToken = await getUserToken();

	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", String(userToken));
	const cartItems: Promise<CartItemType> = await (
		await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
			method: "GET",
			headers,
		})
	).json();

	return cartItems;
}
