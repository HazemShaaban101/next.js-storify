"use server";

import getUserToken from "./getUserToken";

export default async function ClearCart() {
	const token = await getUserToken();
	fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
		method: "DELETE",
		headers: {
			token,
			"Content-Type": "application/json",
		},
	});
}
