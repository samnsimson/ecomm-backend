import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private readonly product: Repository<Product>) {}

	create(createProductInput: CreateProductInput) {
		const { dimensions, ...input } = createProductInput;
		const product = this.product.create({ ...input, ...dimensions });
		return this.product.save(product);
	}

	async findAll(args: FindManyOptions<Product>) {
		return await this.product.find({ ...args, order: { createdAt: 'DESC' } });
	}

	findOne(id: string, options?: FindOneOptions<Product>) {
		return this.product.findOne({ where: { id }, ...options });
	}

	update(id: string, updateProductInput: UpdateProductInput) {
		return this.product.update(id, updateProductInput);
	}

	remove(id: string) {
		return this.product.delete(id);
	}
}
