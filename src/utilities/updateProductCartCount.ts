"use server";
import getUserToken from "./getUserToken";

export default async function updateProductCartCount(
	id: string,
	count: number
) {
	try {
		const token = await getUserToken();
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
			{
				method: "PUT",
				body: JSON.stringify({
					count,
				}),
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
			throw new Error(error.message);
		}
	}
}
