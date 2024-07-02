import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCartItemInput {
	@Field(() => String)
	@IsString()
	@IsUUID('4')
	cartId: string;

	@Field(() => String)
	@IsString()
	@IsUUID('4')
	productId: string;

	@Field(() => Int)
	@IsNumber()
	quantity: number;

	@Field(() => Int)
	@IsNumber()
	price: number;
}
