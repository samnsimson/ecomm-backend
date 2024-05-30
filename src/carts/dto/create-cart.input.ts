import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class Item {
	@Field(() => String)
	@IsString()
	@IsUUID('4')
	id: string;

	@Field(() => Int)
	@IsNumber()
	quantity: number;

	@Field(() => Int)
	@IsNumber()
	price: number;
}

@InputType()
export class CreateCartInput {
	@Field(() => [Item])
	items: Array<Item>;
}
