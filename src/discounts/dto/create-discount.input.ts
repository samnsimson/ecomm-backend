import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { DiscountType } from 'src/_libs/types';

@InputType()
export class CreateDiscountInput {
	@Field(() => String)
	@IsString()
	title: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	description?: string;

	@Field(() => DiscountType)
	@IsEnum(DiscountType)
	type: DiscountType;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@Min(0)
	amount?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@Min(0)
	percentage?: number;

	@Field(() => Date, { nullable: true })
	@IsOptional()
	@IsDate()
	validFrom?: Date;

	@Field(() => Date, { nullable: true })
	@IsOptional()
	@IsDate()
	validThrough?: Date;

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	@IsBoolean()
	enabled?: boolean;
}
