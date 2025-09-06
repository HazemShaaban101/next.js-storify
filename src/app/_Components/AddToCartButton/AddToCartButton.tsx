import { productType } from "@/app/_interfaces/product.interface";
import { Button } from "@/components/ui/button";
import addToCart from "@/utilities/addToCart";
import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CartCountBadge } from "../CartCountContext/CartCountContext";
import { incBadge } from "@/utilities/cartBadge.Actions";

export default function AddToCartButton({ productID }: { productID: string }) {
	const { cartCountState, setCartCountState } = useContext(CartCountBadge);
	return (
		<Button
			type="button"
			className="w-full mt-0 cursor-pointer"
			onClick={async () => {
				try {
					const payload = await addToCart(productID);
					toast.success(payload.message);
					incBadge(setCartCountState);
				} catch (err) {
					toast.error("Cannot add product to cart");
				}
			}}>
			<ShoppingCart />
			Add to cart
		</Button>
	);
}
