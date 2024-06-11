import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderItem } from './entities/order-items.entity';
import { CartsModule } from 'src/carts/carts.module';
import { EmailModule } from 'src/email/email.module';
import { OrderSubscriber } from 'src/_subscribers/order.subscriber';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Order, Payment, Product, OrderItem]),
		forwardRef(() => UserModule),
		forwardRef(() => PaymentsModule),
		forwardRef(() => ProductsModule),
		forwardRef(() => CartsModule),
		forwardRef(() => EmailModule),
	],
	providers: [OrdersResolver, OrdersService, OrderSubscriber],
	exports: [OrdersService],
})
export class OrdersModule {}
