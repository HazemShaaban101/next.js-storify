"use client";
import getUserCart from "@/utilities/getUserCart";
import React, { createContext, useEffect, useState } from "react";

export const CartCountBadge = createContext();

export default function CartCountContext({ children }) {
	const [cartCountState, setCartCountState] = useState(0);

	useEffect(() => {
		const cartItems = getUserCart();
		cartItems.then((value) => {
			let sum = 0;
			value?.data?.products?.forEach((product) => {
				sum += product.count;
			});
			setCartCountState(sum);
			console.log(sum);
		});
	}, []);

	return (
		<CartCountBadge.Provider value={{ cartCountState, setCartCountState }}>
			{children}
		</CartCountBadge.Provider>
	);
}
