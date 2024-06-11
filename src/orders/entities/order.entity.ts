import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { OrderStatus } from 'src/_libs/types';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { OrderItem } from './order-items.entity';

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@ObjectType()
@Entity({ name: 'order' })
export class Order extends CoreEntity {
	@Field(() => User)
	@ManyToOne(() => User, (user) => user.orders)
	user: User;

	@Field(() => [OrderItem])
	@OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true, eager: true })
	items: OrderItem[];

	@Field(() => Int)
	@Column('int')
	total: number;

	@Field(() => OrderStatus)
	@Column('enum', { enum: OrderStatus, default: OrderStatus.CREATED })
	status: OrderStatus;

	@Field(() => Payment)
	@OneToOne(() => Payment, (payment) => payment.order, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn()
	payment: Payment;

	@Field(() => String)
	@Column('text')
	billingEmail: string;

	@Field(() => String)
	@Column('text')
	billingPhone: string;

	@Field(() => String)
	@Column('text', { default: null })
	billingAddressOne: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingAddressTwo?: string;

	@Field(() => String)
	@Column('text', { default: null })
	billingCity: string;

	@Field(() => String)
	@Column('text', { default: null })
	billingState: string;

	@Field(() => String)
	@Column('text', { default: null })
	billingCountry: string;

	@Field(() => String)
	@Column('text', { default: null })
	billingZipcode: string;

	@Field(() => String)
	@Column('text', { default: null })
	shippingAddressOne: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingAddressTwo?: string;

	@Field(() => String)
	@Column('text', { default: null })
	shippingCity: string;

	@Field(() => String)
	@Column('text', { default: null })
	shippingState: string;

	@Field(() => String)
	@Column('text', { default: null })
	shippingCountry: string;

	@Field(() => String)
	@Column('text', { default: null })
	shippingZipcode: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('timestamp', { nullable: true, default: null })
	processedAt?: Date;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('timestamp', { nullable: true, default: null })
	shippedAt?: Date;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('timestamp', { nullable: true, default: null })
	fulfilledAt?: Date;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('timestamp', { nullable: true, default: null })
	cancelledAt?: Date;
}
