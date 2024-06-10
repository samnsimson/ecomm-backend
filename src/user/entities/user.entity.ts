import { ObjectType, Field, PickType, registerEnumType } from '@nestjs/graphql';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cart } from 'src/carts/entities/cart.entity';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, Unique } from 'typeorm';
import { UserRole } from 'src/_libs/types';
import { DeliveryInfo } from 'src/delivery-info/entities/delivery-info.entity';
import { DeliveryInfoDto } from 'src/delivery-info/dto/delivery-return-type.dto';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity({ name: 'user' })
@Unique(['username'])
@Unique(['email'])
@Unique(['phone'])
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

	@Column()
	password: string;

	@Field({ nullable: true })
	@Column({ default: false, nullable: true })
	emailVerified?: boolean;

	@Field({ nullable: true })
	@Column({ default: false, nullable: true })
	phoneVerified?: boolean;

	@Field(() => UserRole, { nullable: true, defaultValue: UserRole.USER })
	@Column('enum', { enum: UserRole, default: UserRole.USER })
	role?: UserRole;

	@Field(() => Profile, { nullable: true })
	@OneToOne(() => Profile, (profile) => profile.user, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn()
	profile: Profile;

	@Field(() => [Review])
	@OneToMany(() => Review, (review) => review.user)
	reviews: Review[];

	@Field(() => Cart, { nullable: true })
	@OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
	cart: Cart;

	@Field(() => [Order], { nullable: true })
	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@Field(() => DeliveryInfoDto, { nullable: true })
	@OneToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.user, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn()
	deliveryInfo: DeliveryInfo;

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, genSaltSync(10));
	}
}

@ObjectType()
export class DeltedUser extends PickType(User, ['id']) {}
