import { InputType, Field } from '@nestjs/graphql';

@InputType()
class ProductIds {
	@Field()
	id: string;
}

@InputType()
export class CreateCategoryInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field(() => [ProductIds], { nullable: true })
	products: ProductIds[];
}
