import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/utils/libs/entities/user.entity';

@Resolver()
export class UserResolver {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	@Query(() => [User])
	listUsers() {
		return this.userRepository.find({ relations: { profile: true } });
	}

	@Query(() => User, { nullable: true })
	getUserById(@Args('id') id: string) {
		return this.userRepository.findOne({ where: { id } });
	}

	@Mutation(() => User)
	createUser(@Args('input') input: CreateUserInput) {
		return this.userRepository.save({ ...input });
	}
}
