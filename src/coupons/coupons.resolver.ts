import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Resolver(() => Coupon)
export class CouponsResolver {
	constructor(
		private readonly couponsService: CouponsService,
		private readonly dataSource: DataSource,
	) {}

	@Mutation(() => Coupon)
	createCoupon(@Args('createCouponInput') createCouponInput: CreateCouponInput) {
		return this.couponsService.create(createCouponInput);
	}

	@Query(() => [Coupon], { name: 'coupons' })
	findAll(@Args() args: FindManyArgs) {
		return this.couponsService.findAll(args);
	}

	@Query(() => Coupon, { name: 'coupon' })
	findOne(@Args('id') id: string) {
		return this.couponsService.findOne({ where: { id } });
	}

	@Mutation(() => Coupon)
	updateCoupon(@Args('updateCouponInput') updateCouponInput: UpdateCouponInput) {
		return this.couponsService.update(updateCouponInput.id, updateCouponInput);
	}

	@Mutation(() => Coupon)
	removeCoupon(@Args('id') id: string) {
		return this.couponsService.remove(id);
	}

	@Mutation(() => String)
	async applyCoupon(@Args('applyCouponInput') applyCouponInput: ApplyCouponDto) {
		const coupon = await this.couponsService.getValidCoupon(applyCouponInput.code);
		if (!coupon) throw new BadRequestException(`Coupon "${applyCouponInput.code}" is invalid`);
		const appliedCoupon = await this.couponsService.applyCoupon(coupon);
		console.log('🚀 ~ CouponsResolver ~ applyCoupon ~ appliedCoupon:', appliedCoupon);
	}
}
