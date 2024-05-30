import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
// import { UpdateCartInput } from './dto/update-cart.input';
import { CurrentUser, Public } from 'src/_decorator';
import { CurrentUserType } from 'src/_libs/types';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductInfo } from './dto/cart-products.input';
import { In } from 'typeorm';
import { CartProductOutput } from './dto/cart-products.output';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(
		private readonly cartsService: CartsService,
		private readonly productService: ProductsService,
	) {}

	@Public()
	@Query(() => CartProductOutput, { name: 'cartProducts' })
	async getCartProducts(@Args('input', { type: () => [ProductInfo] }) products: Array<ProductInfo>, @CurrentUser() user: CurrentUserType) {
		const pdts = await this.productService.findAll({ where: { id: In(products.map((x) => x.id)) } });
		const output: CartProductOutput['products'] = [];
		for (const product of products) {
			const pdt = pdts.find((x) => x.id === product.id);
			if (!pdt) continue;
			const { title, slug, salePrice, retailPrice } = pdt;
			output.push({ ...product, title, slug, salePrice, retailPrice, total: salePrice * product.quantity });
		}
		return { total: output.reduce((a, b) => a + b.total, 0), products: output };
	}

	@Mutation(() => Cart)
	async createCart(@Args('createCartInput') createCartInput: CreateCartInput, @CurrentUser() currentUser: CurrentUserType) {
		if (!currentUser) throw new UnauthorizedException('Unauthorized');
		return await this.cartsService.create({ ...createCartInput, userId: currentUser.id });
	}

	@Query(() => [Cart], { name: 'carts' })
	findAll() {
		return this.cartsService.findAll({});
	}

	@Query(() => Cart, { name: 'cart' })
	findOne(@Args('cartId', { nullable: true }) cartId?: string, @Args('userId', { nullable: true }) userId?: string) {
		if (!cartId && !userId) throw new BadRequestException('Either cartId or userId must be provider');
		return this.cartsService.findOne({ where: [{ id: cartId }, { user: { id: userId } }] });
	}

	// @Mutation(() => Cart)
	// updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
	// 	return this.cartsService.update(updateCartInput.id, updateCartInput);
	// }

	@Mutation(() => Cart)
	removeCart(@Args('id', { type: () => Int }) id: number) {
		return this.cartsService.remove(id);
	}

	@ResolveField(() => Int, { name: 'subTotal' })
	calculateSubTotal(@Parent() cart: Cart) {
		const subTotal = cart.items.reduce((a, b) => a + b.total, 0);
		return subTotal;
	}
	@ResolveField(() => Int, { name: 'discount' })
	calculateDiscount(@Parent() cart: Cart) {
		return 0;
	}
	@ResolveField(() => Int, { name: 'total' })
	calculateTotal(@Parent() cart: Cart) {
		const total = this.calculateSubTotal(cart) - this.calculateDiscount(cart);
		return total;
	}
}
