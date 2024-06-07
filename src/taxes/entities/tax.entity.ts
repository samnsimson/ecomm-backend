import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/_libs/entity/core.entity';
import { TaxTypes } from 'src/_libs/types';
import { Column } from 'typeorm';

registerEnumType(TaxTypes, { name: 'TaxTypes' });

@ObjectType()
export class Tax extends CoreEntity {
	@Field(() => String)
	@Column('text')
	title: string;

	@Field(() => String)
	@Column('text')
	description: string;

	@Field(() => TaxTypes, { defaultValue: TaxTypes.PERCENTAGE })
	@Column('enum', { enum: TaxTypes, default: TaxTypes.PERCENTAGE })
	type: TaxTypes;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { default: 0 })
	amount?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	@Column('int', { default: 0 })
	percentage?: number;

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	@Column('boolean', { default: false })
	enabled?: boolean;
}
