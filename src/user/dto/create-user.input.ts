import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field()
	@IsString({ message: 'Input value must be a string' })
	@IsNotEmpty({ message: 'Input value cannot be empty' })
	username: string;

	@Field()
	@IsString({ message: 'Input value must be a string' })
	@IsNotEmpty({ message: 'Input value cannot be empty' })
	email: string;

	@Field()
	@IsString({ message: 'Input value must be a string' })
	@IsNotEmpty({ message: 'Input value cannot be empty' })
	phone: string;

	@Field()
	@IsString({ message: 'Input value must be a string' })
	@IsNotEmpty({ message: 'Input value cannot be empty' })
	password: string;
}
