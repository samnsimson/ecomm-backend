import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
	IsAlphanumeric,
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinDate,
	MinLength,
} from 'class-validator';
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

	@Field(() => String)
	@IsString()
	@IsOptional()
	description?: string;

	@Field(() => CouponType)
	@IsOptional()
	@IsEnum(CouponType)
	type?: CouponType;

	@Field(() => CouponUsageType)
	@IsOptional()
	@IsEnum(CouponUsageType)
	usageType?: CouponUsageType;

	@Field(() => Date)
	@IsOptional()
	@IsDateString()
	@Type(() => Date)
	@MinDate(new Date())
	validFrom?: Date;

	@Field(() => Date)
	@IsOptional()
	@IsDateString()
	@Type(() => Date)
	@MinDate(new Date())
	validThrough?: Date;

	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	@Min(0)
	amount?: number;

	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	@Min(0)
	percentage?: number;

	@Field(() => Boolean)
	@IsOptional()
	@IsBoolean()
	enabled?: boolean;
}
