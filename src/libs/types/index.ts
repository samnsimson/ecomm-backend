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
