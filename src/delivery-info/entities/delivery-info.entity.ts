import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'delivery_info' })
export class DeliveryInfo extends CoreEntity {
	@Field(() => User)
	@OneToOne(() => User, (user) => user.deliveryInfo, { onDelete: 'CASCADE' })
	user: User;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingAddressOne?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingAddressTwo?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingCity?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingState?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingCountry?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingZipcode?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingEmail?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	billingPhone?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingAddressOne?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingAddressTwo?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingCity?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingState?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingCountry?: string;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true, default: null })
	shippingZipcode?: string;
}
