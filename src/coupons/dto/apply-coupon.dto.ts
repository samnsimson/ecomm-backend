import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ApplyCouponDto {
	@Field(() => String)
	@IsUUID()
	@IsNotEmpty()
	orderId: string;

	@Field(() => String)
	@IsAlphanumeric()
	@IsNotEmpty()
	@Transform(({ value }) => value.toUpperCase())
	code: string;
}
