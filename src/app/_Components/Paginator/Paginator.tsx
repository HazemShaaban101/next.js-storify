import { brandMetadataType } from "@/app/_interfaces/brand.interface";
import { metadata } from "@/app/layout";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

export default function Paginator({
	metaData,
}: {
	metaData: brandMetadataType;
}) {
	return (
		<div className="mt-5">
			<Pagination>
				<PaginationContent>
					{metaData.prevPage && (
						<PaginationItem>
							<PaginationPrevious
								href={`?page=${metaData.prevPage}`}
							/>
						</PaginationItem>
					)}
					{metaData.currentPage! - 3 > 0 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					{metaData.currentPage! - 2 > 0 && (
						<PaginationItem>
							<PaginationLink
								href={`?page=${metaData.currentPage! - 2}`}>
								{metaData.currentPage! - 2}
							</PaginationLink>
						</PaginationItem>
					)}
					{metaData.currentPage! - 1 > 0 && (
						<PaginationItem>
							<PaginationLink
								href={`?page=${metaData.currentPage! - 1}`}>
								{metaData.currentPage! - 1}
							</PaginationLink>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink
							href={`?page=${metaData.currentPage!}`}
							isActive>
							{metaData.currentPage!}
						</PaginationLink>
					</PaginationItem>
					{metaData.currentPage! + 1 <= metaData.numberOfPages! && (
						<PaginationItem>
							<PaginationLink
								href={`?page=${metaData.currentPage! + 1}`}>
								{metaData.currentPage! + 1}
							</PaginationLink>
						</PaginationItem>
					)}
					{metaData.currentPage! + 2 <= metaData.numberOfPages! && (
						<PaginationItem>
							<PaginationLink
								href={`?page=${metaData.currentPage! + 2}`}>
								{metaData.currentPage! + 2}
							</PaginationLink>
						</PaginationItem>
					)}
					{metaData.currentPage! + 3 <= metaData.numberOfPages! && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{metaData.nextPage && (
						<PaginationItem>
							<PaginationNext
								href={`?page=${metaData.nextPage}`}
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
