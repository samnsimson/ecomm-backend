import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinDate, MinLength } from 'class-validator';
import { CouponType, CouponUsageType } from 'src/_libs/types';

@InputType()
export class CreateCouponInput {
	@Field(() => String)
	@MinLength(3)
	@MaxLength(7)
	@IsAlphanumeric()
	@Transform(({ value }) => value.toUpperCase())
	code: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	title: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	description?: string;

	@Field(() => CouponType, { nullable: true })
	@IsOptional()
	@IsEnum(CouponType)
	type?: CouponType;

	@Field(() => CouponUsageType, { nullable: true })
	@IsOptional()
	@IsEnum(CouponUsageType)
	usageType?: CouponUsageType;

	@Field(() => Date, { nullable: true })
	@IsOptional()
	@IsDate()
	@MinDate(new Date())
	validFrom?: Date;

	@Field(() => Date, { nullable: true })
	@IsOptional()
	@IsDate()
	@MinDate(new Date())
	validThrough?: Date;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	@Min(0)
	amount?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsNumber()
	@Min(0)
	percentage?: number;

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	@IsBoolean()
	enabled?: boolean;
}
