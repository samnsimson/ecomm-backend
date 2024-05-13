import { ObjectType, Field, PickType } from '@nestjs/graphql';
import { Cart } from 'src/carts/entities/cart.entity';
import { CoreEntity } from 'src/libs/entity/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User extends CoreEntity {
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

	@Field(() => [Review])
	@OneToMany(() => Review, (review) => review.user)
	reviews: Review[];

	@Field(() => Cart, { nullable: true })
	@OneToOne(() => Cart, (cart) => cart.user)
	@JoinColumn()
	cart: Cart;

	@Field(() => [Order], { nullable: true })
	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];
}

@ObjectType()
export class DeltedUser extends PickType(User, ['id']) {}
