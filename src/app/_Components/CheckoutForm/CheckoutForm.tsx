"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import onlinePayment from "@/utilities/onlinePayment.action";
import cashPayment from "@/utilities/cashPayment.action";
import { CartCountBadge } from "../CartCountContext/CartCountContext";
import { clearCartBadge } from "@/utilities/cartBadge.Actions";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AddNewAddress from "@/utilities/AddNewAddress";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import RemoveAddress from "@/utilities/RemoveAddress";

export default function CheckoutForm() {
	const [loading, setLoading] = useState(false);
	const { setCartCountState } = useContext(CartCountBadge);

	interface AddressListType {
		name: string;
		details: string;
		phone: string;
		city: string;
		_id: string;
	}
	const [addressList, setAddressList] = useState<AddressListType[] | null>(
		null
	);
	const [deletingAddress, setDeletingAddress] = useState(false);

	const { userID } = useParams();

	useEffect(() => {
		async function dummyFunc() {
			const response = await fetch(
				`http://localhost:3000/api/useraddresses`
			);
			const data = await response.json();
			if (data?.length > 0) {
				setAddressList(data);
			}
		}
		dummyFunc();
	}, []);

	const formSchema = z.object({
		name: z
			.string()
			.min(2, "name must be 2 characters or longer")
			.max(20, "name can only be 20 characters max."),
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
		saveAddress: z.boolean(),
	});
	const form = useForm({
		defaultValues: {
			name: "",
			details: "",
			phone: "",
			city: "",
			paymentMethod: "",
			saveAddress: false,
		},
		resolver: zodResolver(formSchema),
	});

	async function handleCheckout(addressData: {
		city: string;
		details: string;
		phone: string;
		paymentMethod: string;
		name: string;
		saveAddress: boolean;
	}) {
		setLoading(true);

		if (addressData.saveAddress) {
			try {
				await AddNewAddress({
					name: addressData.name,
					details: addressData.details,
					phone: addressData.phone,
					city: addressData.city,
				});
				// data contains a new array of addresses
			} catch {
				throw new Error("Couldn't save new address");
			}
		}

		if (addressData.paymentMethod === "cash") {
			try {
				await cashPayment(userID as string, {
					details: addressData.details,
					city: addressData.city,
					phone: addressData.phone,
				});
				toast.success("Order created successfully!");
				setLoading(false);
				clearCartBadge(setCartCountState);
				router.push("/allorders");
			} catch {
				setLoading(false);
				throw new Error("Error");
			}
		} else if (addressData.paymentMethod === "online") {
			try {
				const forwardURL = await onlinePayment(userID as string, {
					details: addressData.details,
					city: addressData.city,
					phone: addressData.phone,
				});
				setLoading(false);
				router.push(forwardURL);
			} catch {
				setLoading(false);
				throw new Error("Error");
			}
		}
	}

	function handleSelect(id: string) {
		if (addressList) {
			const address = addressList?.find(
				(address: AddressListType) => address._id == id
			);
			form.reset({
				name: address?.name,
				details: address?.details,
				phone: address?.phone,
				city: address?.city,
			});
		}
	}

	async function handleRemoveAddress(id: string) {
		setDeletingAddress(true);
		try {
			const { data } = await RemoveAddress(id);
			console.log(data);
			setAddressList(data);
			setDeletingAddress(false);
		} catch {
			setDeletingAddress(false);
			throw new Error("couldn't delete address");
		}
	}
	const router = useRouter();

	return (
		<FormProvider {...form}>
			<form
				className={cn("flex flex-col gap-3")}
				onSubmit={form.handleSubmit(handleCheckout)}>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Checkout</h1>
					{addressList ? (
						<>
							<p className="text-muted-foreground text-sm text-balance">
								Choose your shipping information to finalize
								your order
							</p>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<DropdownMenu>
											<DropdownMenuTrigger
												asChild
												className="w-full">
												<Button
													variant="outline"
													className="">
													{field.value ||
														"Choose from saved addresses"}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="dropdown-content-width-full hide-scrollbar max-h-[400px]">
												{addressList?.map(
													(address, index) => {
														return (
															<div
																key={
																	address._id
																}>
																<DropdownMenuItem
																	className={`w-full ${
																		index ==
																			addressList.length -
																				1 &&
																		"mb-0.5"
																	}`}
																	onSelect={() =>
																		handleSelect(
																			address._id
																		)
																	}>
																	<div
																		className={`w-full flex flex-col gap-1 text-gray-600 dark:text-gray-200`}>
																		<h1 className="text-center">
																			{
																				address.name
																			}
																		</h1>
																		<h2 className=" text-center ">
																			Details:{" "}
																			{
																				address.details
																			}
																		</h2>

																		<p className="text-center">
																			Phone:{" "}
																			{
																				address.phone
																			}
																		</p>
																		<p className="text-center">
																			Address:{" "}
																			{
																				address.city
																			}
																		</p>
																	</div>
																	<Button
																		disabled={
																			deletingAddress
																		}
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			handleRemoveAddress(
																				address._id
																			);
																		}}
																		variant="destructive"
																		className="py-12 !px-5 cursor-pointer hover:bg-red-700 focus:bg-red-800 dark:hover:bg-red-500 dark:focus:bg-red-400">
																		{deletingAddress ? (
																			<Spinner />
																		) : (
																			<Trash
																				className="text-white"
																				style={{
																					width: "20px",
																					height: "20px",
																				}}
																			/>
																		)}
																	</Button>
																</DropdownMenuItem>
																{index <
																	addressList.length -
																		1 && (
																	<Separator className="my-1" />
																)}
															</div>
														);
													}
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</FormItem>
								)}
							/>
							<div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
								<span className="bg-card text-muted-foreground relative z-10 px-2">
									Or enter new Address
								</span>
							</div>
						</>
					) : (
						<p className="text-muted-foreground text-sm text-balance">
							Enter your shipping information to finalize your
							order
						</p>
					)}
				</div>

				<div className="grid gap-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="pl-2">Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loading}
										placeholder="Home"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="details"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="pl-2">
									Enter any details
								</FormLabel>
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
								<FormLabel className="pl-2">
									Enter your phone number
								</FormLabel>
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
								<FormLabel className="pl-2">
									Enter your Address
								</FormLabel>
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
							<FormItem className=" flex items-center justify-center content-around flex-wrap ">
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
					<FormField
						control={form.control}
						name="saveAddress"
						render={({ field }) => (
							<FormItem className=" flex items-center justify-center content-around flex-wrap ">
								<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-cyan-700 has-[[aria-checked=true]]:bg-cyan-100 dark:has-[[aria-checked=true]]:border-cyan-900 dark:has-[[aria-checked=true]]:bg-cyan-950">
									<Checkbox
										id="toggle-2"
										onCheckedChange={field.onChange}
										checked={field.value}
										className="data-[state=checked]:border-cyan-700 data-[state=checked]:bg-cyan-700 data-[state=checked]:text-white dark:data-[state=checked]:border-cyan-800 dark:data-[state=checked]:bg-cyan-800"
									/>
									<div className="grid gap-1.5 font-normal">
										<p className="text-sm leading-none font-medium">
											Save address information
										</p>
										<p className="text-muted-foreground text-sm">
											You can choose from saved addresses
											on your next orders.
										</p>
									</div>
								</Label>
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
