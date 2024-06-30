import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

@InputType()
export class ApplyCouponDto {
	@Field(() => String)
	@IsAlphanumeric()
	@IsNotEmpty()
	@Transform(({ value }) => value.toUpperCase())
	code: string;
}
