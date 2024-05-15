import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { Product } from './products/entities/product.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/entities/cart.entity';
import { Order } from './orders/entities/order.entity';
import { Payment } from './payments/entities/payment.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
		PassportModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			context: (ctx) => ctx,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [User, Profile, Review, Product, Category, Cart, Order, Payment],
			synchronize: process.env.NODE_ENV === 'dev',
		}),
		UserModule,
		ProfileModule,
		ProductsModule,
		ReviewsModule,
		CategoriesModule,
		OrdersModule,
		PaymentsModule,
		CartsModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
