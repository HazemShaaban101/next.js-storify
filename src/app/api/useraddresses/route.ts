"use server";
import getUserToken from "@/utilities/getUserToken";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { ControllerRenderProps } from "react-hook-form";

export async function GET(request: NextRequest) {
	try {
		const token = await getUserToken();
		if (!token) throw new Error("Invalid token, please Log in");

		const response = await fetch(
			`https://ecommerce.routemisr.com/api/v1/addresses`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token,
				},
			}
		);
		if (response.ok) {
			const { data } = await response.json();
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
