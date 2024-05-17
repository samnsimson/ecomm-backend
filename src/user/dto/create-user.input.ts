import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	username: string;

	@Field()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsPhoneNumber('US')
	@IsNotEmpty()
	phone: string;

	@Field()
	@IsStrongPassword()
	@IsNotEmpty()
	password: string;
}
