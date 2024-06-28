import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product) private readonly product: Repository<Product>,
		private readonly dataSource: DataSource,
	) {}

	create(createProductInput: CreateProductInput) {
		const { dimensions, ...input } = createProductInput;
		const product = this.product.create({ ...input, ...dimensions });
		return this.product.save(product);
	}

	async findAll(args: FindManyOptions<Product>) {
		return await this.product.find({ ...args, order: { createdAt: 'DESC' } });
	}

	findOne(id?: string, slug?: string, options?: FindOneOptions<Product>) {
		return this.product.findOne({ where: [{ id }, { slug }], ...options });
	}

	async findRelatedProducts(id: string, brand: string, options?: FindManyOptions<Product>) {
		const take = options?.take ?? 4;
		return await this.dataSource
			.getRepository(Product)
			.createQueryBuilder('product')
			.where('product.brand = :brand', { brand })
			.andWhere('product.id != :id', { id })
			.take(take)
			.getMany();
	}

	async update(id: string, updateProductInput: UpdateProductInput) {
		const { dimensions, ...input } = updateProductInput;
		const { affected } = await this.product.update(id, { ...input, ...dimensions });
		if (!affected) throw new UnprocessableEntityException('Product update failed');
		return await this.findOne(id);
	}

	remove(id: string) {
		return this.product.delete(id);
	}
}
