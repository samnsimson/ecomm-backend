import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CartItemInput } from './cart-item.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateCartItemInput extends PartialType(CartItemInput) {
	@Field(() => String)
	@IsUUID()
	itemId: string;

	@Field(() => String)
	@IsUUID()
	cartId: string;
}
