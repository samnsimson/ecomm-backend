import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class RemoveCartItemInput {
	@Field(() => String)
	@IsUUID()
	itemId: string;

	@Field(() => String)
	@IsUUID()
	cartId: string;
}
