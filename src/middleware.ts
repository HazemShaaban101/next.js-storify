import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const { pathname } = request.nextUrl;

	if (
		token &&
		(pathname === "/login" ||
			pathname === "/register" ||
			pathname === "/resetpassword")
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (
		!token &&
		(pathname === "/cart" ||
			pathname === "/allorders" ||
			pathname.startsWith("/checkout") ||
			pathname === "/profile" ||
			pathname === "/wishlist")
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/cart",
		"/login",
		"/register",
		"/resetpassword",
		"/allorders",
		"/checkout/:path*",
		"/profile",
		"/wishlist",
	],
};
