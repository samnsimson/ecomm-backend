import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
	constructor(@InjectRepository(Payment) private readonly payment: Repository<Payment>) {}

	async create(createPaymentInput: CreatePaymentInput) {
		const payment = this.payment.create(createPaymentInput);
		return await this.payment.save(payment);
	}

	async findAll(args: FindManyOptions<Payment>) {
		return await this.payment.find({ ...args, relations: { order: true } });
	}

	async findOne(id: string, options?: FindOneOptions<Payment>) {
		return await this.payment.findOne({ where: { id }, ...options });
	}

	async update(id: string, updatePaymentInput: UpdatePaymentInput) {
		return this.payment.update(id, updatePaymentInput);
	}

	async remove(id: string) {
		return await this.payment.delete(id);
	}
}
