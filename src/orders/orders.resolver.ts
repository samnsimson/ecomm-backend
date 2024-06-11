import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { CurrentUser } from 'src/_decorator';
import { CurrentUserType, UserRole } from 'src/_libs/types';
import { BillingInfoDto, ShippingInfoDto } from 'src/delivery-info/dto/delivery-return-type.dto';

@Resolver(() => Order)
export class OrdersResolver {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly paymentService: PaymentsService,
	) {}

	@Mutation(() => Order)
	createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput, @CurrentUser() user: CurrentUserType) {
		return this.ordersService.create({ ...createOrderInput, userId: user.id });
	}

	@Query(() => [Order], { name: 'orders' })
	findAll(@Args() args: FindManyArgs, @CurrentUser() user: CurrentUserType) {
		if (user.role === UserRole.ADMIN) return this.ordersService.findAll({ ...args, relations: { user: { profile: true }, payment: true } });
		return this.ordersService.findAll({ ...args, where: { user: { id: user.id } }, relations: { user: { profile: true }, payment: true } });
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

	@ResolveField(() => BillingInfoDto, { name: 'billingAddress' })
	async billingAddress(@Parent() order: Order) {
		return {
			addressOne: order.billingAddressOne,
			addressTwo: order.billingAddressTwo,
			city: order.billingCity,
			state: order.billingState,
			country: order.billingCountry,
			zipcode: order.billingZipcode,
			email: order.billingEmail,
			phone: order.billingPhone,
		};
	}

	@ResolveField(() => ShippingInfoDto, { name: 'shippingAddress' })
	async shippingAddress(@Parent() order: Order) {
		return {
			addressOne: order.shippingAddressOne,
			addressTwo: order.shippingAddressTwo,
			city: order.shippingCity,
			state: order.shippingState,
			country: order.shippingCountry,
			zipcode: order.shippingZipcode,
		};
	}
}
