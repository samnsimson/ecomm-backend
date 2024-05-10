import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
	@Field()
	userId: string;

	@Field()
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@Field()
	addressOne: string;

	@Field({ nullable: true })
	addressTwo: string;

	@Field()
	city: string;

	@Field()
	state: string;

	@Field()
	country: string;

	@Field()
	zipcode: string;
}
