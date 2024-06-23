import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { CouponType, CouponUsageType } from 'src/_libs/types';
import { Column, Entity, Index, Unique } from 'typeorm';

registerEnumType(CouponUsageType, { name: 'CouponUsageType' });
registerEnumType(CouponType, { name: 'CouponType' });

@ObjectType()
@Entity({ name: 'coupon' })
@Unique(['code'])
@Index(['code'])
export class Coupon extends CoreEntity {
	@Field(() => String)
	@Column()
	code: string;

	@Field(() => String)
	@Column('text')
	title: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	description?: string;

	@Field(() => CouponType, { nullable: true, defaultValue: CouponType.FLAT })
	@Column('enum', { enum: CouponType, default: CouponType.FLAT })
	type?: CouponType;

	@Field(() => CouponUsageType, { nullable: true, defaultValue: CouponUsageType.MULTI_USE })
	@Column('enum', { enum: CouponUsageType, default: CouponUsageType.MULTI_USE })
	usageType?: CouponUsageType;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('time with time zone', { nullable: true, default: null })
	lastUsedAt?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('time with time zone', { nullable: true, default: null })
	validFrom?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('time with time zone', { nullable: true, default: null })
	validThrough?: Date;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	amount?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { nullable: true, default: 0 })
	percentage?: number;

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	@Column('boolean', { nullable: true, default: false })
	enabled?: boolean;
}
