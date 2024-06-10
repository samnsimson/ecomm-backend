import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfo } from './entities/delivery-info.entity';
import { CreateDeliveryInfoInput } from './dto/create-delivery-info.input';
import { UpdateDeliveryInfoInput } from './dto/update-delivery-info.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { BillingInfoDto, DeliveryInfoDto, ShippingInfoDto } from './dto/delivery-return-type.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Resolver(() => DeliveryInfoDto)
export class DeliveryInfoResolver {
	constructor(
		private readonly deliveryInfoService: DeliveryInfoService,
		private readonly userService: UserService,
	) {}

	@Mutation(() => DeliveryInfoDto)
	createDeliveryInfo(@Args('createDeliveryInfoInput') createDeliveryInfoInput: CreateDeliveryInfoInput) {
		return this.deliveryInfoService.create(createDeliveryInfoInput);
	}

	@Query(() => [DeliveryInfoDto], { name: 'deliveryInfos' })
	findAll(@Args() args: FindManyArgs) {
		return this.deliveryInfoService.findAll(args);
	}

	@Query(() => DeliveryInfoDto, { name: 'deliveryInfo' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.deliveryInfoService.findOne({ where: { id } });
	}

	@Mutation(() => DeliveryInfo)
	updateDeliveryInfo(@Args('updateDeliveryInfoInput') updateDeliveryInfoInput: UpdateDeliveryInfoInput) {
		return this.deliveryInfoService.update(updateDeliveryInfoInput.id, updateDeliveryInfoInput);
	}

	@Mutation(() => DeliveryInfo)
	removeDeliveryInfo(@Args('id', { type: () => String }) id: string) {
		return this.deliveryInfoService.remove(id);
	}

	@ResolveField(() => User, { name: 'user' })
	async user(@Parent() deliverInfo: DeliveryInfo): Promise<User> {
		return await this.userService.findOne({ where: { deliveryInfo: { id: deliverInfo.id } } });
	}

	@ResolveField(() => BillingInfoDto, { name: 'billingAddress', nullable: true })
	billingAddress(@Parent() deliveryInfo: DeliveryInfo): BillingInfoDto {
		return {
			addressOne: deliveryInfo.billingAddressOne,
			addressTwo: deliveryInfo.billingAddressTwo,
			city: deliveryInfo.billingCity,
			state: deliveryInfo.billingState,
			country: deliveryInfo.billingCountry,
			zipcode: deliveryInfo.billingZipcode,
			email: deliveryInfo.billingEmail,
			phone: deliveryInfo.billingPhone,
		};
	}

	@ResolveField(() => ShippingInfoDto, { name: 'shippingAddress', nullable: true })
	shippingAddress(@Parent() deliveryInfo: DeliveryInfo): ShippingInfoDto {
		return {
			addressOne: deliveryInfo.shippingAddressOne,
			addressTwo: deliveryInfo.shippingAddressTwo,
			city: deliveryInfo.shippingCity,
			state: deliveryInfo.shippingState,
			country: deliveryInfo.shippingCountry,
			zipcode: deliveryInfo.shippingZipcode,
		};
	}
}
