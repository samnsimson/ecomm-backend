import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'review' })
export class Review extends CoreEntity {
	@Field()
	@Column('text')
	review: string;

	@Field()
	@Column('int')
	rating: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.reviews)
	user: User;

	@Field(() => Product)
	@ManyToOne(() => Product, (product) => product.reviews)
	product: Product;
}
