"use client";
import { Button } from "@/components/ui/button";
import addToCart from "@/utilities/addToCart";
import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CartCountBadge } from "../CartCountContext/CartCountContext";
import { incBadge } from "@/utilities/cartBadge.Actions";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productID }: { productID: string }) {
	const { setCartCountState } = useContext(CartCountBadge);
	const router = useRouter();
	return (
		<Button
			type="button"
			className="w-full mt-0 cursor-pointer"
			onClick={async () => {
				try {
					const payload = await addToCart(productID);
					console.log(payload);
					if (payload.status === "success") {
						toast.success(payload.message);
					} else if (
						payload.message === "Invalid Token. please login again"
					) {
						toast.error(payload.message);
						router.push("/login");
					} else {
						toast.error(payload.message);
					}

					incBadge(setCartCountState);
				} catch {
					toast.error("Cannot add product to cart");
				}
			}}>
			<ShoppingCart />
			Add to cart
		</Button>
	);
}
