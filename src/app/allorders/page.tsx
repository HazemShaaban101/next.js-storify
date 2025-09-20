"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { UserOrderType } from "../_interfaces/userOrder.interface";
import { OrderModal } from "../_Components/OrderModal/OrderModal";
import * as motion from "motion/react-client";

export default function Orders() {
	const [userOrders, setUserOrders] = useState<UserOrderType[]>([]);
	const [openModal, setopenModal] = useState(false);
	const [modalOrder, setModalOrder] = useState<UserOrderType | null>(null);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);

	useEffect(() => {
		const dummyFunction = async () => handleGetUserOrders();
		dummyFunction().then(() => {
			setInitialLoading(false);
		});
	}, []);

	// get user cart items
	async function handleGetUserOrders() {
		console.log(process.env.NEXT_PUBLIC_NEXT_BASE);

		const response = await fetch(
			`https://next-js-storify.vercel.app/api/userorders`
		);

		const userOrders = await response.json();
		console.log("this is userOrders:", userOrders);
		setUserOrders(userOrders);
	}

	return (
		<>
			<OrderModal
				order={modalOrder}
				openModal={openModal}
				setOpenModal={setopenModal}
			/>
			{initialLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : userOrders.length > 0 ? (
				<motion.div
					className="min-h-[calc(100vh-2rem-60px)]"
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
					<div className="w-full border rounded-md overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">
										Id
									</TableHead>
									<TableHead className="text-center">
										Price (EGP)
									</TableHead>
									<TableHead className="text-center">
										Payment method
									</TableHead>
									<TableHead className="text-center">
										Status
									</TableHead>
									<TableHead className="text-center">
										created at
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{userOrders.map((order: UserOrderType) => (
									<TableRow
										onClick={() => {
											setModalOrder(order);
											setopenModal(true);
										}}
										key={order?._id}
										className="odd:bg-muted/50 cursor-pointer">
										<TableCell className="font-medium flex justify-center">
											{order.id}
										</TableCell>
										<TableCell className="font-medium text-center">
											{order.totalOrderPrice}
										</TableCell>
										<TableCell className="text-center">
											{order.paymentMethodType}
										</TableCell>
										<TableCell className="text-center">
											{order.isPaid ? (
												order.isDelivered ? (
													<p className="text-green-600 italic">
														Delivered
													</p>
												) : (
													<p className="">On route</p>
												)
											) : (
												<p className="text-yellow-600 italic">
													Awaiting payment
												</p>
											)}
										</TableCell>
										<TableCell className="text-center">
											{order.createdAt}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</motion.div>
			) : (
				<motion.div
					className="flex justify-center items-center w-full text-cyan-700 font-mono font-bold text-4xl flex-wrap gap-10 h-[calc(100vh-60px-2rem)] content-center"
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
					<p className="w-full text-center">
						You have no orders yet!
					</p>
					<Link href="/">
						<Button className="text-lg font-mono px-20 py-6 cursor-pointer">
							HomePage
						</Button>
					</Link>
				</motion.div>
			)}
		</>
	);
}
