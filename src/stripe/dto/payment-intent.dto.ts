import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class PaymentIntentInput {
	@Field(() => String)
	@IsUUID()
	@IsNotEmpty()
	orderId: string;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	total: number;
}

@ObjectType()
export class PaymentIntentOutput {
	@Field(() => String)
	clientSecret: string;
}
