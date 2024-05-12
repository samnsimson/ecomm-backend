import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category) private readonly category: Repository<Category>,
		@InjectRepository(Product) private readonly product: Repository<Product>,
	) {}

	async create(data: CreateCategoryInput) {
		data.products = await Promise.all(data?.products?.map(({ id }) => this.product.findOneBy({ id })));
		return await this.category.save(data);
	}

	async findAll(args: FindManyOptions<Category>) {
		return await this.category.find(args);
	}

	findOne(id: string) {
		return `This action returns a #${id} category`;
	}

	update(id: string, updateCategoryInput: UpdateCategoryInput) {
		return `This action updates a #${id} category`;
	}

	remove(id: string) {
		return `This action removes a #${id} category`;
	}
}
