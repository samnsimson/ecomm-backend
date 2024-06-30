import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class CartInput {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	code?: string;

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
