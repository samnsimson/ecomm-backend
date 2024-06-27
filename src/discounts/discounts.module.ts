import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsResolver } from './discounts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Discount])],
	providers: [DiscountsResolver, DiscountsService],
	exports: [DiscountsService],
})
export class DiscountsModule {}
