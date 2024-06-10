import { Injectable, NotFoundException } from '@nestjs/common';
import { BillingInfoInput, CreateDeliveryInfoInput, ShippingInfoInput } from './dto/create-delivery-info.input';
import { UpdateDeliveryInfoInput } from './dto/update-delivery-info.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryInfo } from './entities/delivery-info.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DeliveryInfoService {
	constructor(@InjectRepository(DeliveryInfo) private readonly deliveryInfo: Repository<DeliveryInfo>) {}

	private extractBillingInfo = (billingAddress: BillingInfoInput) => {
		return {
			billingAddressOne: billingAddress.addressOne,
			billingAddressTwo: billingAddress.addressTwo,
			billingCity: billingAddress.city,
			billingState: billingAddress.state,
			billingCountry: billingAddress.country,
			billingZipcode: billingAddress.zipcode,
			billingPhone: billingAddress.phone,
			billingEmail: billingAddress.email,
		};
	};

	private extractShippingInfo = (shippingAddress: ShippingInfoInput) => {
		return {
			shippingAddressOne: shippingAddress.addressOne,
			shippingAddressTwo: shippingAddress.addressTwo,
			shippingCity: shippingAddress.city,
			shippingState: shippingAddress.state,
			shippingCountry: shippingAddress.country,
			shippingZipcode: shippingAddress.zipcode,
		};
	};

	async create(createDeliveryInfoInput: CreateDeliveryInfoInput) {
		const { billingAddress, shippingAddress } = createDeliveryInfoInput;
		const billinginfo = this.extractBillingInfo(billingAddress);
		const shippingInfo = this.extractShippingInfo(shippingAddress);
		const deliveryInfo = this.deliveryInfo.create({ ...billinginfo, ...shippingInfo });
		return await this.deliveryInfo.save(deliveryInfo);
	}

	findAll(args?: FindManyOptions<DeliveryInfo>) {
		return this.deliveryInfo.find({ ...args, order: { createdAt: 'ASC' } });
	}

	async findOne(args: FindOneOptions<DeliveryInfo>) {
		return await this.deliveryInfo.findOne(args);
	}

	async update(id: string, updateDeliveryInfoInput: UpdateDeliveryInfoInput) {
		const { billingAddress, shippingAddress } = updateDeliveryInfoInput;
		const billinginfo = this.extractBillingInfo(billingAddress);
		const shippingInfo = this.extractShippingInfo(shippingAddress);
		const { affected } = await this.deliveryInfo.update(id, { ...billinginfo, ...shippingInfo });
		if (!affected) throw new NotFoundException('Unable to update the data');
		return await this.findOne({ where: { id } });
	}

	async remove(id: string) {
		return await this.deliveryInfo.delete(id);
	}
}
