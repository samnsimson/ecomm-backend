import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = GqlExecutionContext.create(context).getContext();
		const token = ctx.req.get('authorization');
		if (!token) return false;
		ctx['user'] = this.validateToken(token);
		return true;
	}

	validateToken(token: string = 'Token') {
		return { token };
	}
}
