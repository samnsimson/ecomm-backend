import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { FindManyArgs } from 'src/libs/dto/base.args';

@Resolver(() => Payment)
export class PaymentsResolver {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Mutation(() => Payment)
	createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
		return this.paymentsService.create(createPaymentInput);
	}

	@Query(() => [Payment], { name: 'payments' })
	findAll(@Args() args: FindManyArgs) {
		return this.paymentsService.findAll(args);
	}

	@Query(() => Payment, { name: 'payment' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.paymentsService.findOne(id, { relations: { order: true } });
	}

	@Mutation(() => Payment)
	updatePayment(@Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput) {
		return this.paymentsService.update(updatePaymentInput.id, updatePaymentInput);
	}

	@Mutation(() => Payment)
	removePayment(@Args('id', { type: () => Int }) id: string) {
		return this.paymentsService.remove(id);
	}
}
