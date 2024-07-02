import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { ProductInfo } from './dto/cart-products.input';
import { CartProductOutput, CartTaxes, CouponDTO, ProductOutput } from './dto/cart-products.output';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { SettingsService } from 'src/settings/settings.service';
import { TaxesService } from 'src/taxes/taxes.service';
import { DiscountsService } from 'src/discounts/discounts.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { CouponType, DiscountType } from 'src/_libs/types';
import { UpdateCartInput } from './dto/update-cart.input';

@Injectable()
export class CartsService {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectRepository(Cart) private readonly cart: Repository<Cart>,
		private readonly productService: ProductsService,
		private readonly settingsService: SettingsService,
		private readonly taxesService: TaxesService,
		private readonly discountService: DiscountsService,
		private readonly couponService: CouponsService,
	) {}

	async getCartForGuest(productInfo: Array<ProductInfo>): Promise<CartProductOutput['products']> {
		const data = await this.productService.findAll({ where: { id: In(productInfo.map((x) => x.id)) } });
		const output: CartProductOutput['products'] = [];
		for (const product of productInfo) {
			const pdt = data.find((x) => x.id === product.id);
			if (!pdt) continue;
			const { title, slug, salePrice, retailPrice } = pdt;
			const total = salePrice * product.quantity;
			output.push({ ...product, title, slug, salePrice, retailPrice, total });
		}
		return output;
	}

	async getCartForUser(id: string, productInfo: Array<ProductInfo>): Promise<CartProductOutput['products']> {
		return this.entityManager.transaction(async (em) => {
			const products = await em.find(Product, { where: { id: In(productInfo.map((x) => x.id)) } });
			const cart = await this.getCartOrCreate(em, id);
			const items = cart.items ?? (await em.find(CartItem, { where: { cart: { id: cart.id } } }));
			const productsMap = new Map(products.map((product) => [product.id, product]));
			const itemsMap = new Map(items.map((item) => [item.product.id, item]));
			const { output, newItems, updatePromises } = this.createOrUpdatecart(productInfo, productsMap, itemsMap, em, cart);
			newItems.length && (await em.save(CartItem, newItems));
			updatePromises.length && (await Promise.all(updatePromises));
			return output;
		});
	}

	private createOrUpdatecart(productInfo: ProductInfo[], productsMap: Map<string, Product>, itemsMap: Map<string, CartItem>, em: EntityManager, cart: Cart) {
		const output: CartProductOutput['products'] = [];
		const newItems = [];
		const updatePromises = [];

		for (const pdt of productInfo) {
			const { title, slug, salePrice, retailPrice } = productsMap.get(pdt.id);
			const total = pdt.quantity * salePrice;
			output.push({ ...pdt, title, slug, salePrice, retailPrice, total });
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

	calculateCartTotal = (products: Array<ProductOutput>) => {
		return products.reduce((a, b) => a + b.total, 0);
	};

	async calculateTaxes(products: Array<ProductOutput>): Promise<CartTaxes | null> {
		const [settings] = await this.settingsService.find({ order: { createdAt: 'DESC' }, take: 1 });
		if (!settings || !settings.taxesEnabled) return null;
		const cartTotal = this.calculateCartTotal(products);
		const taxBreakup = await this.taxesService.taxBreakup(cartTotal);
		if (!taxBreakup) return null;
		return { total: taxBreakup.reduce((a, b) => (a + cartTotal ? b.total : 0), 0), breakup: taxBreakup };
	}

	async calculateDiscounts(cartTotal: number = 0): Promise<number | null> {
		const discounts = await this.discountService.findAll({ where: { enabled: true } });
		const discountAmounts = discounts.map((disc) => {
			switch (disc.type) {
				case DiscountType.FLAT:
					return cartTotal ? disc.amount : 0;
				case DiscountType.PERCENTAGE:
					const multiplier = disc.percentage / 100;
					return Math.round(cartTotal * multiplier);
				default:
					return 0;
			}
		});
		return Math.max(...discountAmounts);
	}

	async calculateCoupon(cartTotal: number, couponCode: string | null): Promise<CouponDTO | null> {
		if (!couponCode) return null;
		let total = 0;
		const coupon = await this.couponService.applyCoupon(couponCode, new Date());
		if (coupon.type === CouponType.FLAT) total = cartTotal ? coupon.amount : 0;
		if (coupon.type === CouponType.PERCENTAGE) total = Math.round(cartTotal * (coupon.percentage / 100));
		return { code: coupon.code, total };
	}

	async findAll(args?: FindManyOptions<Cart>) {
		return await this.cart.find(args);
	}

	async findOne(args: FindOneOptions<Cart>) {
		return await this.cart.findOne(args);
	}

	async update(input: UpdateCartInput) {
		const { id, ...rest } = input;
		const cart = await this.cart.save(this.cart.create({ id, ...rest }));
		return await this.cart.findOne({ where: { id: cart.id } });
	}

	async clearUserCart(args: string | FindOptionsWhere<Cart>) {
		return await this.cart.delete(args);
	}
}
