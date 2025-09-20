"use server";

import getUserToken from "./getUserToken";

export default async function cashPayment(
	id: string,
	shippingAddress: { city: string; details: string; phone: string }
) {
	try {
		const token = await getUserToken();
		if (!token) return null;

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
			{
				method: "POST",
				body: JSON.stringify({ shippingAddress }),
				headers: {
					token,
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();

		if (data.status == "success") {
			return data;
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error?.message);
		}
	}
}
