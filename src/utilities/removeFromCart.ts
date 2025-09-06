"use server";
import { toast } from "sonner";
import getUserToken from "./getUserToken";

export default async function removeProductFromCart(id: string) {
	try {
		const token = await getUserToken();

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
			{
				method: "DELETE",
				headers: {
					token,
					"Content-Type": "application/json",
				},
			}
		);

		const payload = await response.json();
		return payload;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error?.message);
			throw new Error(error?.message);
		}
	}
}
