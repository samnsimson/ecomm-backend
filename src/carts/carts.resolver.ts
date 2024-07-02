import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { Public } from 'src/_decorator';
import { CreateCartInput } from './dto/create-cart.input';
import { v4 as uuid } from 'uuid';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { RemoveCartItemInput } from './dto/remove-item.input';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Public()
	@Mutation(() => Cart)
	async createCart(@Args('createCartInput') { userId, ...input }: CreateCartInput) {
		if (!userId) userId = uuid();
		const cart = await this.cartsService.createCart({ userId, ...input });
		return cart;
	}

	@Public()
	@Query(() => Cart, { name: 'cart' })
	async getCart(
		@Args('userId', { type: () => String, nullable: true }) userId?: string,
		@Args('cartId', { type: () => String, nullable: true }) cartId?: string,
	) {
		return await this.cartsService.findOne({ where: [{ user: { id: userId } }, { id: cartId }] });
	}

	@Mutation(() => Cart)
	async updateCartItem(@Args('updateCartItemInput') updateCartItemInput: UpdateCartItemInput) {
		return await this.cartsService.updateCartItem(updateCartItemInput);
	}

	@Mutation(() => Cart)
	async removeCartItem(@Args('removeCartItemInput') removeCartItemInput: RemoveCartItemInput) {
		console.log('🚀 ~ CartsResolver ~ removeCartItem ~ removeCartItemInput:', removeCartItemInput);
		return await this.cartsService.removeCartItem(removeCartItemInput);
	}
}
