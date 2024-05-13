import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product, Category, Review])],
	providers: [ProductsResolver, ProductsService, CategoriesService, ReviewsService],
})
export class ProductsModule {}
