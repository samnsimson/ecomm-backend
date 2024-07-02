import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class CartInput {
	@Field(() => String, { nullable: true })
	@IsUUID()
	@IsOptional()
	cartId?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	@Transform(({ value }) => value && value.toUpperCase())
	couponCode?: string;

	@Field(() => [ProductInfo])
	products: ProductInfo[];
}

@InputType()
export class ProductInfo {
	@Field(() => String)
	@IsString()
	@IsUUID()
	id: string;

	@Field(() => Int)
	@IsNumber()
	@Min(1)
	quantity: number;
}
