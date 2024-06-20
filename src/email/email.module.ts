import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				defaults: { from: 'eComm Website Admin <samnsimson@gmail.com>' },
				transport: {
					host: configService.get<string>('SMTP_SERVER'),
					auth: {
						user: configService.get<string>('SMTP_USERNAME'),
						pass: configService.get<string>('SMTP_PASSWORD'),
					},
				},
			}),
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
