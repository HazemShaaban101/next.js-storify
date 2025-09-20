"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import ResetPasswordOTP from "../_Components/ResetPasswordOTP/ResetPasswordOTP";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "next/navigation";

import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";

export default function ResetPassword() {
	const [step, setStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const totalSteps = 3;
	const router = useRouter();

	const schemaArray = [
		z.object({
			email: z.email("Enter a valid email."),
		}),
		z.object({
			resetCode: z
				.string()
				.regex(/^[0-9]{6}$/, "Enter the password sent to your Email."),
		}),
		z
			.object({
				email: z.string(),
				newPassword: z
					.string()
					.regex(
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
						"make sure passoword contains symbols, upper and lower case characters, and numbers."
					),
				rePassword: z.string(),
			})
			.refine(
				(schema) => {
					return schema.newPassword === schema.rePassword;
				},
				{
					error: "Enter the same password in both fields!",
					path: ["rePassword"],
				}
			),
	];
	// const formSchema = z
	// 	.object({
	// 		email: z.email("Enter a valid email."),
	// 		newPassword: z
	// 			.string()
	// 			.regex(
	// 				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	// 				"make sure passoword contains symbols, upper and lower case characters, and numbers."
	// 			),
	// 		rePassword: z.string(),
	// 		resetCode: z.string().regex(/^[0-9]{6}$/),
	// 	})
	// 	.refine(
	// 		(schema) => {
	// 			return schema.newPassword === schema.rePassword;
	// 		},
	// 		{
	// 			error: "Enter the same password in both fields!",
	// 			path: ["rePassword"],
	// 		}
	// 	);

	const form = useForm({
		defaultValues: {
			email: "",
			resetCode: "",
			newPassword: "",
			rePassword: "",
		},
		resolver: zodResolver(schemaArray[step]),
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	async function handleResetPassword(formData: unknown) {
		try {
			const response = await fetch(
				`http://localhost:3000/api/forgotpassword`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const payload = await response.json();
				toast.success(payload.message);
				setStep(1);
			} else if (response.status === 404) {
				toast.error(
					"Email not found. make sure you entered the correct email.",
					{ className: "text-center flex flex-col" }
				);
			}
		} catch (error) {
			setIsLoading(false);
			throw new Error("...Internal route error...");
		}
	}
	async function handleVerifyCode(formData: unknown) {
		try {
			const response = await fetch(
				`http://localhost:3000/api/verifycode`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const payload = await response.json();
				setStep(2);
			} else if (response.status === 400) {
				toast.error("Wrong code. check your email for correct code", {
					className: "text-center flex flex-col",
				});
			}
		} catch (error) {
			setIsLoading(false);
			throw new Error("...Internal route error...");
		}
	}

	async function handleSetNewPassword(formData: unknown) {
		try {
			const response = await fetch(
				`http://localhost:3000/api/resetpassword`,
				{
					method: "PUT",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const payload = await response.json();
				console.log(payload);
				toast.success("Password successfully reset.");
				router.push("/login");
			} else {
				toast.error("Failed to change password.", {
					className: "text-center flex flex-col",
				});
			}
		} catch (error) {
			setIsLoading(false);
			throw new Error("...Internal route error...");
		}
	}

	const { handleSubmit, control, reset } = form;

	const onSubmit = async (formData: unknown) => {
		console.log(`step ${step + 1}`, formData);
		if (step === 0) {
			setIsLoading(true);
			await handleResetPassword(formData);
			setIsLoading(false);
		} else if (step === 1) {
			setIsLoading(true);
			await handleVerifyCode(formData);
			setIsLoading(false);
		} else if (step === 2) {
			setIsLoading(true);
			await handleSetNewPassword(formData);
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	return (
		<>
			<motion.div
				className="space-y-4 h-[calc(100vh-2rem-60px)] flex justify-center items-center flex-col gap-5"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						duration: 0.5,
						type: "spring",
						stiffness: 100,
					},
				}}>
				<div className="flex items-center justify-center">
					{Array.from({ length: totalSteps }).map((_, index) => (
						<div key={index} className="flex items-center">
							<div
								className={cn(
									"w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
									index <= step
										? "bg-primary"
										: "bg-primary/30",
									index < step && "bg-primary"
								)}
							/>
							{index < totalSteps - 1 && (
								<div
									className={cn(
										"w-8 h-0.5",
										index < step
											? "bg-primary"
											: "bg-primary/30"
									)}
								/>
							)}
						</div>
					))}
				</div>
				<Card className="shadow-sm w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mb-20">
					<AnimatePresence mode="wait">
						{step === 0 && (
							<motion.div
								layout
								key={0}
								initial={{ scale: 0.6, opacity: 0 }}
								animate={{
									scale: 1,
									opacity: 1,

									transition: { duration: 0.5 },
								}}
								exit={{
									scale: 0.6,
									opacity: 0,
									transition: { duration: 0.5 },
								}}>
								<CardHeader>
									<CardTitle className="text-xl font-bold font-mono text-center">
										Step UNO! enter your Email.
									</CardTitle>
									<CardDescription className="text-center mb-5">
										Verification code will be sent to your
										provided Email.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Form {...form}>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="grid gap-y-4">
											<FormField
												key="email"
												control={control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Email
														</FormLabel>
														<FormControl>
															<Input
																{...field}
																placeholder="email@provider.com"
																autoComplete="email"
																disabled={
																	isLoading
																}
															/>
														</FormControl>
														<FormDescription></FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											<div className="flex justify-between">
												<Button
													type="submit"
													size="sm"
													className="font-medium w-full py-5"
													disabled={isLoading}>
													{isLoading ? (
														<Spinner />
													) : (
														"Next"
													)}
												</Button>
											</div>
										</form>
									</Form>
								</CardContent>
							</motion.div>
						)}

						{step === 1 && (
							<motion.div
								layout
								key={1}
								initial={{ scale: 0.6, opacity: 0 }}
								animate={{
									scale: 1,
									opacity: 1,

									transition: { duration: 0.5 },
								}}
								exit={{
									scale: 0.6,
									opacity: 0,
									transition: { duration: 0.5 },
								}}>
								<CardHeader>
									<CardTitle className="text-xl font-bold font-mono text-center">
										Step DOS! Enter verification code sent
										to your Email.
									</CardTitle>
									<CardDescription className="text-center mb-5">
										If you didn't recieve a code, verify
										your Email is correct.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Form {...form}>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="grid gap-y-4">
											<FormField
												key="resetCode"
												control={control}
												name="resetCode"
												render={({ field }) => (
													<FormItem className="">
														<FormControl>
															<ResetPasswordOTP
																field={field}
																isLoading={
																	isLoading
																}
															/>
														</FormControl>
														<FormDescription></FormDescription>
														<FormMessage className="text-center" />
													</FormItem>
												)}
											/>

											<div className="flex justify-between w-full">
												<Button
													type="button"
													className="font-medium px-10 py-5 min-w-[15%]"
													size="sm"
													onClick={handleBack}
													disabled={isLoading}>
													Back
												</Button>
												<Button
													type="submit"
													size="sm"
													className="font-medium px-10 py-5 min-w-[15%]"
													disabled={isLoading}>
													{isLoading ? (
														<Spinner />
													) : (
														"Next"
													)}
												</Button>
											</div>
										</form>
									</Form>
								</CardContent>
							</motion.div>
						)}

						{step === 2 && (
							<motion.div
								layout
								key={2}
								initial={{ scale: 0.6, opacity: 0 }}
								animate={{
									scale: 1,
									opacity: 1,
									transition: { duration: 0.5 },
								}}
								exit={{
									scale: 0.6,
									opacity: 0,
									transition: { duration: 0.5 },
								}}>
								<CardHeader>
									<CardTitle className="text-xl font-bold font-mono text-center">
										Lasto Stepo! just enter your new
										password!
									</CardTitle>
									<CardDescription className="text-center mb-5">
										Make sure to remember your password this
										time, We don't wanna go over these steps
										every time eh?
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Form {...form}>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="grid gap-y-4">
											<FormField
												key="password"
												control={control}
												name="newPassword"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															New password
														</FormLabel>
														<FormControl>
															<Input
																disabled={
																	isLoading
																}
																{...field}
																type="password"
																placeholder="••••••••"
																autoComplete="off"
															/>
														</FormControl>
														<FormDescription></FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												key="rePassword"
												control={control}
												name="rePassword"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Re-enter your new
															password
														</FormLabel>
														<FormControl>
															<Input
																disabled={
																	isLoading
																}
																{...field}
																type="password"
																placeholder="••••••••"
																autoComplete="off"
															/>
														</FormControl>
														<FormDescription></FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											<div className="flex justify-between">
												<Button
													type="submit"
													size="sm"
													className="font-medium w-full py-5"
													disabled={isLoading}>
													{isLoading ? (
														<Spinner />
													) : (
														"Submit"
													)}
												</Button>
											</div>
										</form>
									</Form>
								</CardContent>
							</motion.div>
						)}
					</AnimatePresence>
				</Card>
			</motion.div>
		</>
	);
}
