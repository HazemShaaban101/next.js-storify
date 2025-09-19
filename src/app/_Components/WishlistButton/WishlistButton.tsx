import { Button } from "@/components/ui/button";
import addToWishlist, {
	removeFromWishlist,
} from "@/utilities/wishlist.actions";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { wishlistContext } from "../WishlistContext/WishlistContext";
import { productType } from "@/app/_interfaces/product.interface";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Heart } from "lucide-react";
import { p } from "framer-motion/client";

export default function WishlistButton({ productID }: { productID: string }) {
	const { wishlistState, setWishlistState } = useContext(wishlistContext);
	const [isLoading, setIsLoading] = useState(false);
	if (wishlistState) {
		const isFound = wishlistState.find(
			(wishlistItem: productType) => wishlistItem.id === productID
		);
		if (isFound) {
			return (
				<RemoveFromWishlistButton
					productID={productID}
					setWishlistState={setWishlistState}
					isLoading={isLoading}
					setisLoading={setIsLoading}
				/>
			);
		} else {
			return (
				<AddToWishlistButton
					productID={productID}
					setWishlistState={setWishlistState}
					isLoading={isLoading}
					setisLoading={setIsLoading}
				/>
			);
		}
	}

	// return <AddToWishlistButton productID={productID} setWishlistState={setWishlistState} />;
}

function AddToWishlistButton({
	productID,
	setWishlistState,
	isLoading,
	setisLoading,
}: {
	productID: string;
	setWishlistState: Function;
	isLoading: boolean;
	setisLoading: Function;
}) {
	const router = useRouter();

	return (
		<>
			<Button
				variant={"outline"}
				className="w-full cursor-pointer"
				disabled={isLoading}
				onClick={async () => {
					setisLoading(true);
					const payload = await addToWishlist(productID).then(
						async () => {
							return fetch(
								`http://localhost:3000/api/getwishlist`
							)
								.then(async (response) => {
									toast.success("Product added to wishlist");
									setWishlistState(await response.json());
									setisLoading(false);
								})
								.catch((error) => {
									toast.error(
										error.message ||
											"Cannot add product to wishlist"
									);
									setisLoading(false);
								});
						}
					);
				}}>
				{isLoading ? (
					<Spinner />
				) : (
					<p className="flex items-center gap-3">
						<Heart />
						Add to wishlist
					</p>
				)}
			</Button>
		</>
	);
}
function RemoveFromWishlistButton({
	productID,
	setWishlistState,
	isLoading,
	setisLoading,
}: {
	productID: string;
	setWishlistState: Function;
	isLoading: boolean;
	setisLoading: Function;
}) {
	const router = useRouter();
	return (
		<>
			<Button
				variant={"destructive"}
				className="w-full cursor-pointer"
				disabled={isLoading}
				onClick={async () => {
					setisLoading(true);
					const payload = await removeFromWishlist(productID).then(
						async () => {
							return fetch(
								`http://localhost:3000/api/getwishlist`
							)
								.then(async (response) => {
									toast.success(
										"Product removed from wishlist"
									);
									setWishlistState(await response.json());
									setisLoading(false);
								})
								.catch((error) => {
									toast.error(
										error.message ||
											"Cannot remove product from wishlist"
									);
									setisLoading(false);
								});
						}
					);
				}}>
				{isLoading ? (
					<Spinner />
				) : (
					<p className="flex items-center gap-3">
						<Heart fill="red" /> Remove from wishList
					</p>
				)}
			</Button>
		</>
	);
}
