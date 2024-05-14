import { ObjectType, Field, Float, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

enum OrderStatus {
	PLACED = 'placed',
	DELIVERED = 'delivered',
	CALCELLED = 'cancelled',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@ObjectType()
@Entity({ name: 'order' })
export class Order extends CoreEntity {
	@Field(() => User)
	@ManyToOne(() => User, (user) => user.orders)
	user: User;

	@Field(() => [Product])
	@ManyToMany(() => Product, (product) => product.orders)
	@JoinTable({ name: 'products_in_orders' })
	products: Product[];

	@Field(() => Float)
	@Column('float')
	total: number;

	@Field(() => Int)
	@Column('int')
	quantity: number;

	@Field(() => OrderStatus)
	@Column('enum', { enum: OrderStatus, default: OrderStatus.PLACED })
	status: OrderStatus;

	@Field(() => Payment)
	@OneToOne(() => Payment, (payment) => payment.order)
	@JoinColumn()
	payment: Payment;
}
