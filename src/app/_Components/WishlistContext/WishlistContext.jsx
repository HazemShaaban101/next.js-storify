"use client";
import React, { createContext, useEffect, useState } from "react";

export const wishlistContext = createContext();

export default function WishlistContext({ children }) {
	const [wishlistState, setWishlistState] = useState();

	useEffect(() => {
		const dummyFunction = async () => {
			try {
				const response = await fetch(
					`https://next-js-storify.vercel.app/api/getwishlist`
				);
				if (response.ok) {
					const data = await response.json();
					setWishlistState(data);
				}
			} catch (error) {
				throw new Error("Internet problem!");
			}
		};
		dummyFunction();
	}, []);

	return (
		<wishlistContext.Provider value={{ wishlistState, setWishlistState }}>
			{children}
		</wishlistContext.Provider>
	);
}
