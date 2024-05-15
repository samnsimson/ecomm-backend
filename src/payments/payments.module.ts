import { Module, forwardRef } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { UserModule } from 'src/user/user.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
	imports: [TypeOrmModule.forFeature([Order, Payment, User, Product]), forwardRef(() => OrdersModule), forwardRef(() => UserModule), forwardRef(() => ProductsModule)],
	providers: [PaymentsResolver, PaymentsService],
	exports: [PaymentsService],
})
export class PaymentsModule {}
