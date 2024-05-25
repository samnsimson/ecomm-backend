import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Currency } from 'src/_libs/types';

@InputType()
export class SettingsInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	id?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	addressOne?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	addressTwo?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	city?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	state?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	country?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	zipcode?: string;

	@Field({ nullable: true })
	@IsEmail()
	@IsOptional()
	email?: string;

	@Field({ nullable: true })
	@IsPhoneNumber('US')
	@IsOptional()
	phone?: string;

	@Field({ nullable: true })
	@IsEnum(Currency)
	@IsOptional()
	currency?: Currency;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	taxesEnabled?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	couponsEnabled?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	shippingEnabled?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	discountsEnabled?: boolean;
}
