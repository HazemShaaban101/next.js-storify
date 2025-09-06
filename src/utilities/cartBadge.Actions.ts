import { CartCountBadge } from "@/app/_Components/CartCountContext/CartCountContext";
import { useContext } from "react";

export function incBadge(setCartCountState: Function) {
	setCartCountState((prevCount: number) => prevCount + 1);
}
export function decBadge(setCartCountState: Function) {
	setCartCountState((prevCount: number) => prevCount - 1);
}

export function clearCartBadge(setCartCountState: Function) {
	setCartCountState(0);
}

export function removeItemBadge(
	itemCount: number,
	cartCountState: number,
	setCartCountState: Function
) {
	setCartCountState(cartCountState - itemCount);
}
