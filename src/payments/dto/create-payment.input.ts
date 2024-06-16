import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentProvider, PaymentStatus, PaymentType } from 'src/_libs/types';

@InputType()
export class CreatePaymentInput {
	@Field()
	@IsNumber({ maxDecimalPlaces: 2 })
	@IsNotEmpty({ message: 'amount is required' })
	amount: number;

	@Field({ nullable: true })
	@IsEnum(PaymentType)
	@IsNotEmpty({ message: 'type is required' })
	type?: PaymentType;

	@Field({ nullable: true })
	@IsEnum(PaymentProvider)
	@IsNotEmpty({ message: 'provider is required' })
	provider?: PaymentProvider;

	@Field(() => PaymentStatus, { nullable: true })
	@IsEnum(PaymentStatus)
	@IsNotEmpty({ message: 'status is required' })
	status?: PaymentStatus;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	paymentIntentId?: string;
}
