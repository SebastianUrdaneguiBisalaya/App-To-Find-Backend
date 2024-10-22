import { config } from '../../../config/config';
import { UserRepository } from '../domain/user.repository';
import {
  EncryptAdapter,
  JWTAdapter,
  MailerAdapter,
} from '../application/interfaces/adapters';
import { createMailerAdapter } from './adapters';
import { createBcryptAdapter } from './adapters/bcryptAdapter';
import { createJWTAdapter } from './adapters/jwtAdapter';
import { userPrismaRepository } from './repositories/user.prisma.repository';

interface Dependencies {
  userRepository: UserRepository;
  bcryptAdapter: EncryptAdapter;
  jwtAdapter: (expireIn?: string) => JWTAdapter;
  mailerService: MailerAdapter;
}

const {
  JWT_SECRET,
  SALT_ROUNDS,
  BREVO_EMAIL_FROM,
  BREVO_SMTP_HOST,
  BREVO_SMTP_PASS,
  BREVO_SMTP_PORT,
  BREVO_SMTP_USER,
} = config();

const configMailer = {
  SMTP_HOST: BREVO_SMTP_HOST,
  SMTP_PORT: BREVO_SMTP_PORT,
  SMTP_USER: BREVO_SMTP_USER,
  SMTP_PASS: BREVO_SMTP_PASS,
  EMAIL_FROM: BREVO_EMAIL_FROM,
};

export const createDependencies = (): Dependencies => {
  const bcryptAdapter = createBcryptAdapter(+SALT_ROUNDS);
  const mailerService = createMailerAdapter(configMailer);
  const jwtAdapter = (expireIn = '1h') =>
    createJWTAdapter(JWT_SECRET, expireIn);

  return {
    userRepository: userPrismaRepository,
    bcryptAdapter,
    jwtAdapter,
    mailerService,
  };
};
