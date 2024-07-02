import { Injectable } from '@nestjs/common';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountType } from 'src/_libs/types';

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

	async calculateDiscount(total: number) {
		const discounts = await this.findAll({ where: { enabled: true } });
		return Math.max(
			...discounts.map((discount) => {
				if (discount.type === DiscountType.FLAT) return discount.amount;
				if (discount.type === DiscountType.PERCENTAGE) return Math.round(total * (discount.percentage / 100));
				return 0;
			}),
		);
	}

	async remove(id: string) {
		return this.discount.delete(id);
	}
}
