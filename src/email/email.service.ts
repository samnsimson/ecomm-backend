import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailTemplate } from 'src/_libs/types';
import mjml2html from 'mjml';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class EmailService {
	private readonly logger: Logger = new Logger(EmailService.name);
	private templatesDir: string = path.join(__dirname, 'templates');

	constructor(private readonly mailer: MailerService) {
		this.logger.log(this.templatesDir);
		this.renderTemplate(EmailTemplate.ORDER_CREATED, {});
	}

	private renderTemplate<T>(templateName: EmailTemplate, context: T) {
		const templatePath = path.join(this.templatesDir, `${templateName}.mjml`);
		const templateSource = fs.readFileSync(templatePath, 'utf8');
		const mjmlResult = mjml2html(templateSource);
		if (mjmlResult.errors.length > 0) throw new Error(`MJML compilation error: ${mjmlResult.errors}`);
		const template = Handlebars.compile(mjmlResult.html);
		return template(context);
	}

	async sendEmail<T>(template: EmailTemplate, context: T) {
		this.logger.log(`Sending email. Template => ${template}`);
		await this.mailer.sendMail({
			to: 'samnsimson@gmail.com',
			subject: 'Order status update',
			html: this.renderTemplate<T>(template, context),
		});
	}
}
