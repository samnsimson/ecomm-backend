import { CreateDeliveryInfoInput } from './create-delivery-info.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeliveryInfoInput extends PartialType(CreateDeliveryInfoInput) {
	@Field(() => String)
	id: string;
}
