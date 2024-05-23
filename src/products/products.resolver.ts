import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Response } from 'express';
import { DimensionsResponse } from './dto/product-response.dto';

@Resolver(() => Product)
export class ProductsResolver {
	constructor(
		private readonly productsService: ProductsService,
		private readonly reviewService: ReviewsService,
	) {}

	@Mutation(() => Product)
	createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
		return this.productsService.create(createProductInput);
	}

	@Query(() => [Product], { name: 'products' })
	async findAll(@Args() args: FindManyArgs, @Context('res') res: Response) {
		res.cookie('sample-cookie', 'this is a sample cookie', { httpOnly: true, maxAge: 3600000 });
		const products = await this.productsService.findAll({ ...args });
		return products;
	}

	@Query(() => Product, { name: 'product' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.productsService.findOne(id);
	}

	@Mutation(() => Product)
	updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
		return this.productsService.update(updateProductInput.id, updateProductInput);
	}

	@Mutation(() => Product)
	removeProduct(@Args('id', { type: () => String }) id: string) {
		return this.productsService.remove(id);
	}

	@ResolveField(() => Review, { name: 'reviews' })
	async reviews(@Parent() product: Product, @Args() args: FindManyArgs) {
		return await this.reviewService.findAll({ ...args, where: { product: { id: product.id } } });
	}

	@ResolveField(() => DimensionsResponse, { name: 'dimensions' })
	async dimensions(@Parent() product: Product) {
		const { width, height, depth } = product;
		return { width, height, depth };
	}
}
