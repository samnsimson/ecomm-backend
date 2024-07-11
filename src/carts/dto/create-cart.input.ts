import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

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
	@Field(() => String, { nullable: true })
	@IsUUID()
	@IsOptional()
	userId?: string;

	@Field(() => String, { nullable: true })
	@IsUUID()
	@IsOptional()
	guestId?: string;

	@Field(() => [Item])
	items: Item[];
}
