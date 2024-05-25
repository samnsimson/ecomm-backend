import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Currency } from 'src/_libs/types';
import { Column, Entity } from 'typeorm';

registerEnumType(Currency, { name: 'Currency' });

@ObjectType()
@Entity({ name: 'settings' })
export class Setting extends CoreEntity {
	@Field(() => String)
	@Column('text')
	addressOne: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	addressTwo: string;

	@Field(() => String)
	@Column('text')
	city: string;

	@Field(() => String)
	@Column('text')
	state: string;

	@Field(() => String)
	@Column('text')
	country: string;

	@Field(() => String)
	@Column('text')
	zipcode: string;

	@Field(() => String)
	@Column('text')
	email: string;

	@Field(() => String)
	@Column()
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
