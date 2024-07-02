import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateCartInput } from './create-cart.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
	@Field(() => String)
	@IsUUID()
	id: string;
}
