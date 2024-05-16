import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
	@Field()
	username: string;

	@Field()
	id: string;

	@Field(() => Boolean)
	authenticated: boolean;

	@Field()
	accessToken: string;

	@Field()
	refreshToken: string;
}
