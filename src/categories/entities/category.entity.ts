import { ObjectType, Field } from '@nestjs/graphql';
import slugify from 'slugify';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Entity({ name: 'category' })
export class Category extends CoreEntity {
	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column('text')
	description: string;

	@Field({ nullable: true })
	@Column('text', { default: '' })
	slug: string;

	@Field(() => [Product], { nullable: true })
	@ManyToMany(() => Product, (product) => product.categories, { onDelete: 'CASCADE' })
	@JoinTable({ name: 'categories_products' })
	products: Product[];

	@BeforeInsert()
	generateSlug() {
		const slug = slugify(this.title, { lower: true, trim: true, remove: /[*+~.()'"!:@]/g });
		this.slug = `${slug}-${uuid().split('-').join('')}`;
	}
}
