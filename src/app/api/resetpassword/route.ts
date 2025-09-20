"use server";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	try {
		const requestBody: {
			email: string;
			newPassword: string;
			rePassword: string;
			resetCode: string;
		} = await request.json();

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
			{
				method: "PUT",
				body: JSON.stringify({
					email: requestBody.email,
					newPassword: requestBody.newPassword,
				}),
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
				},
			}
		);
		// console.log("response from route.....", response);
		if (response.ok) {
			// console.log("changed password okay");
			const payload = await response.json();
			return NextResponse.json(payload);
		} else {
			// console.log(response);

			const errorMessage = await response.text();
			return new NextResponse(errorMessage, { status: response.status });
		}
	} catch {
		return new NextResponse("...Internal Server Error...", { status: 500 });
	}
}

export async function GET() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function POST() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function DELETE() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
