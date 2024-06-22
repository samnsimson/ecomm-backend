import { Injectable } from '@nestjs/common';
import { EmailTemplate, OrderConfirmationContext, OrderStatus, PaymentStatus } from 'src/_libs/types';
import { CartsService } from 'src/carts/carts.service';
import { EmailService } from 'src/email/email.service';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { DataSource, EntitySubscriberInterface, EventSubscriber, RemoveEvent, UpdateEvent } from 'typeorm';

@Injectable()
@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
	constructor(
		dataSource: DataSource,
		private readonly cartService: CartsService,
		private readonly emailService: EmailService,
		private readonly paymentService: PaymentsService,
	) {
		dataSource.subscribers.push(this);
	}

	listenTo = () => Order;

	async afterUpdate(event: UpdateEvent<Order>): Promise<void> {
		const entity = event.entity as Order;
		if (entity && entity.status === OrderStatus.CREATED) {
			const order = await event.manager.findOne(Order, { where: { id: entity.id }, relations: { user: true } });
			await this.cartService.clearUserCart({ user: { id: order.user.id } });
			this.emailService.sendEmail<OrderConfirmationContext>(this.composeOrderConfirmationEmail(order));
		}
	}

	async afterRemove(event: RemoveEvent<Order>): Promise<void> {
		const entity = event.entity as Order;
		await this.paymentService.remove({ order: { id: entity.id }, status: PaymentStatus.PENDING });
	}

	private composeOrderConfirmationEmail<T>(order: Order): T {
		const userData = { firstName: order.user.profile.firstName, lastName: order.user.profile.lastName };
		const orderItems = order.items.map((item) => ({ itemName: item.product.title, quantity: item.quantity, price: `$${item.price}` }));
		const addressComponent = { addressOne: order.shippingAddressOne, addressTwo: order.shippingAddressTwo };
		const locationComponet = { city: order.shippingCity, state: order.shippingState, country: order.shippingCountry, zipcode: order.shippingZipcode };
		const shippingAddress = { ...addressComponent, ...locationComponet };
		const contact = { email: order.billingEmail, phone: order.billingPhone };
		const context = { ...userData, orderItems, shippingAddress, orderTotal: `$${order.total}`, ...contact };
		const subject = 'Your order is placed';
		return { template: EmailTemplate.ORDER_CREATED, subject, mailto: order.billingEmail, context } as T;
	}
}
