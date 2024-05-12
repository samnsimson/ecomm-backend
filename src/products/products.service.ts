import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FindByArgs } from 'src/libs/types';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private readonly product: Repository<Product>) {}

	create(createProductInput: CreateProductInput) {
		const product = this.product.create(createProductInput);
		return this.product.save(product);
	}

	async findAll(args: FindManyOptions<Product>) {
		return await this.product.find(args);
	}

	findOne(id: string) {
		return `This action returns a #${id} product`;
	}

	update(id: string, updateProductInput: UpdateProductInput) {
		return `This action updates a #${id} product`;
	}

	remove(id: string) {
		return `This action removes a #${id} product`;
	}
}
