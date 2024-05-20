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

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
		DatabaseModule,
		PassportModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			context: ({ req, res }) => ({ req, res }),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			formatError: ({ locations, path, ...err }) => ({ transaction: uuid(), time: new Date(), ...err }),
			includeStacktraceInErrorResponses: false,
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
