"use server";
import getUserToken from "./getUserToken";

export default async function ChangePassword(userData: {
	currentPassword: string;
	password: string;
	rePassword: string;
}) {
	try {
		const token = await getUserToken();
		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
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
