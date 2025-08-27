import { productType } from "@/app/_interfaces/product.interface";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { ShoppingCart, Star, User } from "lucide-react";

export function ProductCard({ product }: { product: productType }) {
	console.log(product);
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>
					<img
						src={product.brand?.image ? product.brand.image : ""}
						alt={product.brand?.slug ? product.brand.slug : ""}
						width={36}
					/>
					{product.brand?.name}
				</CardTitle>
				<CardDescription>{product.category?.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<img src={product?.imageCover} alt={product?.description} />

				<div className="flex justify-between">
					<p>{product?.price} EGP</p>
					<div className="flex gap-2 items-center">
						<span className="flex gap-1 items-center">
							{product.ratingsQuantity}
							<User size={"18px"} />
						</span>
						<span className="flex gap-1 items-center">
							{product?.ratingsAverage}{" "}
							<Star
								fill="#FFD700"
								color="#FFD700"
								size={"18px"}
							/>
						</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="button" className="w-full">
					<ShoppingCart />
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
}
