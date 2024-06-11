import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Stripe } from 'stripe';
import { StripeService } from './stripe.service';
import { StripeResolver } from './stripe.resolver';

export type StripeOptions = {
	apiKey: string;
};

@Global()
@Module({})
export class StripeModule {
	static forRoot({ apiKey }: StripeOptions): DynamicModule {
		const StripeProvider: Provider = {
			provide: Stripe,
			useFactory: () => new Stripe(apiKey, { apiVersion: '2024-04-10' }),
		};

		return {
			module: StripeModule,
			providers: [StripeProvider, StripeResolver, StripeService],
			exports: [StripeService],
		};
	}
}
