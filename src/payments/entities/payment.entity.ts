import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToOne } from 'typeorm';

enum PaymentType {
	CARD = 'card',
	CASH = 'cash',
}

enum PaymentProvider {
	STRIPE = 'stripe',
}

enum PaymentStatus {
	PAID = 'paid',
	PENDING = 'pending',
	PROCESSING = 'processing',
	FAILED = 'failed',
	CANCELLED = 'cancelled',
	REFUNDED = 'refunded',
}

registerEnumType(PaymentType, { name: 'PaymentType' });
registerEnumType(PaymentProvider, { name: 'PaymentProvider' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

@ObjectType()
@Entity({ name: 'payment' })
export class Payment extends CoreEntity {
	@Field(() => Int)
	@Column('float')
	amount: number;

	@Field(() => PaymentType)
	@Column('enum', { enum: PaymentType, default: PaymentType.CARD })
	type: PaymentType;

	@Field(() => PaymentProvider)
	@Column('enum', { enum: PaymentProvider, default: PaymentProvider.STRIPE })
	provider: PaymentProvider;

	@Field(() => PaymentStatus)
	@Column('enum', { enum: PaymentStatus, default: PaymentStatus.PENDING })
	status: PaymentStatus;

	@Field(() => Order)
	@OneToOne(() => Order, (order) => order.payment)
	order: Order;
}
