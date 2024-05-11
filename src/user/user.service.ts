import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FindByArgs } from 'src/libs/types';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private user: Repository<User>) {}

	create(createUserInput: CreateUserInput) {
		return this.user.save(createUserInput);
	}

	findAll(options: FindManyOptions<User> = {}) {
		const { take = 10, skip = 0, ...rest } = options;
		return this.user.find({ take, skip, ...rest });
	}

	findOne(id: string) {
		return this.user.findOneBy({ id });
	}

	findOneBy(args: FindByArgs<User>) {
		return this.user.findOneBy(args);
	}

	update(id: string, updateUserInput: UpdateUserInput) {
		return this.user.update(id, updateUserInput);
	}

	async remove(id: string) {
		const result = await this.user.delete(id);
		if (result.affected === 0) throw new HttpException(`id ${id} not found!`, HttpStatus.NOT_FOUND);
		return { id };
	}
}
