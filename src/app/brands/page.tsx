"use client";
import React, { useEffect, useState } from "react";
import AllBrands from "@/apis/AllBrands.api";
import { brandMetadataType, brandType } from "../_interfaces/brand.interface";
import { useSearchParams } from "next/navigation";
import Paginator from "../_Components/Paginator/Paginator";
import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function Brands() {
	// const searchParams = Object.fromEntries(useSearchParams().entries());
	const searchParams = useSearchParams();

	const [brandList, setBrandList] = useState<brandType[]>([]);
	const [metaData, setMetaData] = useState<brandMetadataType>({});
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		async function getBrands() {
			try {
				const data: {
					data: brandType[];
					metadata: brandMetadataType;
				} = await AllBrands(searchParams);
				setBrandList(data.data);
				setMetaData(data.metadata);
			} catch {
				throw new Error("couldn't retrieve brands");
			}
		}
		async function workaround() {
			setisLoading(true);
			await getBrands();
			setisLoading(false);
		}
		workaround();
	}, [searchParams]);

	return (
		<>
			{isLoading ? (
				<div className="min-h-[calc(100vh-2rem-60px)] justify-center items-center flex">
					<span className="loader"></span>
				</div>
			) : (
				<>
					<motion.div
						className="min-h-[calc(100vh-2rem-60px-35px)] relative"
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
						<div className=" w-full products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
							{brandList?.map((brand: brandType) => {
								return (
									<Link
										href={`/brands/${brand._id}`}
										key={brand._id}>
										<div className="flex flex-col items-center justify-center gap-3 border-2 border-solid rounded-2xl py-5">
											<Image
												src={brand.image}
												alt={brand.slug}
												width={200}
												height={100}
												className="object-cover object-center"
											/>
											<p className="text-center">
												{brand.name}
											</p>
										</div>
									</Link>
								);
							})}
						</div>
					</motion.div>

					<div className="my-3">
						<Paginator metaData={metaData} />
					</div>
				</>
			)}
		</>
	);
}
