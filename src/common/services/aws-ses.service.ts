import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { applicationConfig } from 'config';
import { InvalidRecipientEmail } from 'src/utils/errors';
import { validateEmail } from 'src/utils/helper';

@Injectable()
export class AwsSesService {
  sesClient: SESClient;
  logger: Logger;

  constructor() {
    this.sesClient = new SESClient({
      region: applicationConfig.aws.region,
      credentials: {
        accessKeyId: applicationConfig.aws.accessKeyId,
        secretAccessKey: applicationConfig.aws.secretAccessKey,
      },
    });
    this.logger = new Logger('AwsSesService');
  }

  async sendEmail({
    senderEmail = 'ravi149185@gmail.com',
    body,
    recipientEmail,
    sourcePrefix = 'cons',
    subject,
  }: {
    senderEmail?: string;
    recipientEmail: string;
    subject: string;
    body: string;
    sourcePrefix?: string;
  }) {
    try {
      // if (!validateEmail(recipientEmail)) {
      //   throw new InvalidRecipientEmail();
      // }

      const params = {
        Source: `${sourcePrefix} <${senderEmail}>`,
        Destination: {
          ToAddresses: [recipientEmail],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: body,
              Charset: 'UTF-8',
            },
          },
        },
      };

      const command = new SendEmailCommand(params);
      const res = await this.sesClient.send(command);
      this.logger.log(`Email sent to ${recipientEmail}`);

      return res;
    } catch (error) {
      this.logger.error(`Error sending email to ${recipientEmail}`);
      this.logger.error(error);
    }
  }
}
