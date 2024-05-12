import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';
import { Category } from 'src/categories/entities/category.entity';

@ObjectType()
@Entity({ name: 'product' })
export class Product {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column('text')
	description: string;

	@Field({ nullable: true })
	@Column('text', { default: '' })
	slug: string;

	@Field()
	@Column('float', { default: 0 })
	retailPrice: number;

	@Field()
	@Column('float', { default: 0 })
	salePrice: number;

	@Field(() => [Category], { nullable: true })
	@ManyToMany(() => Category, (category) => category.products)
	categories: Category[];

	@BeforeInsert()
	@BeforeUpdate()
	async generateSlug() {
		const slug = slugify(this.title, { lower: true, trim: true });
		this.slug = `${slug}-${uuid().split('-').join('')}`;
	}
}
