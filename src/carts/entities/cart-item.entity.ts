import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Entity({ name: 'cart_item' })
export class CartItem extends CoreEntity {
	@Field(() => Cart)
	@ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
	cart: Cart;

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

	@BeforeInsert()
	@BeforeUpdate()
	calculateTotal() {
		this.total = this.quantity * this.price;
	}
}
