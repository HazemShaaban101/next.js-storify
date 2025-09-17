"use server";
import getUserToken from "./getUserToken";

export default async function AddNewAddress(address: {
	city: string;
	details: string;
	phone: string;
	name: string;
}): Promise<{
	status: string;
	message: string;
	data: Array<{
		_id: string;
		name: string;
		details: string;
		phone: string;
		city: string;
	}>;
}> {
	try {
		const token = await getUserToken();
		if (!token) {
			throw new Error("Couldn't get token");
		}

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/addresses`,
			{
				method: "POST",
				body: JSON.stringify(address),
				headers: {
					token,
					"Content-type": "application/json",
				},
			}
		);

		const payload = await response.json();
		return payload;
	} catch (e) {
		throw new Error("Couldn't add address");
	}
}
