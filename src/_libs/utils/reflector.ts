import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const decoratorType = (key: string, context: ExecutionContext) => {
	const reflector: Reflector = new Reflector();
	const type = reflector.getAllAndOverride<boolean>(key, [context.getHandler(), context.getClass()]);
	return type;
};
