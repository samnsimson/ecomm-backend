import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShippingsService } from './shippings.service';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';

@Resolver(() => Shipping)
export class ShippingsResolver {
	constructor(private readonly shippingsService: ShippingsService) {}

	@Mutation(() => Shipping)
	createShipping(@Args('createShippingInput') createShippingInput: CreateShippingInput) {
		return this.shippingsService.create(createShippingInput);
	}

	@Query(() => [Shipping], { name: 'shippings' })
	findAll(@Args() args: FindManyArgs) {
		return this.shippingsService.findAll(args);
	}

	@Query(() => Shipping, { name: 'shipping' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.shippingsService.findOne(id);
	}

	@Mutation(() => Shipping)
	updateShipping(@Args('updateShippingInput') updateShippingInput: UpdateShippingInput) {
		return this.shippingsService.update(updateShippingInput.id, updateShippingInput);
	}

	@Mutation(() => Shipping)
	removeShipping(@Args('id', { type: () => String }) id: string) {
		return this.shippingsService.remove(id);
	}
}
