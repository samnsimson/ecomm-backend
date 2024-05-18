import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class SignupResponse extends User {
	@Field({ nullable: true, defaultValue: false })
	authenticated?: boolean;

	@Field({ nullable: true, defaultValue: null })
	accessToken?: string;

	@Field({ nullable: true, defaultValue: null })
	refreshToken?: string;
}
