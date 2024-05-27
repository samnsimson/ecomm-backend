import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category) private readonly category: Repository<Category>,
		@InjectRepository(Product) private readonly product: Repository<Product>,
	) {}

	async create({ products, ...data }: CreateCategoryInput) {
		const category = this.category.create({ ...data, products });
		return await this.category.save(category);
	}

	async findAll(args: FindManyOptions<Category>) {
		return await this.category.find({ ...args, order: { createdAt: 'DESC' } });
	}

	async findOne(id: string, args?: FindOneOptions<Category>) {
		return await this.category.findOne({ where: { id }, ...args });
	}

	async update(id: string, updateCategoryInput: UpdateCategoryInput) {
		const { affected } = await this.category.update(id, updateCategoryInput);
		if (!affected) throw new NotFoundException(`Category with id ${id} not found`);
		return await this.findOne(id);
	}

	remove(id: string) {
		return `This action removes a #${id} category`;
	}
}
