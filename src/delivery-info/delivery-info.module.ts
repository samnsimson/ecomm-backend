import { Module, forwardRef } from '@nestjs/common';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfoResolver } from './delivery-info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryInfo } from './entities/delivery-info.entity';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([DeliveryInfo]), forwardRef(() => UserModule)],
	providers: [DeliveryInfoResolver, DeliveryInfoService],
	exports: [DeliveryInfoService],
})
export class DeliveryInfoModule {}
