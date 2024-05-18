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

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Order, Payment, Product]),
		forwardRef(() => UserModule),
		forwardRef(() => PaymentsModule),
		forwardRef(() => ProductsModule),
	],
	providers: [OrdersResolver, OrdersService],
	exports: [OrdersService],
})
export class OrdersModule {}
