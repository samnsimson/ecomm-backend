import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { BadRequestException } from '@nestjs/common';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Resolver(() => Coupon)
export class CouponsResolver {
	constructor(private readonly couponsService: CouponsService) {}

	@Mutation(() => Coupon)
	async createCoupon(@Args('createCouponInput') createCouponInput: CreateCouponInput) {
		const resp = await this.couponsService.create(createCouponInput);
		return resp;
	}

	@Query(() => [Coupon], { name: 'coupons' })
	async findAll(@Args() args: FindManyArgs) {
		const coupons = await this.couponsService.findAll(args);
		return coupons;
	}

	@Query(() => Coupon, { name: 'coupon' })
	findOne(@Args('id') id: string) {
		return this.couponsService.findOne({ where: { id } });
	}

	@Mutation(() => Coupon)
	async updateCoupon(@Args('updateCouponInput') updateCouponInput: UpdateCouponInput) {
		const coupon = await this.couponsService.update(updateCouponInput.id, updateCouponInput);
		return await this.couponsService.findOne({ where: { id: coupon.id } });
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
