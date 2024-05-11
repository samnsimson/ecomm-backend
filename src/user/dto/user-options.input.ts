import { FindManyOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindManyUserOptions implements FindManyOptions<User> {
	@Field()
	take?: number;

	@Field()
	skip?: number;
}
