import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Entity({ name: 'order_item' })
export class OrderItem extends CoreEntity {
	@Field(() => Order)
	@ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
	order: Order;

	@Field(() => Product)
	@ManyToOne(() => Product, { eager: true })
	product: Product;

	@Field(() => Int)
	@Column()
	quantity: number;

	@Field(() => Int)
	@Column('int')
	price: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true })
	total: number;
}
