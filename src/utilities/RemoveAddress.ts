"use server";
import getUserToken from "./getUserToken";

export default async function RemoveAddress(id: string): Promise<{
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
			`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
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
	} catch (error) {
		throw new Error("Couldn't delete address");
	}
}
