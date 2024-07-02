import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCartInput } from './create-cart.input';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
	@Field(() => String)
	id: string;
}
