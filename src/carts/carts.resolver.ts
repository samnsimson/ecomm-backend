import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { Public } from 'src/_decorator';
import { CreateCartInput } from './dto/create-cart.input';
import { v4 as uuid } from 'uuid';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { RemoveCartItemInput } from './dto/remove-item.input';
import { CreateCartItemInput } from './dto/create-cart-item.input';

@Resolver(() => Cart)
export class CartsResolver {
	constructor(private readonly cartsService: CartsService) {}

	@Public()
	@Mutation(() => Cart)
	async createCart(@Args('createCartInput') { userId, guestId, items }: CreateCartInput) {
		if (!userId) guestId = guestId ?? uuid();
		return await this.cartsService.createCart({ userId, guestId, items });
	}

	@Public()
	@Query(() => Cart, { name: 'cart', nullable: true })
	async getCart(
		@Args('userId', { type: () => String, nullable: true }) userId?: string,
		@Args('cartId', { type: () => String, nullable: true }) cartId?: string,
		@Args('guestId', { type: () => String, nullable: true }) guestId?: string,
	) {
		if (!userId && !cartId && !guestId) return null;
		const whereCond = [];
		if (cartId) whereCond.push({ id: cartId });
		if (userId) whereCond.push({ user: { id: userId } });
		if (guestId) whereCond.push({ guestId });
		const cart = await this.cartsService.findOne({ where: whereCond });
		return cart;
	}

	@Public()
	@Mutation(() => Cart)
	async createCartItem(@Args('createCartItemInput') createCartItemInput: CreateCartItemInput) {
		return await this.cartsService.createCartItem(createCartItemInput);
	}

	@Public()
	@Mutation(() => Cart)
	async updateCartItem(@Args('updateCartItemInput') updateCartItemInput: UpdateCartItemInput) {
		return await this.cartsService.updateCartItem(updateCartItemInput);
	}

	@Public()
	@Mutation(() => Cart)
	async removeCartItem(@Args('removeCartItemInput') removeCartItemInput: RemoveCartItemInput) {
		return await this.cartsService.removeCartItem(removeCartItemInput);
	}
}
