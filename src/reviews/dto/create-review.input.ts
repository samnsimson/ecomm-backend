import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
	@Field()
	id: string;
}
