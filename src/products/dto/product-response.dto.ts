import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DimensionsResponse {
	@Field()
	width?: number;

	@Field()
	height?: number;

	@Field()
	depth?: number;
}
