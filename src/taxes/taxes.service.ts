import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxInput } from './dto/create-tax.input';
import { UpdateTaxInput } from './dto/update-tax.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { getCacheKey } from 'src/_libs/utils/cache-key';
import { TaxTypes } from 'src/_libs/types';

@Injectable()
export class TaxesService {
	private readonly cacheKey: string = 'taxes';

	constructor(
		@InjectRepository(Tax) private readonly tax: Repository<Tax>,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	create(createTaxInput: CreateTaxInput) {
		const tax = this.tax.create(createTaxInput);
		this.cacheManager.reset();
		return this.tax.save(tax);
	}

	async findAll(args?: FindManyOptions<Tax>) {
		const cacheKey = getCacheKey(this.cacheKey, args);
		const cached = await this.cacheManager.get<Array<Tax>>(cacheKey);
		if (cached) return cached;
		const taxes = await this.tax.find(args);
		await this.cacheManager.set(cacheKey, taxes);
		return taxes;
	}

	async findOne(args: FindOneOptions<Tax>) {
		const cacheKey = getCacheKey(this.cacheKey, args);
		const cached = await this.cacheManager.get<Tax>(cacheKey);
		if (cached) return cached;
		const tax = this.tax.findOne(args);
		await this.cacheManager.set(cacheKey, tax);
		return tax;
	}

	async update(id: string, updateTaxInput: UpdateTaxInput) {
		const { affected } = await this.tax.update(id, updateTaxInput);
		if (!affected) throw new NotFoundException(`Requested id not found to update`);
		await this.cacheManager.reset();
		return await this.findOne({ where: { id } });
	}

	async remove(id: string) {
		await this.cacheManager.reset();
		return await this.tax.delete(id);
	}

	async taxBreakup(cartTotal: number) {
		const taxes = await this.findAll({ where: { enabled: true } });
		if (!taxes.length) return null;
		return taxes.map(({ title, description, amount, percentage, type }) => {
			let total = 0;
			const isFlat = type === TaxTypes.FLAT;
			const isPercent = type === TaxTypes.PERCENTAGE;
			if (isFlat) total = amount;
			if (isPercent) total = Math.round(cartTotal * (percentage / 100));
			const base = { title, description, type, total };
			return { ...base, amount: isFlat ? amount : null, percentage: isPercent ? percentage : null };
		});
	}
}
