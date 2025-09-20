"use client";
import { cn } from "@/lib/utils";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import ChangePassword from "@/utilities/ChangePassword";
import { signOut } from "next-auth/react";
import EditInfo from "@/utilities/EditInfo";

export function EditInfoModal() {
	const [loading, setLoading] = useState(false);

	const formSchema = z.object({
		name: z
			.string()
			.min(2, "Name has to be at least 2 characters long.")
			.max(64, "Name can only be 64 characters max."),
		email: z.email(),
		phone: z.string().regex(/^(20|\+20){0,1}01[0|1|5|2][0-9]{8}$/),
	});

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
		resolver: zodResolver(formSchema),
	});

	async function handleEditInfo(userData: {
		name: string;
		email: string;
		phone: string;
	}) {
		setLoading(true);
		const response = await EditInfo(userData);
		console.log(response);
		if (response.message === "success") {
			toast.success("Info edited successfully!");
			setLoading(false);
			signOut();
		} else {
			toast.error("Failed to save changes");
			setLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Edit information</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<FormProvider {...form}>
					<form
						className={"flex flex-col gap-6"}
						onSubmit={form.handleSubmit(handleEditInfo)}>
						<DialogHeader>
							<DialogTitle className="text-center">
								Reset your password
							</DialogTitle>
							<DialogDescription className="text-center">
								Change to your password here. Click save when
								you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Edit your name</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={loading}
												type="text"
												placeholder="john doe"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Edit your Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												disabled={loading}
												placeholder="johndoe@provider.com"
												autoComplete="email"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Edit your phone</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="tel"
												disabled={loading}
												placeholder="+20 10 23456789"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full cursor-pointer mt-3"
								disabled={loading}>
								{loading ? <Spinner /> : "Save"}
							</Button>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
