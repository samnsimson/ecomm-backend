import { ArgsType, Field, Int } from '@nestjs/graphql';
import { FindManyOptions } from 'typeorm';

@ArgsType()
export class FindManyArgs<T> implements FindManyOptions<T> {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}
