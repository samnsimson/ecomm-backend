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
			entities: [User, Profile, Review],
			synchronize: true,
		}),
		UserModule,
		ProfileModule,
		ProductsModule,
		ReviewsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
