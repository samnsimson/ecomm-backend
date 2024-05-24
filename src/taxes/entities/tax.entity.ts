import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tax {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
