import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FindByCategoryInput {
	@Field(() => String)
	@IsUUID('4')
	categoryId: string;
}
