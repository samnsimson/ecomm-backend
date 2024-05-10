import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'profile' })
export class Profile {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	firstName: string;

	@Field({ nullable: true })
	@Column({ nullable: true, default: null })
	lastName: string;

	@Field()
	@Column()
	addressOne: string;

	@Field({ nullable: true })
	@Column({ nullable: true, default: null })
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

	@Field({ nullable: true })
	@Column({ nullable: true, default: null })
	profileImage: string;
}
