"use client";

import { CartItemType } from "@/app/_interfaces/cartItems.interface";
import { CartProduct } from "@/app/_interfaces/cartProduct.interface";
import { UserOrderType } from "@/app/_interfaces/userOrder.interface";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "flowbite-react";
import { useEffect, useState } from "react";

export function OrderModal({
	openModal,
	setOpenModal,
	order,
}: {
	openModal: boolean;
	setOpenModal: Function;
	order: UserOrderType | null;
}) {
	const [created, setCreated] = useState("");
	const [updated, setUpdated] = useState("");

	useEffect(() => {
		const createdTemp = new Date(order?.createdAt || "");
		const updatedTemp = new Date(order?.updatedAt || "");

		setCreated(createdTemp.toDateString());
		setUpdated(updatedTemp.toDateString());
	}, [order]);
	return (
		<>
			<Modal
				className=""
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}>
				<ModalHeader>Order #{order?.id}</ModalHeader>
				<ModalBody>
					<div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mb-2">
						<span className="bg-white dark:bg-[#374151] text-muted-foreground relative z-10 px-2">
							User information
						</span>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<p className="text-gray-700 dark:text-gray-400">
							Name:{" "}
							<span className="text-dark dark:text-white">
								{order?.user.name}
							</span>
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Phone:{" "}
							<span className="text-dark dark:text-white">
								{order?.shippingAddress.phone}
							</span>
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Details:{" "}
							<span className="text-dark dark:text-white">
								{order?.shippingAddress.details}
							</span>
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							City:{" "}
							<span className="text-dark dark:text-white">
								{order?.shippingAddress.city}
							</span>
						</p>
					</div>

					<div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-2">
						<span className="bg-white dark:bg-[#374151] text-muted-foreground relative z-10 px-2">
							Order details
						</span>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<p className="text-gray-700 dark:text-gray-400">
							Created at: {created}
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Last updated at: {updated}
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Order price:{" "}
							<span className="text-dark dark:text-white">
								{order?.totalOrderPrice} EGP
							</span>
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Payment method:{" "}
							<span className="text-dark dark:text-white">
								{order?.paymentMethodType}
							</span>
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Payment status:{" "}
							{order?.isPaid == true ? (
								<span className="text-green-500">Paid</span>
							) : (
								<span className="text-yellow-500">Pending</span>
							)}
						</p>
						<p className="text-gray-700 dark:text-gray-400">
							Delivery status:{" "}
							{order?.isDelivered == true ? (
								<span className="text-green-500">
									Delivered
								</span>
							) : (
								<span className="text-yellow-500">
									On route
								</span>
							)}
						</p>
					</div>

					<div className="space-y-6 my-3 border-2 border-border rounded-2xl">
						<Table className=" rounded-2xl overflow-hidden">
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">
										Item name
									</TableHead>
									<TableHead className="text-center">
										Count
									</TableHead>
									<TableHead className="text-center">
										Total price
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{order?.cartItems.map(
									(item: {
										count: number;
										product: {
											subcategory: {
												_id: string;
												name: string;
												slug: string;
												category: string;
											}[];
											ratingsQuantity: number;
											_id: string;
											title: string;
											imageCover: string;
											category: {
												_id: string;
												name: string;
												slug: string;
												image: string;
											};
											brand: {
												_id: string;
												name: string;
												slug: string;
												image: string;
											};
											ratingsAverage: number;
											id: string;
										};
										price: number;
										_id: string;
									}) => (
										<TableRow
											key={item._id}
											className="odd:bg-muted/50">
											<TableCell className="font-medium flex justify-center">
												{item.product.title}
											</TableCell>
											<TableCell className="font-medium text-center">
												{item.count}
											</TableCell>
											<TableCell className="text-center">
												{item.price}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}
