import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				const response = await fetch(`${process.env.API}/auth/signin`, {
					method: "POST",
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});

				const payload = await response.json();

				console.log(payload);

				return null;
			},
		}),
	],
};
