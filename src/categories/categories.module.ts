import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
	imports: [TypeOrmModule.forFeature([Product, Category]), forwardRef(() => ProductsModule)],
	providers: [CategoriesResolver, CategoriesService],
	exports: [CategoriesService],
})
export class CategoriesModule {}
