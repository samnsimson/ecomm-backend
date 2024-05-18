import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EntityManager, FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { OrderStatus } from 'src/_libs/types';
import { UserService } from 'src/user/user.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Order) private readonly order: Repository<Order>,
		private readonly productService: ProductsService,
		private readonly paymentService: PaymentsService,
		private readonly userService: UserService,
	) {}

	async create({ total, userId, productIds, quantity }: CreateOrderInput & { userId: string }) {
		return await this.entityManager.transaction(async (entityManager) => {
			const user = await this.userService.findOne(userId, { relations: { profile: true } });
			const products = await this.productService.findAll({ where: { id: In(productIds) } });
			const { id } = await this.paymentService.create({ amount: total });
			const order = this.order.create({ total, quantity, status: OrderStatus.PLACED, user, products, payment: { id } });
			return await entityManager.save(Order, order);
		});
	}

	async findAll(args: FindManyOptions<Order>) {
		return await this.order.find({ ...args });
	}

	async findOne(id: string, options?: FindOneOptions<Order>) {
		return await this.order.findOne({ where: { id }, ...options });
	}

	async update(id: string, updateOrderInput: UpdateOrderInput) {
		return await this.order.update(id, updateOrderInput);
	}

	remove(id: string) {
		return this.order.delete(id);
	}
}
