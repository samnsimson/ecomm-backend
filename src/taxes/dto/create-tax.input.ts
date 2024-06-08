import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { TaxTypes } from 'src/_libs/types';

@InputType()
export class CreateTaxInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	title: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	description: string;

	@Field(() => TaxTypes, { nullable: true })
	@IsEnum(TaxTypes)
	@IsOptional()
	type?: TaxTypes;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@Min(0)
	@IsOptional()
	amount?: number;

	@Field(() => Int, { nullable: true })
	@IsInt()
	@Min(0)
	@IsOptional()
	percentage?: number;

	@Field(() => Boolean)
	@IsBoolean()
	@IsOptional()
	enabled: boolean;
}
