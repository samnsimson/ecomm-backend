import { CreateCouponInput } from './create-coupon.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
	@Field(() => String)
	id: string;
}
