import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'review' })
export class Review extends CoreEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;
}
