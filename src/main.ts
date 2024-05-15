import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AuthenticationGuard } from './auth/auth.guard';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
	app.useGlobalGuards(new AuthenticationGuard());
	await app.listen(3000, () => logger.log('Listening on port 3000'));
}
bootstrap();
