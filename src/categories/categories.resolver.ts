import { Resolver, Query, Mutation, Args, Int, ResolveProperty, Parent } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { FindManyArgs } from 'src/libs/dto/base.args';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => Category)
export class CategoriesResolver {
	constructor(
		private readonly categoriesService: CategoriesService,
		private readonly productService: ProductsService,
	) {}

	@Mutation(() => Category)
	createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
		return this.categoriesService.create(createCategoryInput);
	}

	@Query(() => [Category], { name: 'categories' })
	async findAll(@Args() args: FindManyArgs) {
		return await this.categoriesService.findAll(args);
	}

	@Query(() => Category, { name: 'category' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.categoriesService.findOne(id);
	}

	@Mutation(() => Category)
	updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
		return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
	}

	@Mutation(() => Category)
	removeCategory(@Args('id', { type: () => Int }) id: string) {
		return this.categoriesService.remove(id);
	}

	@ResolveProperty(() => Product, { name: 'products' })
	async products(@Parent() category: Category, @Args() args: FindManyArgs) {
		return await this.productService.findAll({ ...args, where: { categories: { id: category.id } } });
	}
}
