"use server";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth";

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// The token is part of the session object
		const token = session.token;
		return NextResponse.json({ token: token });
	} catch {
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
