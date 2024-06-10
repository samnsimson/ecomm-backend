import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfo } from './entities/delivery-info.entity';
import { CreateDeliveryInfoInput } from './dto/create-delivery-info.input';
import { UpdateDeliveryInfoInput } from './dto/update-delivery-info.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';

@Resolver(() => DeliveryInfo)
export class DeliveryInfoResolver {
	constructor(private readonly deliveryInfoService: DeliveryInfoService) {}

	@Mutation(() => DeliveryInfo)
	createDeliveryInfo(@Args('createDeliveryInfoInput') createDeliveryInfoInput: CreateDeliveryInfoInput) {
		return this.deliveryInfoService.create(createDeliveryInfoInput);
	}

	@Query(() => [DeliveryInfo], { name: 'deliveryInfo' })
	findAll(@Args() args: FindManyArgs) {
		return this.deliveryInfoService.findAll(args);
	}

	@Query(() => DeliveryInfo, { name: 'deliveryInfo' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.deliveryInfoService.findOne({ where: { id } });
	}

	@Mutation(() => DeliveryInfo)
	updateDeliveryInfo(@Args('updateDeliveryInfoInput') updateDeliveryInfoInput: UpdateDeliveryInfoInput) {
		return this.deliveryInfoService.update(updateDeliveryInfoInput.id, updateDeliveryInfoInput);
	}

	@Mutation(() => DeliveryInfo)
	removeDeliveryInfo(@Args('id', { type: () => Int }) id: string) {
		return this.deliveryInfoService.remove(id);
	}
}
