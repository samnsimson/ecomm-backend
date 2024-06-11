import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/_libs/types';
import { CartsService } from 'src/carts/carts.service';
import { EmailService } from 'src/email/email.service';
import { Order } from 'src/orders/entities/order.entity';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

@Injectable()
@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
	constructor(
		dataSource: DataSource,
		private readonly cartService: CartsService,
		private readonly emailService: EmailService,
	) {
		dataSource.subscribers.push(this);
	}

	listenTo = () => Order;

	async afterInsert(event: InsertEvent<Order>): Promise<void> {
		const entity = event.entity as Order;
		if (entity && entity.status === OrderStatus.CREATED) {
			const userId = entity.user.id;
			await this.cartService.clearUserCart(userId);
			this.emailService.sendEmail();
		}
	}
}
