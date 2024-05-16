import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'cart' })
export class Cart extends CoreEntity {
	@Field(() => [Product])
	@ManyToMany(() => Product, (product) => product.carts)
	@JoinTable({ name: 'products_in_carts' })
	products: Product[];

	@Field(() => User)
	@OneToOne(() => User, (user) => user.cart)
	user: User;
}
