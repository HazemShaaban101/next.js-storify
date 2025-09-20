"use server";
import getUserToken from "./getUserToken";

export default async function EditInfo(userData: {
	name: string;
	email: string;
	phone: string;
}) {
	try {
		const token = await getUserToken();
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
			{
				method: "PUT",
				body: JSON.stringify(userData),
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
