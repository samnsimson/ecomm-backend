import { IsString } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
	@Field(() => ID)
	@IsString()
	id: string;
}
