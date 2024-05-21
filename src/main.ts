import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.guard';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);
	app.enableCors({ origin: 'http://localhost:3000', credentials: true });
	app.useGlobalPipes(new ValidationPipe());
	app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
	app.useGlobalGuards(new JwtAuthGuard());
	await app.listen(4000, () => logger.log('Listening on port 4000'));
}
bootstrap();
