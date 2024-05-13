import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/carts.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Review, Cart, Order])],
	providers: [UserResolver, UserService, ReviewsService, CartsService, OrdersService],
})
export class UserModule {}
