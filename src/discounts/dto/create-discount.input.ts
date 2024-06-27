import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { DiscountType } from 'src/_libs/types';

@InputType()
export class CreateDiscountInput {
	@Field(() => String)
	@IsString()
	title: string;

	@Field(() => String)
	@IsString()
	@IsOptional()
	description?: string;

	@Field(() => DiscountType)
	@IsEnum(DiscountType)
	type: DiscountType;

	@Field(() => Int)
	@IsOptional()
	@Min(0)
	amount?: number;

	@Field(() => Int)
	@IsOptional()
	@Min(0)
	percentage?: number;

	@Field(() => Date)
	@IsOptional()
	@IsDate()
	validFrom?: Date;

	@Field(() => Date)
	@IsOptional()
	@IsDate()
	validThrough?: Date;

	@Field(() => Boolean)
	@IsOptional()
	@IsBoolean()
	enabled?: boolean;
}
