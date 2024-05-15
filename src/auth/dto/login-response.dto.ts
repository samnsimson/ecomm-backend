import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field(() => Boolean)
	authenticated: boolean;

	@Field()
	jwt: string;
}
