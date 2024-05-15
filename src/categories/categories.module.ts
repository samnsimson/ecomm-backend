import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product, Category])],
	providers: [CategoriesResolver, CategoriesService, ProductsService],
	exports: [CategoriesService],
})
export class CategoriesModule {}
