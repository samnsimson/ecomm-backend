import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiscountsService } from './discounts.service';
import { Discount } from './entities/discount.entity';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';

@Resolver(() => Discount)
export class DiscountsResolver {
  constructor(private readonly discountsService: DiscountsService) {}

  @Mutation(() => Discount)
  createDiscount(@Args('createDiscountInput') createDiscountInput: CreateDiscountInput) {
    return this.discountsService.create(createDiscountInput);
  }

  @Query(() => [Discount], { name: 'discounts' })
  findAll() {
    return this.discountsService.findAll();
  }

  @Query(() => Discount, { name: 'discount' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.discountsService.findOne(id);
  }

  @Mutation(() => Discount)
  updateDiscount(@Args('updateDiscountInput') updateDiscountInput: UpdateDiscountInput) {
    return this.discountsService.update(updateDiscountInput.id, updateDiscountInput);
  }

  @Mutation(() => Discount)
  removeDiscount(@Args('id', { type: () => Int }) id: number) {
    return this.discountsService.remove(id);
  }
}
