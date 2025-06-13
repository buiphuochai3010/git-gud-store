import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

interface SendEmailOptions {
    to: string;
    subject: string;
    template: string;
    context: any;
}

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) { }
 
    async sendEmail({ to, subject, template, context }: SendEmailOptions) {
        try {
            if (this.configService.get<string>('NODE_ENV') === 'development') {
                const dev_email = this.configService.get<string>('DEV_EMAIL');
                if (!dev_email) {
                    throw new BadRequestException('Không có email mặc định để gửi trên môi trường Development, vui lòng kiểm tra lại!');
                }
                to = dev_email;
            }

            await this.mailerService.sendMail({
                to,
                subject,
                template,
                context,
            });
            
            return {
                message: 'Gửi email thành công',
                success: true,
            };
        } catch (error) {
            console.error('[EmailService][sendEmail] error', error);
            throw error;
        }
    }
}