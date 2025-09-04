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
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

export default function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const formSchema = z.object({
		email: z.email("Enter a valid email."),
		password: z.string(),
	});

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(formSchema),
	});

	async function handleLogin(userData: object) {
		console.log(userData);

		const loginData = await signIn("credentials", {
			...userData,
			redirect: false,
		});

		if (loginData?.ok) {
			toast.success("User logged in successfully!");
			console.log("userData: ", loginData);
			window.location.href = "/";
		} else {
			toast.error(loginData?.error || "Login fail...");
		}
	}

	const router = useRouter();

	return (
		<FormProvider {...form}>
			<form
				className={cn("flex flex-col gap-6", className)}
				{...props}
				onSubmit={form.handleSubmit(handleLogin)}>
				<div className=" items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">
						Alreaady have an account?
					</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your info below to log into your account
					</p>
				</div>
				<div className="grid gap-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your email</FormLabel>
								<FormControl>
									<Input {...field} />
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
							<FormItem>
								<FormLabel>Enter your password</FormLabel>
								<FormControl>
									<Input {...field} type="password" />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Login
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}
