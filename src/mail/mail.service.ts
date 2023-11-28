import { Injectable, Logger } from '@nestjs/common';

type MailProps = {
  to: string;
  subject: string;
  template: string;
  context?: {
    name: string;
    matricula: string;
    password: string;
  };
};

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  async sendMail({
    to,
    subject,
    template,
    context,
  }: MailProps): Promise<{ message: string }> {
    this.logger.log(
      `Sending mail to ${to} with subject ${subject} and template ${template} and context ${JSON.stringify(
        context,
      )}`,
    );
    return {
      message: 'Mail sent',
    };
  }
}
