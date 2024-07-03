import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartItem } from './cart-item.entity';

@ObjectType()
@Entity({ name: 'cart' })
export class Cart extends CoreEntity {
	@Field(() => User)
	@OneToOne(() => User, (user) => user.cart, { eager: true })
	@JoinColumn()
	user: User;

	@Field(() => Int)
	@Column('int', { nullable: true, default: 0 })
	subTotal: number;

	@Field(() => String, { nullable: true })
	@Column('character varying', { nullable: true, default: null })
	coupon?: string;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	couponAmount?: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	discountAmount?: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	shippingAmount?: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	taxAmount?: number;

	@Field(() => Int)
	@Column('int', { nullable: true, default: 0 })
	total: number;

	@Field(() => [CartItem])
	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true, eager: true })
	items: CartItem[];
}
