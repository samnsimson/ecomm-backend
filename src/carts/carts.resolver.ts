import { Resolver, Query, Args } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { Public } from 'src/_decorator';
import { CartInput } from './dto/cart-products.input';
import { CartProductOutput } from './dto/cart-products.output';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Public()
	@Query(() => CartProductOutput, { name: 'cart' })
	async getCart(
		@Args('cartInput', { type: () => CartInput }) cartInput: CartInput,
		@Args('userId', { type: () => String, nullable: true }) userId: string | undefined,
	) {
		let total = 0;
		const { couponCode, products, cartId } = cartInput;
		const output = userId ? await this.cartsService.getCartForUser(userId, products) : await this.cartsService.getCartForGuest(products);
		const subTotal = this.cartsService.calculateCartTotal(output);
		const taxes = await this.cartsService.calculateTaxes(output);
		const discount = await this.cartsService.calculateDiscounts(subTotal);
		const coupon = await this.cartsService.calculateCoupon(subTotal, couponCode);
		if (coupon && cartId) await this.cartsService.update({ id: cartId, couponCode });
		const isDeductionsEligible = !!userId;
		if (subTotal) total = total + subTotal;
		if (discount && total >= discount) total = total - discount;
		if (coupon && coupon.total && total >= coupon.total) total = total - coupon.total;
		if (taxes && total) total = total + taxes.total;
		return { products: output, subTotal, total, isDeductionsEligible, taxes, discount, coupon };
	}
}
