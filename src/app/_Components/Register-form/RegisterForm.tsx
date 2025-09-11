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
import { useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function RegisterForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [loading, setLoading] = useState(false);

	const formSchema = z
		.object({
			name: z
				.string()
				.min(2, "Name must be at least 2 characters long.")
				.max(20, "Name can only be 20 characters max."),
			email: z.email("Enter a valid email."),
			password: z
				.string()
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"make sure passoword contains symbols, upper and lower case characters, and numbers."
				),
			rePassword: z.string(),
			phone: z.string().regex(/^(20|\+20){0,1}01[0|1|5|2][0-9]{8}$/),
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
			name: "",
			email: "",
			password: "",
			rePassword: "",
			phone: "",
		},
		resolver: zodResolver(formSchema),
	});

	async function handleRegister(userData: object) {
		setLoading(true);

		axios
			.post(
				"https://ecommerce.routemisr.com/api/v1/auth/signup",
				userData
			)
			.then(() => {
				toast.success("Account created successfully!");
				router.push("/login");
			})
			.catch((err: RegisterErrorType) => {
				toast.error(err.response.data.message);
				setLoading(false);
			});
	}

	const router = useRouter();

	return (
		<FormProvider {...form}>
			<form
				className={cn("flex flex-col gap-6", className)}
				{...props}
				onSubmit={form.handleSubmit(handleRegister)}>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">
						Register a new account
					</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your info below to create your new account
					</p>
				</div>
				<div className="grid gap-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your name</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loading}
										placeholder="John Doe"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter your email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={loading}
										placeholder="email@provider.com"
									/>
								</FormControl>
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
									<Input
										{...field}
										type="password"
										disabled={loading}
										placeholder="••••••••"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="rePassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Repeat your password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										disabled={loading}
										placeholder="••••••••"
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
					<Button
						type="submit"
						className="w-full cursor-pointer"
						disabled={loading}>
						{loading ? <Spinner /> : "Register"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}
