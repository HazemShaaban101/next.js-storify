import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
		error: "/login",
	},

	providers: [
		Credentials({
			name: "email",
			credentials: {
				email: { type: "email", placeholder: "enter your email..." },
				password: { type: "password", placeholder: "H@zemsh2011" },
			},
			async authorize(credentials) {
				// console.log("user credentials:", credentials);
				const response = await fetch(
					`${process.env.APIBASE}/auth/signin`,
					{
						method: "POST",

						body: JSON.stringify({
							email: credentials?.email,
							password: credentials?.password,
						}),
						headers: { "Content-type": "application/json" },
					}
				);

				const payload = await response.json();

				if (payload.message === "success") {
					// console.log("payload at nextAuth:", payload);
					return {
						user: payload.user,
						token: payload.token,
						id: "",
					};
				} else {
					throw new Error("failed to log in");
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// First run: user just signed in
				token.user = user.user;
				token.token = user.token;
			}
			// token is the encrypted object on the server. this cannot be accessed by the client
			return token;
		},

		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
};
