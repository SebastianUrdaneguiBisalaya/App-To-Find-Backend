export interface EncryptAdapter {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export interface JWTAdapter {
  generateToken(payload: object): string;
  verifyToken(token: string): object | string;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export interface ConfigMailer {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  EMAIL_FROM: string;
}
export interface MailerAdapter {
  sendMail(paramas: SendEmailParams): Promise<void>;
}
