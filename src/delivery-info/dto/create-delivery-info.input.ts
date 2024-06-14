import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class AddressComponent {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	addressOne: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	addressTwo?: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	city: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	state: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	country: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	zipcode: string;
}

@InputType()
export class BillingInfoInput extends AddressComponent {
	@Field(() => String)
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field(() => String)
	@IsString()
	@IsPhoneNumber('US')
	@IsNotEmpty()
	phone: string;
}

@InputType()
export class ShippingInfoInput extends AddressComponent {}

@InputType()
export class CreateDeliveryInfoInput {
	@Field(() => String)
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@Field(() => BillingInfoInput)
	billingAddress: BillingInfoInput;

	@Field(() => ShippingInfoInput)
	shippingAddress: ShippingInfoInput;
}
