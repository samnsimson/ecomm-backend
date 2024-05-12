import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
@InputType()
export class CreateProductInput {
	@Field()
	@MinLength(3)
	@IsString()
	title: string;

	@Field()
	@MinLength(3)
	@IsString()
	description: string;
}
