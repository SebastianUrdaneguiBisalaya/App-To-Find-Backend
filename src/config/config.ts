import dotenv from 'dotenv';

dotenv.config();

export const config = () => ({
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'test',
  SALT_ROUNDS: process.env.SALT_ROUNDS || '10',
  BREVO_EMAIL_FROM: process.env.BREVO_EMAIL_FROM || '',
  BREVO_SMTP_HOST: process.env.BREVO_SMTP_HOST || '',
  BREVO_SMTP_PASS: process.env.BREVO_SMTP_PASS || '',
  BREVO_SMTP_PORT: process.env.BREVO_SMTP_PORT || '587',
  BREVO_SMTP_USER: process.env.BREVO_SMTP_USER || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
});
