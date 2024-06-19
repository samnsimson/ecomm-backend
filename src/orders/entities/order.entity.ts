import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { OrderStatus } from 'src/_libs/types';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

	@Field(() => Int, { defaultValue: 0 })
	@Column('int', { default: 0 })
	total: number;

	@Field(() => Int, { defaultValue: 0 })
	@Column('int', { default: 0 })
	subTotal: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	discountAmount: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	couponAmount: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	shippingAmount: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	taxAmount: number;

	@Field(() => OrderStatus, { nullable: true, defaultValue: OrderStatus.PROCESSING })
	@Column('enum', { enum: OrderStatus, default: OrderStatus.PROCESSING })
	status: OrderStatus;

	@Field(() => Payment)
	@OneToOne(() => Payment, (payment) => payment.order, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn()
	payment: Payment;

	@Column('text')
	billingEmail: string;

	@Column('text')
	billingPhone: string;

	@Column('text', { default: null })
	billingAddressOne: string;

	// @Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingAddressTwo?: string;

	@Column('text', { default: null })
	billingCity: string;

	@Column('text', { default: null })
	billingState: string;

	@Column('text', { default: null })
	billingCountry: string;

	@Column('text', { default: null })
	billingZipcode: string;

	@Column('text', { default: null })
	shippingAddressOne: string;

	@Column('text', { nullable: true, default: null })
	shippingAddressTwo?: string;

	@Column('text', { default: null })
	shippingCity: string;

	@Column('text', { default: null })
	shippingState: string;

	@Column('text', { default: null })
	shippingCountry: string;

	@Column('text', { default: null })
	shippingZipcode: string;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('timestamp with time zone', { nullable: true, default: null })
	processedAt?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('timestamp with time zone', { nullable: true, default: null })
	shippedAt?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('timestamp with time zone', { nullable: true, default: null })
	fulfilledAt?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('timestamp with time zone', { nullable: true, default: null })
	cancelledAt?: Date;

	@BeforeUpdate()
	manageDates() {
		switch (this.status) {
			case OrderStatus.PROCESSING:
				this.processedAt = new Date();
				break;
			case OrderStatus.SHIPPED:
				this.shippedAt = new Date();
				break;
			case OrderStatus.FULLFILLED:
				this.fulfilledAt = new Date();
				break;
			case OrderStatus.CALCELLED:
				this.cancelledAt = new Date();
				break;
			default:
				break;
		}
	}
}
