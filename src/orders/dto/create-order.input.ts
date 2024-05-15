import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {
	@Field(() => String)
	@IsUUID('4')
	@IsNotEmpty({ message: 'userId is required' })
	userId: string;

	@Field(() => [String])
	@IsArray()
	@IsUUID('4', { each: true })
	productIds: Array<string>;

	@Field(() => Float)
	@IsNumber()
	@Min(0, { message: 'total cannot be a negative value' })
	total: number;

	@Field(() => Int)
	@IsNumber()
	@Min(1, { message: 'quantity cannot be 0 or a negative value' })
	quantity: number;
}
