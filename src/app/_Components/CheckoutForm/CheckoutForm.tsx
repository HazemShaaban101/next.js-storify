"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	RegisterErrorType,
	registerType,
} from "@/app/_interfaces/register.interface";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import onlinePayment from "@/utilities/onlinePayment.action";

export default function CheckoutForm(
	defaultValues: { details: string; phone: string; city: string } | {} = {
		details: "",
		phone: "",
		city: "",
	}
) {
	const [loading, setLoading] = useState(false);

	const { userID } = useParams();

	const formSchema = z.object({
		details: z.string().max(256, "Details can only be 256 characters max."),

		phone: z
			.string()
			.regex(
				/^(20|\+20){0,1}01[0|1|5|2][0-9]{8}$/,
				"Invalid Phone Number"
			),
		city: z
			.string()
			.min(2, "Address must be at least 2 characters long.")
			.max(64, "Address can only be 64 characters max."),
		paymentMethod: z
			.string()
			.regex(/^(cash|online){1}$/, "Choose a Payment option"),
	});
	const form = useForm({
		defaultValues: {
			details: "",
			phone: "",
			city: "",
			paymentMethod: "",
		},
		resolver: zodResolver(formSchema),
	});

	async function handleCheckout(addressData: {
		city: string;
		details: string;
		phone: string;
		paymentMethod: string;
	}) {
		setLoading(true);

		if (addressData.paymentMethod === "cash") {
			console.log("Cash payment");
		} else if (addressData.paymentMethod === "online") {
			try {
				console.log("Online Payment");
				const forwardURL = await onlinePayment(userID as string, {
					details: addressData.details,
					city: addressData.city,
					phone: addressData.phone,
				});
				setLoading(false);
				router.push(forwardURL);
			} catch (error) {
				setLoading(false);
				throw new Error("Error");
			}
		}

		setLoading(false);
		// axios
		// 	.post(
		// 		`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${userID}?url=http://localhost:3000`,
		// 		addressData
		// 	)
		// 	.then(() => {
		// 		toast.success("Account created successfully!");
		// 		router.push("/login");
		// 	})
		// 	.catch((err: RegisterErrorType) => {
		// 		toast.error(err.response.data.message);
		// 		setLoading(false);
		// 	});
	}

	const router = useRouter();

	return (
		<FormProvider {...form}>
			<form
				className={cn("flex flex-col gap-6")}
				onSubmit={form.handleSubmit(handleCheckout)}>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Checkout</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your info below to finalize your order!
					</p>
				</div>
				<div className="grid gap-3">
					<FormField
						control={form.control}
						name="details"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter any details</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loading}
										placeholder="Deliver after 5 pm..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your phone number</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loading}
										placeholder="+201023456789"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your Address</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										disabled={loading}
										placeholder="25 someplace st, somewhere..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="paymentMethod"
						render={({ field }) => (
							<FormItem className="my-2 flex items-center justify-center content-around flex-wrap ">
								<FormLabel className="text-lg font-bold w-full flex justify-center">
									Payment method
								</FormLabel>
								<FormControl className="w-full">
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex gap-10 items-center justify-center">
										<FormItem className="flex items-center gap-3">
											<FormControl>
												<RadioGroupItem
													value="cash"
													className="border-cyan-800 h-6 w-6 [&_svg]:h-4 [&_svg]:w-4"
												/>
											</FormControl>
											<FormLabel className=" text-md">
												Cash
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center gap-3">
											<FormControl>
												<RadioGroupItem
													value="online"
													className="border-cyan-800 h-6 w-6 [&_svg]:h-4 [&_svg]:w-4"
												/>
											</FormControl>
											<FormLabel className="text-md">
												Online payment
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full cursor-pointer mt-2"
						disabled={loading}>
						{loading ? <Spinner /> : "Checkout"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}
