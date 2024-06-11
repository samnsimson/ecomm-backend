import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CartsModule } from './carts/carts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
import { v4 as uuid } from 'uuid';
import { ShippingsModule } from './shippings/shippings.module';
import { TaxesModule } from './taxes/taxes.module';
import { SettingsModule } from './settings/settings.module';
import { CouponsModule } from './coupons/coupons.module';
import { DiscountsModule } from './discounts/discounts.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DeliveryInfoModule } from './delivery-info/delivery-info.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}`, isGlobal: true }),
		CacheModule.register({ isGlobal: true, ttl: 1000 * 60 * 24 }),
		StripeModule.forRoot({ apiKey: process.env.STRIPE_API_KEY }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			context: ({ req, res }) => ({ req, res }),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			formatError: ({ locations, path, ...err }) => ({ transaction: uuid(), time: new Date(), ...err }),
			includeStacktraceInErrorResponses: false,
		}),
		DatabaseModule,
		PassportModule,
		UserModule,
		ProfileModule,
		ProductsModule,
		ReviewsModule,
		CategoriesModule,
		OrdersModule,
		PaymentsModule,
		CartsModule,
		AuthModule,
		ShippingsModule,
		TaxesModule,
		SettingsModule,
		CouponsModule,
		DiscountsModule,
		DeliveryInfoModule,
		StripeModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
