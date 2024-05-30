import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ProductOutput {
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
export class CartProductOutput {
	@Field(() => Int)
	total: number;

	@Field(() => [ProductOutput])
	products: Array<ProductOutput>;
}
