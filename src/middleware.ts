import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export default async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const { pathname } = request.nextUrl;

	if (token && (pathname === "/login" || pathname === "/register")) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (!token && pathname === "/cart") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/cart", "/login", "/register"],
};
