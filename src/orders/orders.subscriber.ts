import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from 'src/_libs/types';
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
			this.emailService.sendEmail(OrderStatus.CREATED);
		}
	}

	async afterRemove(event: RemoveEvent<Order>): Promise<void> {
		const entity = event.entity as Order;
		await this.paymentService.remove({ order: { id: entity.id }, status: PaymentStatus.PENDING });
	}
}
