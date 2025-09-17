"use server";
import getUserToken from "@/utilities/getUserToken";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { UserOrderType } from "@/app/_interfaces/userOrder.interface";

export async function GET(request: NextRequest) {
	try {
		const token = await getUserToken();
		if (!token) throw new Error("Invalid token, please Log in");

		const {
			id,
		}: {
			id: string;
			name: string;
			role: string;
			iat: number;
			exp: number;
		} = jwtDecode(token);

		console.log("userID: ", id);

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
		);

		console.log(response);
		if (response.ok) {
			const data: { data: UserOrderType[] } = await response.json();
			console.log("DATA:-------------->", data);
			return NextResponse.json(data);
		} else {
			const errorMessage = await response.text();
			return new NextResponse(errorMessage, { status: response.status });
		}
	} catch (error) {
		return new NextResponse("...Internal Server Error...", { status: 500 });
	}
}

export async function POST() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function PUT() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
export async function DELETE() {
	return new NextResponse("Method Not Allowed", { status: 405 });
}
