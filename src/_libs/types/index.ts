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
	PLACED = 'placed',
	DELIVERED = 'delivered',
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
