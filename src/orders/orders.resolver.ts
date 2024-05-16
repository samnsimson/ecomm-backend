import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';

@Resolver(() => Order)
export class OrdersResolver {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly paymentService: PaymentsService,
	) {}

	@Mutation(() => Order)
	createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
		return this.ordersService.create(createOrderInput);
	}

	@Query(() => [Order], { name: 'orders' })
	findAll(@Args() args: FindManyArgs) {
		return this.ordersService.findAll({ ...args, relations: { user: { profile: true }, payment: true, products: true } });
	}

	@Query(() => Order, { name: 'order' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.ordersService.findOne(id, { relations: { payment: true } });
	}

	@Mutation(() => Order)
	updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
		return this.ordersService.update(updateOrderInput.id, updateOrderInput);
	}

	@Mutation(() => Order)
	removeOrder(@Args('id', { type: () => Int }) id: string) {
		return this.ordersService.remove(id);
	}

	@ResolveField(() => Payment, { name: 'payment' })
	async payment(@Parent() order: Order) {
		return await this.paymentService.findOne(order.payment.id);
	}
}
