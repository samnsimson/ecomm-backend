import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Currency } from 'src/_libs/types';
import { Column, Entity } from 'typeorm';

registerEnumType(Currency, { name: 'Currency' });

@ObjectType()
@Entity({ name: 'settings' })
export class Setting extends CoreEntity {
	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	addressOne: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	addressTwo?: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	city: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	state: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	country: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	zipcode: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	email: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column({ nullable: true, default: null })
	phone: string;

	@Field(() => Currency, { defaultValue: Currency.USD })
	@Column('enum', { enum: Currency, default: Currency.USD })
	currency: Currency;

	@Field(() => Boolean, { defaultValue: false })
	@Column('boolean', { default: false })
	taxesEnabled: boolean;

	@Field(() => Boolean, { defaultValue: false })
	@Column('boolean', { default: false })
	shippingEnabled: boolean;

	@Field(() => Boolean, { defaultValue: false })
	@Column('boolean', { default: false })
	couponsEnabled: boolean;

	@Field(() => Boolean, { defaultValue: false })
	@Column('boolean', { default: false })
	discountsEnabled: boolean;
}
