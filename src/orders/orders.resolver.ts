import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { FindManyArgs } from 'src/libs/dto/base.args';

@Resolver(() => Order)
export class OrdersResolver {
	constructor(private readonly ordersService: OrdersService) {}

	@Mutation(() => Order)
	createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
		return this.ordersService.create(createOrderInput);
	}

	@Query(() => [Order], { name: 'orders' })
	findAll(@Args() args: FindManyArgs) {
		return this.ordersService.findAll({ ...args, relations: { payment: true } });
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
}
