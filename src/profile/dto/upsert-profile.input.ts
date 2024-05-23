import { Field, InputType } from '@nestjs/graphql';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class UpsertProfileInput extends CreateProfileInput {
	@Field(() => String, { nullable: true })
	id?: string;
}
