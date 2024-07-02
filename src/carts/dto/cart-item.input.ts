import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CartItemInput {
	@Field(() => Int)
	@IsInt()
	@Min(0)
	quantity: number;

	@Field(() => Int)
	@IsInt()
	@Min(0)
	price: number;
}
