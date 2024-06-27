import { CreateDiscountInput } from './create-discount.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiscountInput extends PartialType(CreateDiscountInput) {
	@Field(() => String)
	id: string;
}
