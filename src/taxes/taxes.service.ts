import { Injectable } from '@nestjs/common';
import { CreateTaxInput } from './dto/create-tax.input';
import { UpdateTaxInput } from './dto/update-tax.input';

@Injectable()
export class TaxesService {
  create(createTaxInput: CreateTaxInput) {
    return 'This action adds a new tax';
  }

  findAll() {
    return `This action returns all taxes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tax`;
  }

  update(id: number, updateTaxInput: UpdateTaxInput) {
    return `This action updates a #${id} tax`;
  }

  remove(id: number) {
    return `This action removes a #${id} tax`;
  }
}
