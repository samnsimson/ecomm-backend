export type FindByArgs<T> = {
	[K in keyof T]?: T[K] extends object ? FindByArgs<T[K]> : T[K];
};

export enum PaymentType {
	CARD = 'card',
	CASH = 'cash',
}

export enum PaymentProvider {
	STRIPE = 'stripe',
}

export enum PaymentStatus {
	PAID = 'paid',
	PENDING = 'pending',
	PROCESSING = 'processing',
	FAILED = 'failed',
	CANCELLED = 'cancelled',
	REFUNDED = 'refunded',
}

export enum OrderStatus {
	CREATED = 'created',
	PROCESSING = 'processing',
	SHIPPED = 'shipped',
	FULLFILLED = 'fulfilled',
	CALCELLED = 'cancelled',
}

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin',
}

export type JwtPayload = {
	id: string;
	username: string;
	role: UserRole;
	email: string;
	name: string;
	[x: string]: any;
};

export type CurrentUserType = JwtPayload;

export enum ShippingTypes {
	FREE = 'free',
	FLAT = 'flat',
	PERCENTAGE = 'percentage',
}

export enum TaxTypes {
	FLAT = 'flat',
	PERCENTAGE = 'percentage',
}

export enum Currency {
	INR = 'INR',
	USD = 'USD',
	CAD = 'CAD',
}

export enum EmailTemplate {
	ORDER_CREATED = 'order-created',
	ORDER_SHIPPED = 'order-shipped',
	ORDER_CANCELLED = 'order-cancelled',
}

export type OrderConfirmationContext = {
	firstName: string;
	lastName: string;
	orderTotal: string;
	email: string;
	phone: string;
	orderItems: Array<{
		itemName: string;
		quantity: number;
		price: string;
	}>;
	shippingAddress: {
		addressOne: string;
		addressTwo?: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};
};

export enum CouponType {
	FLAT = 'FLAT',
	PERCENTAGE = 'PERCENTAGE',
}

export enum CouponUsageType {
	MULTI_USE = 'MULTI_USE',
	SINGLE_USE = 'SINGLE_USE',
}
