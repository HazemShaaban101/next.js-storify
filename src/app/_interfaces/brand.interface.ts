export type brandType = {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
};

export type brandMetadataType = {
	currentPage?: number;
	numberOfPages?: number;
	limit?: number;
	prevPage?: number;
	nextPage?: number;
};
