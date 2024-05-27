import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, Min, MinLength } from 'class-validator';

@InputType()
export class Dimensions {
	@Field(() => Int, { nullable: true })
	@Min(1)
	@IsNumber()
	width?: number;

	@Field(() => Int, { nullable: true })
	@Min(1)
	@IsNumber()
	height?: number;

	@Field(() => Int, { nullable: true })
	@Min(1)
	@IsNumber()
	depth?: number;
}

@InputType()
export class ShippingMethod {
	@Field(() => String)
	@IsString()
	@IsUUID('4')
	id: string;
}

@InputType()
export class CategoriesInput {
	@Field(() => String)
	@IsString()
	@IsUUID('4')
	id: string;
}

@InputType()
export class CreateProductInput {
	@Field()
	@MinLength(3)
	@IsString()
	title: string;

	@Field()
	@MinLength(3)
	@IsString()
	description: string;

	@Field(() => Int)
	@Min(0)
	retailPrice: number;

	@Field(() => Int)
	@Min(0)
	salePrice: number;

	@Field(() => String)
	@IsString()
	brand: string;

	@Field(() => Dimensions, { nullable: true })
	dimensions?: Dimensions;

	@Field(() => ShippingMethod, { nullable: true })
	shipping?: ShippingMethod;

	@Field(() => [CategoriesInput], { nullable: true })
	categories?: Array<CategoriesInput>;
}
