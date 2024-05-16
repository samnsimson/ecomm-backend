import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY, IS_REFRESH_JWT_KEY } from 'src/_constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RefreshJWT = () => SetMetadata(IS_REFRESH_JWT_KEY, true);

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
	const ctx = GqlExecutionContext.create(context);
	return ctx.getContext().req.user;
});
