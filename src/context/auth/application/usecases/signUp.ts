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
    subject: 'Welcome to our platform',
    html: `<h1>Welcome ${user.user_email}</h1>
        <p>Thanks for joining our platform your token ${token}</p> 
        Link: <a href="${FRONTEND_URL}/auth/verify/${token}">Verify your account</a>
      `,
  });
  const response = {
    id: user.user_id,
    email: user.user_email,
  };
  return response;
};

export default signUp;
