import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/profile.model';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'root',
			password: 'root',
			database: 'ecommerce-project',
			entities: [User, Profile],
			synchronize: true,
		}),
		UserModule,
		ProfileModule,
		ProductModule,
		CategoryModule,
		ImageModule,
		OrderModule,
		ReviewModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
