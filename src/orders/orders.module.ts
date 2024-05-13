import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Order])],
	providers: [OrdersResolver, OrdersService, UserService],
})
export class OrdersModule {}
