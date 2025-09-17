/* eslint-disable */
import NextAuth, { User } from "next-auth";

declare module "next-auth" {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		user: {
			name: string;
			email: string;
			role: string;
		};
		token: string;
	}

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: User.user;
	}
}
