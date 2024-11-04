import {
  EncryptAdapter,
  JWTAdapter,
  MailerAdapter,
} from '../interfaces/adapters';
import { SignUpResponse } from '../interfaces/response';
import { mapUserToDB } from '../mapper';
import { UserRepository } from '../../domain/user.repository';
import { SignUpRequest } from '../../schema';
import { StatusCodes } from '../../../../utils/constants';
import { CustomError } from '../../../../shared/error/CustomError';
import { config } from '../../../../config/config';

const { FRONTEND_URL } = config();

const signUp = async (
  data: SignUpRequest,
  userRepository: UserRepository,
  bcryptAdapter: EncryptAdapter,
  jwtAdapter: JWTAdapter,
  mailerService: MailerAdapter,
): Promise<SignUpResponse> => {
  const existEmail = await userRepository.findUserByEmail(data.email);
  if (existEmail) {
    throw new CustomError({
      status: StatusCodes.BAD_REQUEST,
      errorType: 'BadRequestError',
      message: 'Email already exists',
    });
  }
  const hashedPassword = await bcryptAdapter.hash(data.password);
  const user = await userRepository.create(mapUserToDB(data, hashedPassword));
  const token = jwtAdapter.generateToken({ email: user.user_email });

  await mailerService?.sendMail({
    to: user.user_email,
    subject: 'Welcome to ExploryQ platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="background-color: #761CBC; color: white; padding: 10px; text-align: center;">¡Bienvenido a ExploryQ!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Hola,
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Gracias por registrarte en <strong>ExploryQ</strong>. Para activar tu cuenta, simplemente haz clic en el siguiente enlace:
        </p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${FRONTEND_URL}/verified/${token}" style="background-color: #761CBC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verificar cuenta</a>
        </p>
        <p style="font-size: 14px; line-height: 1.5;">
          Si no solicitaste este correo, puedes ignorarlo.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Saludos,<br>
          <strong>El equipo de ExploryQ</strong>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          © 2024 ExploryQ. Todos los derechos reservados.
        </p>
      </div>
      `,
  });
  const response = {
    id: user.user_id,
    email: user.user_email,
  };
  return response;
};

export default signUp;
