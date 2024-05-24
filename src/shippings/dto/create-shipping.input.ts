import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateShippingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
