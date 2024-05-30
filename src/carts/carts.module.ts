import { Module, forwardRef } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { UserModule } from 'src/user/user.module';
import { CartItem } from './entities/cart-item.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
	imports: [TypeOrmModule.forFeature([User, Cart, CartItem]), forwardRef(() => UserModule), forwardRef(() => ProductsModule)],
	providers: [CartsResolver, CartsService],
	exports: [CartsService],
})
export class CartsModule {}
