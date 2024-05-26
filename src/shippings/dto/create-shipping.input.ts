import { InputType, Field } from '@nestjs/graphql';
import { ShippingTypes } from 'src/_libs/types';

@InputType()
export class CreateShippingInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => Boolean, { defaultValue: false })
	enabled: boolean;

	@Field(() => ShippingTypes)
	type: ShippingTypes;

	@Field({ nullable: true })
	amount?: number;

	@Field({ nullable: true })
	percentage?: number;
}
