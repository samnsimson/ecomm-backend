import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Order, Payment, Product])],
	providers: [OrdersResolver, OrdersService, UserService, PaymentsService, ProductsService],
	exports: [OrdersService],
})
export class OrdersModule {}
