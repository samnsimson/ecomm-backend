import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'profile' })
export class Profile extends CoreEntity {
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

	@Field(() => User)
	@OneToOne(() => User, (user) => user.profile)
	user: User;
}
