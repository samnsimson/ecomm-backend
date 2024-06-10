import { Module, forwardRef } from '@nestjs/common';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfoResolver } from './delivery-info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryInfo } from './entities/delivery-info.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([DeliveryInfo]), forwardRef(() => User)],
	providers: [DeliveryInfoResolver, DeliveryInfoService],
	exports: [DeliveryInfoService],
})
export class DeliveryInfoModule {}
