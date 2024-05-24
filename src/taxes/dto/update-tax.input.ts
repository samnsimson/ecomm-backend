import { CreateTaxInput } from './create-tax.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaxInput extends PartialType(CreateTaxInput) {
  @Field(() => Int)
  id: number;
}
