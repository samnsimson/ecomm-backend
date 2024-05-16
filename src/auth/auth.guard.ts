import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/_constants';
import { Observable } from 'rxjs';

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
	private readonly reflector: Reflector;

	constructor() {
		super();
		this.reflector = new Reflector();
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		if (isPublic) return true;
		return super.canActivate(context);
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();
		return req;
	}
}
