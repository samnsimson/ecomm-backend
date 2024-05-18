import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {
	@Field(() => [String])
	@IsArray()
	@IsUUID('4', { each: true })
	productIds: Array<string>;

	@Field(() => Float)
	@IsNumber()
	@IsNotEmpty()
	@Min(0, { message: 'total cannot be a negative value' })
	total: number;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(1, { message: 'quantity cannot be 0 or a negative value' })
	quantity: number;
}
