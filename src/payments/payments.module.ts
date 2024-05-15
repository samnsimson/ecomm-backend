import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { OrdersService } from 'src/orders/orders.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Module({
	imports: [TypeOrmModule.forFeature([Order, Payment, User, Product])],
	providers: [PaymentsResolver, PaymentsService, OrdersService, UserService, ProductsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
