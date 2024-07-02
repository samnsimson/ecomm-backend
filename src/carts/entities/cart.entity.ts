import { ObjectType, Field } from '@nestjs/graphql';
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

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	couponCode: string;

	@Field(() => [CartItem])
	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true, eager: true })
	items: CartItem[];
}
