import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ShippingsService {
	constructor(@InjectRepository(Shipping) private readonly shipping: Repository<Shipping>) {}

	async create(createShippingInput: CreateShippingInput) {
		const shipping = this.shipping.create(createShippingInput);
		return await this.shipping.save(shipping);
	}

	async findAll(args?: FindManyOptions<Shipping>) {
		return this.shipping.find({ ...args, order: { createdAt: 'ASC' } });
	}

	async findOne(id: string, args?: FindOneOptions<Shipping>) {
		const shipping = await this.shipping.findOne({ where: { id }, ...args });
		if (!shipping) throw new NotFoundException(`Shipping with id "${id}" not found`);
		return shipping;
	}

	async update(id: string, updateShippingInput: UpdateShippingInput) {
		const { affected } = await this.shipping.update(id, updateShippingInput);
		if (affected) return await this.findOne(id);
		else throw new NotFoundException(`Shipping with id "${id}" not found`);
	}

	async remove(id: string) {
		return await this.shipping.delete(id);
	}
}
