import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { DiscountType } from 'src/_libs/types';
import { dateTransformer } from 'src/_libs/utils/entity-transformers';
import { Column, Entity } from 'typeorm';

registerEnumType(DiscountType, { name: 'DiscountType' });

@ObjectType()
@Entity({ name: 'discount' })
export class Discount extends CoreEntity {
	@Field(() => String)
	@Column('text')
	title: string;

	@Field(() => String, { nullable: true, defaultValue: null })
	@Column('text', { nullable: true, default: null })
	description?: string;

	@Field(() => DiscountType)
	@Column('enum', { enum: DiscountType })
	type: DiscountType;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	amount?: number;

	@Field(() => Int, { nullable: true })
	@Column('int', { nullable: true, default: 0 })
	percentage?: number;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('date', { nullable: true, default: null, transformer: dateTransformer })
	validFrom?: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	@Column('date', { nullable: true, default: null, transformer: dateTransformer })
	validThrough?: Date;

	@Field(() => Boolean, { nullable: true, defaultValue: null })
	@Column('boolean', { nullable: true, default: false })
	enabled?: boolean;
}
