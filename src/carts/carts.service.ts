import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { TaxesService } from 'src/taxes/taxes.service';
import { DiscountsService } from 'src/discounts/discounts.service';
import { CreateCartInput, Item } from './dto/create-cart.input';
import { ShippingsService } from 'src/shippings/shippings.service';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { RemoveCartItemInput } from './dto/remove-item.input';
import { CreateCartItemInput } from './dto/create-cart-item.input';

@Injectable()
export class CartsService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Cart) private readonly cart: Repository<Cart>,
		private readonly taxesService: TaxesService,
		private readonly discountService: DiscountsService,
		private readonly shippingService: ShippingsService,
	) {}

	async getCartNumbers(items: Item[]) {
		const subTotal = items.reduce((a, b) => a + b.price * b.quantity, 0);
		const discountAmount = await this.discountService.calculateDiscount(subTotal);
		const taxes = await this.taxesService.taxBreakup(subTotal);
		const taxAmount = taxes.reduce((a, b) => a + b.total, 0);
		const shippingAmount = await this.shippingService.calculateShipping(subTotal);
		const total = subTotal + shippingAmount + taxAmount - discountAmount;
		return { total, subTotal, shippingAmount, discountAmount, taxAmount };
	}

	async createCart({ userId, items, ...cartData }: CreateCartInput) {
		return this.entityManager.transaction(async (em) => {
			const cartDiscounts = await this.getCartNumbers(items);
			const cart = await em.save(Cart, em.create(Cart, { user: { id: userId }, ...cartDiscounts, ...cartData }));
			const cartItems = items.map(({ id, ...rest }) => em.create(CartItem, { cart: { id: cart.id }, product: { id }, ...rest }));
			await em.save(CartItem, cartItems);
			return await em.findOne(Cart, { where: { id: cart.id } });
		});
	}

	private async udpateCart(em: EntityManager, cartId: string) {
		const allCartItems = await em.find(CartItem, { where: { cart: { id: cartId } } });
		const cartDiscounts = await this.getCartNumbers(allCartItems);
		const cart = await em.save(Cart, em.create(Cart, { id: cartId, ...cartDiscounts }));
		return await em.findOne(Cart, { where: { id: cart.id } });
	}

	async createCartItem({ cartId, productId, price, quantity }: CreateCartItemInput) {
		return this.entityManager.transaction(async (em) => {
			await em.save(CartItem, em.create(CartItem, { cart: { id: cartId }, product: { id: productId }, price, quantity, total: price * quantity }));
			return await this.udpateCart(em, cartId);
		});
	}

	async updateCartItem({ itemId, cartId, quantity, price }: UpdateCartItemInput) {
		return this.entityManager.transaction(async (em) => {
			await em.save(CartItem, em.create(CartItem, { id: itemId, quantity, price, total: quantity * price }));
			return await this.udpateCart(em, cartId);
		});
	}

	async removeCartItem({ itemId, cartId }: RemoveCartItemInput) {
		return this.entityManager.transaction(async (em) => {
			const removedItem = await em.delete(CartItem, itemId);
			if (!removedItem.affected) throw new UnprocessableEntityException('Cannot delete non existing item.');
			return await this.udpateCart(em, cartId);
		});
	}

	async findAll(args?: FindManyOptions<Cart>) {
		return await this.cart.find(args);
	}

	async findOne(args: FindOneOptions<Cart>) {
		return await this.cart.findOne(args);
	}

	async clearUserCart(args: string | FindOptionsWhere<Cart>) {
		return await this.cart.delete(args);
	}
}
