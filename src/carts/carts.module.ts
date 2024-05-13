import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Cart])],
	providers: [CartsResolver, CartsService, UserService],
})
export class CartsModule {}
