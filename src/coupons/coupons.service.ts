import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Brackets, DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CouponUsageType } from 'src/_libs/types';

@Injectable()
export class CouponsService {
	constructor(
		@InjectRepository(Coupon) private readonly coupon: Repository<Coupon>,
		private readonly dataSource: DataSource,
	) {}

	async create(createCouponInput: CreateCouponInput) {
		const coupon = this.coupon.create(createCouponInput);
		return await this.coupon.save(coupon);
	}

	async getValidCoupon(code: string, date: Date) {
		return await this.dataSource
			.getRepository(Coupon)
			.createQueryBuilder('coupon')
			.where('coupon.code = :code', { code })
			.andWhere('coupon.enabled = :enabled', { enabled: true })
			.andWhere('(coupon.validFrom <= :currentDate OR coupon.validFrom IS NULL)', { currentDate: date })
			.andWhere('(coupon.validThrough >= :currentDate OR coupon.validThrough IS NULL)', { currentDate: date })
			.andWhere('coupon.usageType = :multiUseType', { multiUseType: CouponUsageType.MULTI_USE })
			.orWhere(
				new Brackets((qb) => {
					qb.where('coupon.usageType = :singleUseType', { singleUseType: CouponUsageType.SINGLE_USE }).andWhere('coupon.lastUsedAt IS NULL');
				}),
			)
			.getOne();
	}

	async findAll(args?: FindManyOptions<Coupon>) {
		return await this.coupon.find({ ...args, order: { createdAt: 'DESC' } });
	}

	async findOne(args: FindOneOptions<Coupon>) {
		return await this.coupon.findOne({ ...args, order: { createdAt: 'DESC' } });
	}

	async update(id: string, updateCouponInput: UpdateCouponInput) {
		const coupon = this.coupon.create({ id, ...updateCouponInput });
		return await this.coupon.save(coupon);
	}

	async remove(id: string) {
		return await this.coupon.delete(id);
	}

	async applyCoupon(code: string, date: Date) {
		const coupon = await this.getValidCoupon(code, date);
		if (!coupon) throw new BadRequestException(`Coupon "${coupon}" is invalid or expired`);
		return await this.coupon.save(this.coupon.create({ id: coupon.id, lastUsedAt: date }));
	}
}
