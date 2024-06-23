import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsResolver } from './coupons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Coupon])],
	providers: [CouponsResolver, CouponsService],
	exports: [CouponsService],
})
export class CouponsModule {}
