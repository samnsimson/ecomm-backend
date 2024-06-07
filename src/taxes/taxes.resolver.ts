import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaxesService } from './taxes.service';
import { Tax } from './entities/tax.entity';
import { CreateTaxInput } from './dto/create-tax.input';
import { UpdateTaxInput } from './dto/update-tax.input';

@Resolver(() => Tax)
export class TaxesResolver {
	constructor(private readonly taxesService: TaxesService) {}

	@Mutation(() => Tax)
	createTax(@Args('createTaxInput') createTaxInput: CreateTaxInput) {
		return this.taxesService.create(createTaxInput);
	}

	@Query(() => [Tax], { name: 'taxes' })
	findAll() {
		return this.taxesService.findAll();
	}

	@Query(() => Tax, { name: 'tax' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.taxesService.findOne({ where: { id } });
	}

	@Mutation(() => Tax)
	updateTax(@Args('updateTaxInput') updateTaxInput: UpdateTaxInput) {
		return this.taxesService.update(updateTaxInput.id, updateTaxInput);
	}

	@Mutation(() => Tax)
	removeTax(@Args('id', { type: () => Int }) id: string) {
		return this.taxesService.remove(id);
	}
}
