import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, Min } from 'class-validator';
import { PaymentProvider, PaymentType } from 'src/_libs/types';
import { BillingInfoInput, ShippingInfoInput } from 'src/delivery-info/dto/create-delivery-info.input';

registerEnumType(PaymentType, { name: 'PaymentType' });

@InputType()
export class OrderItemsInput {
	@Field(() => String)
	@IsUUID()
	@IsNotEmpty()
	id: string;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	quantity: number;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	price: number;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	total: number;
}

@InputType()
export class CreateOrderInput {
	@Field(() => [OrderItemsInput])
	@IsArray()
	@IsNotEmpty()
	items: Array<OrderItemsInput>;

	@Field()
	@IsObject()
	@IsNotEmpty()
	billingAddress: BillingInfoInput;

	@Field()
	@IsObject()
	@IsNotEmpty()
	shippingAddress: ShippingInfoInput;

	@Field(() => PaymentType)
	@IsEnum(PaymentType)
	paymentType: PaymentType;

	@Field(() => PaymentProvider)
	@IsEnum(PaymentProvider)
	@IsNotEmpty()
	paymentProvider: PaymentProvider;

	@Field(() => Int)
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	total: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@IsNumber()
	@IsOptional()
	@Min(0)
	discountAmount?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@IsNumber()
	@IsOptional()
	@Min(0)
	couponAmount?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@IsNumber()
	@IsOptional()
	@Min(0)
	shippingAmount?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@IsNumber()
	@IsOptional()
	@Min(0)
	taxAmount?: number;
}
