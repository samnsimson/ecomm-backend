import { CartInput } from './cart-products.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput extends PartialType(CartInput) {
	@Field(() => String)
	id: string;
}
