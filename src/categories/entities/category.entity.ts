import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'category' })
export class Category {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: number;

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
