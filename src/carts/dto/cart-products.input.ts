import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class ProductInfo {
	@Field(() => String)
	@IsString()
	@IsUUID()
	id: string;

	@Field(() => Int)
	@IsNumber()
	@Min(1)
	quantity: number;
}
