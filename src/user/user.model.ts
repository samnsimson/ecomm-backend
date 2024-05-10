import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from 'src/profile/profile.model';
import { BaseEntity } from 'src/utils/libs/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User extends BaseEntity {
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
	@OneToOne(() => Profile)
	@JoinColumn()
	profile: Profile;
}
