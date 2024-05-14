import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { OrdersService } from 'src/orders/orders.service';

@Module({
	imports: [TypeOrmModule.forFeature([Order, Payment])],
	providers: [PaymentsResolver, PaymentsService, OrdersService],
})
export class PaymentsModule {}
