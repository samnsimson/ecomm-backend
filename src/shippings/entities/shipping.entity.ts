import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { ShippingTypes } from 'src/_libs/types';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

registerEnumType(ShippingTypes, { name: 'ShippingType' });

@ObjectType()
@Entity({ name: 'shipping' })
export class Shipping extends CoreEntity {
	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	description: string;

	@Field(() => Boolean)
	@Column('boolean', { default: true })
	enabled: boolean;

	@Field(() => ShippingTypes, { defaultValue: ShippingTypes.FREE })
	@Column('enum', { enum: ShippingTypes, default: ShippingTypes.FREE })
	type: ShippingTypes;

	@Field(() => Int, { defaultValue: 0 })
	@Column('int', { default: 0 })
	amount: number;

	@Field(() => Int, { defaultValue: 0 })
	@Column('int', { default: 0 })
	percentage: number;

	@Field(() => [Product], { nullable: true })
	@OneToMany(() => Product, (product) => product.shipping)
	products: Product[];
}
