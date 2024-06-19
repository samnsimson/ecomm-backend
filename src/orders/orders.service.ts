import { Injectable } from '@nestjs/common';
import { CreateOrderInput, OrderItemsInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EntityManager, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BillingInfoInput, ShippingInfoInput } from 'src/delivery-info/dto/create-delivery-info.input';
import { OrderItem } from './entities/order-items.entity';
import { CreatePaymentInput } from 'src/payments/dto/create-payment.input';
import { Payment } from 'src/payments/entities/payment.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Order) private readonly order: Repository<Order>,
	) {}

	private getBillingAddress = (billing: BillingInfoInput) => ({
		billingAddressOne: billing.addressOne,
		billingAddressTwo: billing.addressTwo,
		billingCity: billing.city,
		billingState: billing.state,
		billingCountry: billing.country,
		billingZipcode: billing.zipcode,
		billingEmail: billing.email,
		billingPhone: billing.phone,
	});

	private getShippingAddress = (shipping: ShippingInfoInput) => ({
		shippingAddressOne: shipping.addressOne,
		shippingAddressTwo: shipping.addressTwo,
		shippingCity: shipping.city,
		shippingState: shipping.state,
		shippingCountry: shipping.country,
		shippingZipcode: shipping.zipcode,
	});

	private async createOrderItems(em: EntityManager, orderId: string, items: OrderItemsInput[]) {
		const orderItems = items.map(({ id, ...item }) => em.create(OrderItem, { ...item, order: { id: orderId }, product: { id } }));
		return await em.save(OrderItem, orderItems);
	}

	private async createPayment(em: EntityManager, orderId: string, paymentInput: CreatePaymentInput) {
		const payment = em.create(Payment, { order: { id: orderId }, ...paymentInput });
		return await em.save(Payment, payment);
	}

	async create(createOrderInput: CreateOrderInput & { userId: string }) {
		return await this.entityManager.transaction(async (em) => {
			const { items, billingAddress, shippingAddress, userId, paymentProvider, paymentType, ...rest } = createOrderInput;
			const billing = this.getBillingAddress(billingAddress);
			const shipping = this.getShippingAddress(shippingAddress);
			const orderData = em.create(Order, { user: { id: userId }, ...billing, ...shipping, ...rest });
			const order = await em.save(Order, orderData);
			await this.createOrderItems(em, order.id, items);
			await this.createPayment(em, order.id, { amount: rest.total, type: paymentType, provider: paymentProvider });
			return await em.findOne(Order, { where: { id: order.id }, relations: { user: true }, order: { createdAt: 'DESC' } });
		});
	}

	async findAll(args: FindManyOptions<Order>) {
		return await this.order.find({ ...args, order: { createdAt: 'DESC' } });
	}

	async findOne(id: string, options?: FindOneOptions<Order>) {
		return await this.order.findOne({ where: { id }, ...options });
	}

	async update(id: string, updateOrderInput: UpdateOrderInput) {
		const order = this.order.create({ id, ...updateOrderInput });
		return await this.order.save(order);
	}

	remove(id: string) {
		return this.order.delete(id);
	}
}
