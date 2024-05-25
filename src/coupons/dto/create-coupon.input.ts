import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
