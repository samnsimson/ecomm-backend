import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Order, Payment])],
	providers: [OrdersResolver, OrdersService, UserService, PaymentsService],
})
export class OrdersModule {}
