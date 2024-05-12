import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FindManyArgs } from 'src/libs/dto/base.args';

@Resolver(() => Product)
export class ProductsResolver {
	constructor(private readonly productsService: ProductsService) {}

	@Mutation(() => Product)
	createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
		return this.productsService.create(createProductInput);
	}

	@Query(() => [Product], { name: 'products' })
	findAll(@Args() args: FindManyArgs) {
		return this.productsService.findAll(args);
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
}
