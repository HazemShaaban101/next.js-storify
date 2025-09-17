"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import React from "react";

export default async function getUserToken() {
	const encryptedToken =
		(await cookies()).get("next-auth.session-token")?.value ||
		(await cookies()).get("__secure-next-auth.session-token")?.value;

	const decodedToken = await decode({
		token: encryptedToken,
		secret: process.env.NEXTAUTH_SECRET!,
	});

	return decodedToken?.token as string;
}
