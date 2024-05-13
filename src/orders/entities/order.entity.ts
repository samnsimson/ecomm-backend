import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

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
}
