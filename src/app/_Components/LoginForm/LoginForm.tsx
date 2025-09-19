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
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		const loginData = await signIn("credentials", {
			...userData,
			redirect: false,
		});

		if (loginData?.ok) {
			toast.success("User logged in successfully!");
			window.location.href = "/";
		} else {
			setLoading(false);
			toast.error(loginData?.error || "Login fail...");
		}
	}

	const router = useRouter();

	return (
		<>
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
					<div className="grid">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-3">
									<FormLabel>Enter your email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={loading}
											placeholder="email@provider.com"
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
									<FormLabel>Enter your password</FormLabel>
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

						<p className="mt-2 py-0 text-sm/[14px] mb-5 text-center lg:text-left">
							Forgot your password? try{" "}
							<Link href={"/resetpassword"}>
								<Button
									variant={"link"}
									disabled={loading}
									type="button"
									className="p-0 cursor-pointer h-fit">
									Resetting your password
								</Button>
							</Link>
						</p>

						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={loading}>
							{loading ? <Spinner /> : "Login"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
}
