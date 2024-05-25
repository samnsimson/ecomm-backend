import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Discount {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
