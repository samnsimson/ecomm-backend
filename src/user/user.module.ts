import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { CartsModule } from 'src/carts/carts.module';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Review, Cart, Order, Payment, Product]),
		forwardRef(() => ReviewsModule),
		forwardRef(() => CartsModule),
		forwardRef(() => OrdersModule),
		forwardRef(() => PaymentsModule),
		forwardRef(() => ProductsModule),
	],
	providers: [UserResolver, UserService],
	exports: [UserService],
})
export class UserModule {}
