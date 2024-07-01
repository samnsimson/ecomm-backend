import { Resolver, Query, Args } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CurrentUser, Public } from 'src/_decorator';
import { CurrentUserType } from 'src/_libs/types';
import { CartInput } from './dto/cart-products.input';
import { CartProductOutput } from './dto/cart-products.output';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Public()
	@Query(() => CartProductOutput, { name: 'cart' })
	async getCart(@Args('cartInput', { type: () => CartInput }) cartInput: CartInput, @CurrentUser() user: CurrentUserType) {
		console.log('🚀 ~ CartsResolver ~ getCart ~ user:', user);
		const { couponCode, products } = cartInput;
		const output = user ? await this.cartsService.getCartForUser(user.id, products) : await this.cartsService.getCartForGuest(products);
		const subTotal = this.cartsService.calculateCartTotal(output);
		const taxes = await this.cartsService.calculateTaxes(output);
		const discount = await this.cartsService.calculateDiscounts(subTotal);
		const coupon = await this.cartsService.calculateCoupon(subTotal, couponCode);
		const isDeductionsEligible = !!user;
		let total = 0;
		if (subTotal) total = total + subTotal;
		if (discount && total >= discount) total = total - discount;
		if (coupon && total >= coupon) total = total - coupon;
		if (taxes && total) total = total + taxes.total;
		return { products: output, subTotal, total, isDeductionsEligible, taxes, discount, coupon };
	}
}
