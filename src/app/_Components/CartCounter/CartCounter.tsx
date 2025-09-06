"use client";
import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import updateProductCartCount from "@/utilities/updateProductCartCount";
import { Plus, Minus } from "lucide-react";
import { TelemetryPlugin } from "next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin";
import React, { useContext, useState } from "react";
import { CartCountBadge } from "../CartCountContext/CartCountContext";
import { decBadge, incBadge } from "@/utilities/cartBadge.Actions";

export default function CartCounter({
	id,
	count,
	removing,
	setUpdateLoading,
	updateLoading,
	setCartItems,
}: {
	id: string;
	count: number;
	removing: boolean;
	setUpdateLoading: Function;
	updateLoading: boolean;
	setCartItems: Function;
}) {
	const [disabled, setDisabled] = useState(false);

	const { cartCountState, setCartCountState } = useContext(CartCountBadge);

	async function handleUpdateCartCount(newCount: number, sign: string) {
		setDisabled(true);
		setUpdateLoading(true);
		try {
			const payload = await updateProductCartCount(id, newCount);

			console.log(payload);
			setCartItems(payload);
			setDisabled(false);
			setUpdateLoading(false);
			sign === "+"
				? incBadge(setCartCountState)
				: decBadge(setCartCountState);
		} catch (error) {
			setDisabled(false);
			setUpdateLoading(false);

			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	}

	return (
		<>
			<div className="flex justify-center items-center gap-3">
				<Button
					className="p-0 rounded-full w-7 h-7"
					disabled={disabled || removing}
					onClick={() => {
						handleUpdateCartCount(count - 1, "-");
					}}>
					<Minus />
				</Button>
				<p className="w-[20px]">
					{disabled ? (
						<Spinner
							className="text-cyan-800 "
							size={18}
							variant="circle"
						/>
					) : (
						count
					)}
				</p>
				<Button
					className="p-0 rounded-full w-7 h-7"
					disabled={disabled || removing}
					onClick={() => {
						handleUpdateCartCount(count + 1, "+");
					}}>
					<Plus />
				</Button>
			</div>
		</>
	);
}
