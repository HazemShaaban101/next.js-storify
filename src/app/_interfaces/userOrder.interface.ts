export type UserOrderType = {
	shippingAddress: {
		details: string;
		phone: string;
		city: string;
	};
	taxPrice: number;
	shippingPrice: number;
	totalOrderPrice: number;
	paymentMethodType: string;
	isPaid: boolean;
	isDelivered: boolean;
	_id: string;
	user: {
		_id: string;
		name: string;
		email: string;
		phone: string;
	};
	cartItems: Array<{
		count: number;
		product: {
			subcategory: Array<{
				_id: string;
				name: string;
				slug: string;
				category: string;
			}>;
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
	}>;
	createdAt: string;
	updatedAt: string;
	id: number;
	__v: number;
};
