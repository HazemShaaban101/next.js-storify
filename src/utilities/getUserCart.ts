"use server";

import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import getUserToken from "./getUserToken";
import { string } from "zod";
import { CartItemType } from "@/app/_interfaces/cartItems.interface";

export default async function getUserCart(): Promise<{
	data: { products: CartProduct[] };
	numOfCartItems: number;
	cartId: string;
}> {
	try {
		const userToken = await getUserToken();

		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("token", String(userToken));
		const cartItems: Promise<{
			data: { products: CartProduct[] };
			numOfCartItems: number;
			cartId: string;
		}> = await (
			await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
				method: "GET",
				headers,
			})
		).json();

		return cartItems;
	} catch (error) {
		throw new Error("no internet connection...");
	}
}
