import { Resolver, Query, Args } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CurrentUser, Public } from 'src/_decorator';
import { CurrentUserType } from 'src/_libs/types';
import { ProductInfo } from './dto/cart-products.input';
import { CartProductOutput } from './dto/cart-products.output';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Public()
	@Query(() => CartProductOutput, { name: 'cart' })
	async getCart(@Args('input', { type: () => [ProductInfo] }) products: Array<ProductInfo>, @CurrentUser() user: CurrentUserType) {
		const output = user ? await this.cartsService.getCartForUser(user.id, products) : await this.cartsService.getCartForGuest(products);
		const subTotal = this.cartsService.calculateCartTotal(output);
		const isDeductionsEligible = !!user;
		const taxes = await this.cartsService.calculateTaxes(output);
		let total = 0;
		if (subTotal) total = total + subTotal;
		if (taxes) total = total + taxes.total;
		return { products: output, subTotal, total, isDeductionsEligible, taxes };
	}
}
