import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/utils/libs/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
	@Field()
	@Column()
	firstName: string;

	@Field({ nullable: true })
	@Column({ default: null })
	lastName: string;

	@Field()
	@Column()
	addressOne: string;

	@Field({ nullable: true })
	@Column({ default: null })
	addressTwo: string;

	@Field()
	@Column()
	city: string;

	@Field()
	@Column()
	state: string;

	@Field()
	@Column()
	country: string;

	@Field()
	@Column()
	zipcode: string;
}
