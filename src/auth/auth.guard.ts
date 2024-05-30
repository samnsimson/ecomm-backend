import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_REFRESH_JWT_KEY } from 'src/_constants';
import { Observable } from 'rxjs';
import { decoratorType } from 'src/_libs/utils/reflector';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
	constructor() {
		super();
	}
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const req = ctx.getContext();
		const { credentials } = ctx.getArgs();
		req['body'] = credentials;
		return req;
	}
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		const token = req.headers['authorization'];
		const isPublic = decoratorType(IS_PUBLIC_KEY, context);
		const isRefreshJwt = decoratorType(IS_REFRESH_JWT_KEY, context);
		const isGuest = isPublic && !!!token;
		if (isGuest || isRefreshJwt) return true;
		return super.canActivate(context);
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		return req;
	}
}

@Injectable()
export class RefreshJwtGuard extends AuthGuard('refresh-jwt') {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isRefreshJwt = decoratorType(IS_REFRESH_JWT_KEY, context);
		if (!isRefreshJwt) return true;
		return super.canActivate(context);
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		const { refreshTokenInput } = ctx.getArgs();
		req['body'] = refreshTokenInput;
		return req;
	}
}
