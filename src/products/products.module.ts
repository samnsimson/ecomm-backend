import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product, Category, Review, Order, Payment, User])],
	providers: [ProductsResolver, ProductsService, CategoriesService, ReviewsService, OrdersService, PaymentsService, UserService],
	exports: [ProductsService],
})
export class ProductsModule {}
