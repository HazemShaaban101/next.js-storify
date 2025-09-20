"use client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getUserToken() {
	const encryptedToken =
		(await cookies()).get("next-auth.session-token")?.value ||
		(await cookies()).get("__secure-next-auth.session-token")?.value;

	console.log("EncryptedToken---->", encryptedToken);

	const decodedToken = await decode({
		token: encryptedToken,
		secret: process.env.NEXTAUTH_SECRET!,
	});

	console.log("DecodedToken", decodedToken?.token);

	console.log("All cookies------->", (await cookies()).getAll());

	return decodedToken?.token as string;
}
