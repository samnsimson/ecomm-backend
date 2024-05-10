import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
	@Field()
	id: string;
}
