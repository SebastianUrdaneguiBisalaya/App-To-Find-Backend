import nodemailer from 'nodemailer';
import {
  ConfigMailer,
  MailerAdapter,
  SendEmailParams,
} from '../../application/interfaces/adapters';
import { CustomError } from '../../../../shared/error/CustomError';

export const createMailerAdapter = (
  configMailer: ConfigMailer,
  transporterOptions?: nodemailer.TransportOptions,
): MailerAdapter => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } =
    configMailer;
  const transporter = nodemailer.createTransport(
    transporterOptions || {
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    },
  );

  return {
    sendMail: async (params: SendEmailParams): Promise<void> => {
      try {
        await transporter.sendMail({
          from: `"ExploreQ" ${EMAIL_FROM}`,
          to: params.to,
          subject: params.subject,
          html: params.html,
        });
        console.log('Email sent!');
      } catch (error) {
        console.log(error);
        throw new CustomError({
          status: 500,
          errorType: 'EMAIL_SEND_ERROR',
          message: 'Could not send email',
        });
      }
    },
  };
};
