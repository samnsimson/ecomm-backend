import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/_libs/types';

@ObjectType()
export class LoginResponse {
	@Field()
	username: string;

	@Field()
	id: string;

	@Field()
	role: UserRole;

	@Field()
	email: string;

	@Field()
	name: string;

	@Field(() => Boolean)
	authenticated: boolean;

	@Field()
	accessToken: string;

	@Field()
	refreshToken: string;
}
