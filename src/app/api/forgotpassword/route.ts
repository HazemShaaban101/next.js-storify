"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const requestBody: {
			email: string;
			newPassword: string;
			rePassword: string;
			resetCode: string;
		} = await request.json();

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
			{
				method: "POST",
				body: JSON.stringify({ email: requestBody.email }),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.ok) {
			const payload = await response.json();
			return NextResponse.json(payload);
		} else {
			const errorMessage = await response.text();
			return new NextResponse(errorMessage, { status: response.status });
		}
	} catch (error) {
		return new NextResponse("...Internal Server Error...", { status: 500 });
	}
}

export async function GET() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function PUT() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function DELETE() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
