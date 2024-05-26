import { CreateShippingInput } from './create-shipping.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShippingInput extends PartialType(CreateShippingInput) {
	@Field(() => String)
	id: string;
}
