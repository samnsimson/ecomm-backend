import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.guard';
import { corsOptions } from './_libs/cors/options';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);

	app.enableCors(corsOptions);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalGuards(new JwtAuthGuard());
	await app.listen(4000, () => logger.log('Listening on port 4000'));
}
bootstrap();
