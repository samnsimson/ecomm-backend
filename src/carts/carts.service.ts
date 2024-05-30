import { Injectable } from '@nestjs/common';
import { CreateCartInput, Item } from './dto/create-cart.input';
// import { UpdateCartInput } from './dto/update-cart.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { EntityManager, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartsService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Cart) private readonly cart: Repository<Cart>,
		@InjectRepository(CartItem) private readonly cartItem: Repository<CartItem>,
	) {}

	private async getCartOrCreate(entityManager: EntityManager, userId: string) {
		const cart = await entityManager.findOne(Cart, { where: { user: { id: userId } }, relations: { user: true, items: true } });
		if (!cart) return entityManager.save(Cart, entityManager.create(Cart, { user: { id: userId } }));
		return cart;
	}

	private async createCartItem(em: EntityManager, cartId: string, items: Array<Item>) {
		const cartItems = items.map(({ id, quantity, price }) => em.create(CartItem, { cart: { id: cartId }, product: { id }, quantity, price }));
		return await em.save(CartItem, cartItems);
	}

	async create(createCartInput: CreateCartInput & { userId: string }) {
		return await this.entityManager.transaction(async (entityManager) => {
			const cart = await this.getCartOrCreate(entityManager, createCartInput.userId);
			await this.createCartItem(entityManager, cart.id, createCartInput.items);
			return await entityManager.findOne(Cart, { where: { id: cart.id } });
		});
	}

	async findAll(args: FindManyOptions<Cart>) {
		return await this.cart.find(args);
	}

	async findOne(args: FindOneOptions<Cart>) {
		return await this.cart.findOne(args);
	}

	// update(id: number, updateCartInput: UpdateCartInput) {
	// 	return `This action updates a #${id} cart`;
	// }

	remove(id: number) {
		return `This action removes a #${id} cart`;
	}
}
