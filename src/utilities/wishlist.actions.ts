"use server";
import getUserToken from "./getUserToken";

export default async function addToWishlist(productID: string) {
	// console.log("Adding product to wishlist");

	const token = await getUserToken();

	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/wishlist`,
		{
			method: "POST",
			body: JSON.stringify({ productId: productID }),
			headers: {
				token,
				"Content-type": "application/json",
			},
		}
	);
	const payload = await response.json();
	return payload;
}
export async function removeFromWishlist(productID: string) {
	// console.log("Removing product from wishlist");

	const token = await getUserToken();

	const response = await fetch(
		`https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,
		{
			method: "DELETE",
			headers: {
				token,
				"Content-type": "application/json",
			},
		}
	);
	const payload = await response.json();
	return payload;
}
