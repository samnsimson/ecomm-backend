import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'review' })
export class Review {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;
}
