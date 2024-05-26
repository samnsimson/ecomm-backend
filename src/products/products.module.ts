import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { UserModule } from 'src/user/user.module';
import { Shipping } from 'src/shippings/entities/shipping.entity';
import { ShippingsModule } from 'src/shippings/shippings.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Product, Category, Review, Order, Payment, User, Shipping]),
		forwardRef(() => CategoriesModule),
		forwardRef(() => ReviewsModule),
		forwardRef(() => OrdersModule),
		forwardRef(() => PaymentsModule),
		forwardRef(() => UserModule),
		forwardRef(() => ShippingsModule),
	],
	providers: [ProductsResolver, ProductsService],
	exports: [ProductsService],
})
export class ProductsModule {}
