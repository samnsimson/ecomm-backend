import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StripeService } from './stripe.service';
import { PaymentIntentInput, PaymentIntentOutput } from './dto/payment-intent.dto';

@Resolver()
export class StripeResolver {
	constructor(private readonly stripeService: StripeService) {}

	@Mutation(() => PaymentIntentOutput, { name: 'createPaymentIntent' })
	async createPaymentIntent(@Args('paymentInput') paymentInput: PaymentIntentInput) {
		return await this.stripeService.createPaymentIntent(paymentInput.orderId, paymentInput.total);
	}
}
