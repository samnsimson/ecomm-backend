import { ObjectType, Field } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';
import { Category } from 'src/categories/entities/category.entity';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';

@ObjectType()
@Entity({ name: 'product' })
export class Product extends CoreEntity {
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

	@Field(() => [Review], { nullable: true })
	@OneToMany(() => Review, (review) => review.product)
	reviews: Review[];

	@Field(() => [Cart], { nullable: true })
	@ManyToMany(() => Cart, (cart) => cart.products)
	carts: Cart[];

	@Field(() => [Order], { nullable: true })
	@ManyToMany(() => Order, (order) => order.products)
	orders: Order[];

	@BeforeInsert()
	@BeforeUpdate()
	async generateSlug() {
		const slug = slugify(this.title, { lower: true, trim: true });
		this.slug = `${slug}-${uuid().split('-').join('')}`;
	}
}
