import { CreateTaxInput } from './create-tax.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaxInput extends PartialType(CreateTaxInput) {
	@Field(() => String)
	id: string;
}
