import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';

@Resolver(() => Coupon)
export class CouponsResolver {
  constructor(private readonly couponsService: CouponsService) {}

  @Mutation(() => Coupon)
  createCoupon(@Args('createCouponInput') createCouponInput: CreateCouponInput) {
    return this.couponsService.create(createCouponInput);
  }

  @Query(() => [Coupon], { name: 'coupons' })
  findAll() {
    return this.couponsService.findAll();
  }

  @Query(() => Coupon, { name: 'coupon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.couponsService.findOne(id);
  }

  @Mutation(() => Coupon)
  updateCoupon(@Args('updateCouponInput') updateCouponInput: UpdateCouponInput) {
    return this.couponsService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation(() => Coupon)
  removeCoupon(@Args('id', { type: () => Int }) id: number) {
    return this.couponsService.remove(id);
  }
}
