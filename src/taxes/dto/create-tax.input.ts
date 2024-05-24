import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaxInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
