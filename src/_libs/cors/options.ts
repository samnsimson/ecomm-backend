import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const allowedOrigins: string[] = ['http://localhost:3000', 'http://storefront:3000', 'http://127.0.0.1:3000'];

export const corsOptions: CorsOptions = {
	credentials: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 200,
	origin: allowedOrigins,
};
