import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { DimensionsResponse } from './dto/product-response.dto';
import { Public } from 'src/_decorator';
import { BadRequestException } from '@nestjs/common';

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

	@Public()
	@Query(() => [Product], { name: 'products' })
	async findAll(@Args() args: FindManyArgs) {
		const products = await this.productsService.findAll({ ...args });
		return products;
	}

	@Public()
	@Query(() => Product, { name: 'product' })
	findOne(@Args('id', { type: () => String, nullable: true }) id?: string, @Args('slug', { type: () => String, nullable: true }) slug?: string) {
		if (!id && !slug) throw new BadRequestException('Either id or slug must be provided to query a product');
		return this.productsService.findOne(id, slug);
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
