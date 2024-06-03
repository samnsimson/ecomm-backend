import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { EntityManager, FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { ProductInfo } from './dto/cart-products.input';
import { CartProductOutput } from './dto/cart-products.output';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Cart) private readonly cart: Repository<Cart>,
		private readonly productService: ProductsService,
	) {}

	async getCartForGuest(input: Array<ProductInfo>): Promise<CartProductOutput['products']> {
		const data = await this.productService.findAll({ where: { id: In(input.map((x) => x.id)) } });
		const output: CartProductOutput['products'] = [];
		for (const product of input) {
			const pdt = data.find((x) => x.id === product.id);
			if (!pdt) continue;
			const { title, slug, salePrice, retailPrice } = pdt;
			const total = salePrice * product.quantity;
			output.push({ ...product, title, slug, salePrice, retailPrice, total });
		}
		return output;
	}

	async getCartForUser(id: string, input: Array<ProductInfo>): Promise<CartProductOutput['products']> {
		return this.entityManager.transaction(async (em) => {
			const products = await em.find(Product, { where: { id: In(input.map((x) => x.id)) } });
			const cart = await this.getCartOrCreate(em, id);
			const items = cart.items ?? (await em.find(CartItem, { where: { cart: { id: cart.id } } }));
			const productsMap = new Map(products.map((product) => [product.id, product]));
			const itemsMap = new Map(items.map((item) => [item.product.id, item]));
			const { output, newItems, updatePromises } = this.createOrUpdatecart(input, productsMap, itemsMap, em, cart);
			newItems.length && (await em.save(CartItem, newItems));
			updatePromises.length && (await Promise.all(updatePromises));
			return output;
		});
	}

	private createOrUpdatecart(input: ProductInfo[], productsMap: Map<string, Product>, itemsMap: Map<string, CartItem>, em: EntityManager, cart: Cart) {
		const output = [];
		const newItems = [];
		const updatePromises = [];

		for (const pdt of input) {
			const { title, slug, salePrice, retailPrice } = productsMap.get(pdt.id);
			const total = pdt.quantity * salePrice;
			output.push({ ...pdt, title, slug, salePrice, retailPrice, price: salePrice, total });
			if (itemsMap.has(pdt.id)) {
				const item = itemsMap.get(pdt.id);
				updatePromises.push(em.update(CartItem, item.id, { quantity: pdt.quantity, price: total }));
			} else {
				const cartData = { cart: { id: cart.id } };
				const productData = { product: { id: pdt.id } };
				const rest = { quantity: pdt.quantity, price: salePrice, total };
				newItems.push(em.create(CartItem, { ...cartData, ...productData, ...rest }));
			}
		}
		return { output, newItems, updatePromises };
	}

	private async getCartOrCreate(em: EntityManager, id: string) {
		const cart = await em.findOne(Cart, { where: { user: { id } } });
		return cart ?? (await em.save(Cart, em.create(Cart, { user: { id } })));
	}

	async findAll(args: FindManyOptions<Cart>) {
		return await this.cart.find(args);
	}

	async findOne(args: FindOneOptions<Cart>) {
		return await this.cart.findOne(args);
	}
}
