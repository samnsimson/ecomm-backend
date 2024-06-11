import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { PaymentIntentOutput } from './dto/payment-intent.dto';

@Injectable()
export class StripeService {
	constructor(
		private readonly stripe: Stripe,
		private readonly configService: ConfigService,
	) {}

	async createPaymentIntent(orderId: string, amount: number): Promise<PaymentIntentOutput> {
		amount = amount * 100;
		const currency = this.configService.get<string>('PAYMENT_CURRENCY');
		const automatic_payment_methods = { enabled: true };
		const metadata = { orderId };
		const pi = await this.stripe.paymentIntents.create({ amount, currency, automatic_payment_methods, metadata });
		return { clientSecret: pi.client_secret };
	}
}
