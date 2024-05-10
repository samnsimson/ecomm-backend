import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field(() => Int)
	exampleField: number;
}
