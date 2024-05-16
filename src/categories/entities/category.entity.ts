import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'category' })
export class Category extends CoreEntity {
	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column('text')
	description: string;

	@Field(() => [Product], { nullable: true })
	@ManyToMany(() => Product, (product) => product.categories)
	@JoinTable({ name: 'category_products' })
	products: Product[];
}
