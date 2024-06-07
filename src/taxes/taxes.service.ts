import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxInput } from './dto/create-tax.input';
import { UpdateTaxInput } from './dto/update-tax.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TaxesService {
	constructor(@InjectRepository(Tax) private readonly tax: Repository<Tax>) {}

	create(createTaxInput: CreateTaxInput) {
		const tax = this.tax.create(createTaxInput);
		return this.tax.save(tax);
	}

	findAll(args?: FindManyOptions<Tax>) {
		return this.tax.find(args);
	}

	findOne(args: FindOneOptions<Tax>) {
		return this.tax.findOne(args);
	}

	async update(id: string, updateTaxInput: UpdateTaxInput) {
		const { affected } = await this.tax.update(id, updateTaxInput);
		if (!affected) throw new NotFoundException(`Requested id not found to update`);
		return await this.findOne({ where: { id } });
	}

	remove(id: string) {
		return this.tax.delete(id);
	}
}
