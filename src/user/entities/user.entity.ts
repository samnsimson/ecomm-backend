import { ObjectType, Field, ID, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User extends CoreEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@Column()
	username: string;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	phone: string;

	@Column({ select: false })
	password: string;

	@Field({ nullable: true })
	@Column({ default: false, nullable: true })
	emailVerified?: boolean;

	@Field({ nullable: true })
	@Column({ default: false, nullable: true })
	phoneVerified?: boolean;

	@Field(() => Profile, { nullable: true })
	@OneToOne(() => Profile, (profile) => profile.user)
	@JoinColumn()
	profile: Profile;
}

@ObjectType()
export class DeltedUser extends PickType(User, ['id']) {}
