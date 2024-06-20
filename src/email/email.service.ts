import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from 'src/_libs/types';

@Injectable()
export class EmailService {
	private readonly logger: Logger = new Logger(EmailService.name);

	constructor(private readonly mailer: MailerService) {}

	async sendEmail(status: OrderStatus) {
		this.logger.log('Sending email');
		await this.mailer.sendMail({
			from: 'eComm Website Admin <samnsimson@gmail.com>',
			to: 'samnsimson@gmail.com',
			subject: 'Order status update',
			text: `Order status is ${status}`,
		});
	}
}
