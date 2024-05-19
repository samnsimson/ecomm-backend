import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const gqlHost = GqlArgumentsHost.create(host);
		const context = gqlHost.getContext();
		const response = exception.getResponse();
		const status = exception.getStatus();
		context.res.status(status).json({
			statusCode: status,
			message: response['message'] || response,
			error: response['error'] || exception.message,
		});
	}
}
