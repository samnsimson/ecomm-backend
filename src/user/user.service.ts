import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private user: Repository<User>) {}

	create(createUserInput: CreateUserInput) {
		return this.user.save(createUserInput);
	}

	findAll() {
		return this.user.find({ take: 10, skip: 0 });
	}

	findOne(id: string) {
		return this.user.findOneBy({ id });
	}

	update(id: string, updateUserInput: UpdateUserInput) {
		return this.user.update(id, updateUserInput);
	}

	remove(id: number) {
		return this.user.delete(id);
	}
}
