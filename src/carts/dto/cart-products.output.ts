import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductOutput {
	@Field(() => String)
	id: string;

	@Field(() => String)
	title: string;

	@Field(() => String)
	slug: string;

	@Field(() => Int)
	quantity: number;

	@Field(() => Int)
	salePrice: number;

	@Field(() => Int)
	retailPrice: number;

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class CartTaxBreakup {
	@Field(() => String)
	name: string;

	@Field(() => Int)
	percentage: number;

	@Field(() => Int)
	total: number;
}

@ObjectType()
export class CartTaxes {
	@Field(() => Int)
	percentage: number;

	@Field(() => Int)
	total: number;

	@Field(() => [CartTaxBreakup])
	breakup: Array<CartTaxBreakup>;
}

@ObjectType()
export class CartProductOutput {
	@Field(() => Int)
	total: number;

	@Field(() => Int)
	subTotal: number;

	@Field(() => Boolean, { defaultValue: false })
	isDeductionsEligible: boolean;

	@Field(() => CartTaxes, { nullable: true })
	taxes: CartTaxes;

	@Field(() => [ProductOutput])
	products: Array<ProductOutput>;
}
