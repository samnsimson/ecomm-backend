import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesResolver } from './taxes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Tax])],
	providers: [TaxesResolver, TaxesService],
})
export class TaxesModule {}
