import { Injectable } from '@nestjs/common';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountsService {
	constructor(@InjectRepository(Discount) private readonly discount: Repository<Discount>) {}

	create(createDiscountInput: CreateDiscountInput) {
		const discount = this.discount.create(createDiscountInput);
		return this.discount.save(discount);
	}

	findAll(args?: FindManyOptions<Discount>) {
		return this.discount.find({ ...args, order: { createdAt: 'DESC' } });
	}

	findOne(args: FindOneOptions<Discount>) {
		return this.discount.findOne({ ...args });
	}

	update(id: string, updateDiscountInput: UpdateDiscountInput) {
		const discount = this.discount.create({ id, ...updateDiscountInput });
		return this.discount.save(discount);
	}

	async remove(id: string) {
		return this.discount.delete(id);
	}
}
