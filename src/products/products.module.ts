import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product, Category])],
	providers: [ProductsResolver, ProductsService, CategoriesService],
})
export class ProductsModule {}
