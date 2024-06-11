import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EntityManager, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { PaymentsService } from 'src/payments/payments.service';
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

	async create(createOrderInput: CreateOrderInput & { userId: string }) {
		console.log('🚀 ~ OrdersService ~ create ~ createOrderInput:', createOrderInput);
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
