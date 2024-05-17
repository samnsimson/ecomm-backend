import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { DeltedUser, User } from './entities/user.entity';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindManyArgs } from 'src/_libs/dto/base.args';
import { Public } from 'src/_decorator';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	// @Mutation(() => User)
	// createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
	// 	return this.userService.create(createUserInput);
	// }

	@Public()
	@Query(() => [User], { name: 'users' })
	findAll(@Args() options: FindManyArgs) {
		return this.userService.findAll({ ...options, relations: { profile: true } });
	}

	@Query(() => User, { name: 'user' })
	findOne(@Args('id') id: string) {
		return this.userService.findOne(id);
	}

	@Mutation(() => User)
	updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		return this.userService.update(updateUserInput.id, updateUserInput);
	}

	@Mutation(() => DeltedUser)
	removeUser(@Args('id') id: string) {
		return this.userService.remove(id);
	}
}
