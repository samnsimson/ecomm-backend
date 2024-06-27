import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DiscountsService } from './discounts.service';
import { Discount } from './entities/discount.entity';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';

@Resolver(() => Discount)
export class DiscountsResolver {
	constructor(private readonly discountsService: DiscountsService) {}

	@Mutation(() => Discount)
	createDiscount(@Args('createDiscountInput') createDiscountInput: CreateDiscountInput) {
		return this.discountsService.create(createDiscountInput);
	}

	@Query(() => [Discount], { name: 'discounts' })
	findAll(@Args() args: FindManyArgs) {
		return this.discountsService.findAll(args);
	}

	@Query(() => Discount, { name: 'discount' })
	findOne(@Args('id') id: string) {
		return this.discountsService.findOne({ where: { id } });
	}

	@Mutation(() => Discount)
	async updateDiscount(@Args('updateDiscountInput') updateDiscountInput: UpdateDiscountInput) {
		const coupon = await this.discountsService.update(updateDiscountInput.id, updateDiscountInput);
		return await this.discountsService.findOne({ where: { id: coupon.id } });
	}

	@Mutation(() => Discount)
	removeDiscount(@Args('id') id: string) {
		return this.discountsService.remove(id);
	}
}
