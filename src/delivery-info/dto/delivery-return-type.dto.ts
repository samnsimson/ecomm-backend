import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { DeliveryInfo } from '../entities/delivery-info.entity';

@ObjectType()
export class AddressComponentDto {
	@Field(() => String)
	addressOne: string;

	@Field(() => String)
	addressTwo: string;

	@Field(() => String)
	city: string;

	@Field(() => String)
	state: string;

	@Field(() => String)
	country: string;

	@Field(() => String)
	zipcode: string;
}

@ObjectType()
export class BillingInfoDto extends AddressComponentDto {
	@Field(() => String)
	email: string;

	@Field(() => String)
	phone: string;
}

@ObjectType()
export class ShippingInfoDto extends AddressComponentDto {}

@ObjectType()
export class DeliveryInfoDto extends PickType(DeliveryInfo, ['id', 'user', 'createdAt', 'updatedAt']) {
	@Field(() => BillingInfoDto, { nullable: true })
	billingAddress: BillingInfoDto;

	@Field(() => BillingInfoDto, { nullable: true })
	shippingAddress: BillingInfoDto;
}
