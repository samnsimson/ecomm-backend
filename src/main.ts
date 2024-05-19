import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.guard';
import { GlobalExceptionFilter } from './filters/exception/exception.filter';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
	app.useGlobalGuards(new JwtAuthGuard());
	app.useGlobalFilters(new GlobalExceptionFilter());
	await app.listen(3000, () => logger.log('Listening on port 3000'));
}
bootstrap();
