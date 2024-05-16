import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class FindManyArgs {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	@IsInt()
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@IsInt()
	skip?: number;
}
