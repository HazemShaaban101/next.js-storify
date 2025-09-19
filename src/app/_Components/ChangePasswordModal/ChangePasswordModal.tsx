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

export function ChangePasswordModal() {
	const [loading, setLoading] = useState(false);

	const formSchema = z
		.object({
			currentPassword: z.string(),
			password: z
				.string()
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"make sure passoword contains symbols, upper and lower case characters, and numbers."
				),
			rePassword: z.string(),
		})
		.refine(
			(schema) => {
				return schema.password === schema.rePassword;
			},
			{
				error: "Enter the same password in both fields!",
				path: ["rePassword"],
			}
		);

	const form = useForm({
		defaultValues: {
			currentPassword: "",
			password: "",
			rePassword: "",
		},
		resolver: zodResolver(formSchema),
	});

	async function handleChangePassword(userData: {
		currentPassword: string;
		password: string;
		rePassword: string;
	}) {
		setLoading(true);
		const response = await ChangePassword(userData);
		console.log(response);
		if (response.message === "success") {
			toast.success("Password changed successfully!");
			setLoading(false);
			signOut();
		} else {
			toast.error("Failed to change password");
			setLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Change password</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<FormProvider {...form}>
					<form
						className={"flex flex-col gap-6"}
						onSubmit={form.handleSubmit(handleChangePassword)}>
						<div className=" items-center gap-2 text-center">
							<h1 className="text-2xl font-bold">
								Reset your password
							</h1>
							<p className="text-muted-foreground text-sm text-balance">
								Enter your info below to create a new password
							</p>
						</div>
						<div className="grid">
							<FormField
								control={form.control}
								name="currentPassword"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>
											Enter current password
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={loading}
												type="password"
												placeholder="••••••••"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>
											Enter your new password
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												disabled={loading}
												placeholder="••••••••"
												autoComplete="off"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rePassword"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>
											Re-enter your new password
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												disabled={loading}
												placeholder="••••••••"
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
