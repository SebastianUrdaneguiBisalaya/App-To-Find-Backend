import { EncryptAdapter, JWTAdapter } from '../interfaces/adapters';
import { LoginResponse } from '../interfaces/response';
import { UserRepository } from '../../domain/user.repository';
import { LoginRequest } from '../../schema';
import { StatusCodes } from '../../../../utils/constants';
import { CustomError } from '../../../../shared/error/CustomError';

const login = async (
  data: LoginRequest,
  userRepository: UserRepository,
  bcryptAdapter: EncryptAdapter,
  jwtAdapter: JWTAdapter,
): Promise<LoginResponse> => {
  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    throw new CustomError({
      status: StatusCodes.UNAUTHORIZED,
      errorType: 'BadRequestError',
      message: 'Email or password incorrect',
    });
  }

  const validatePassword = await bcryptAdapter.compare(
    data.password,
    user.user_password,
  );

  if (!validatePassword) {
    throw new CustomError({
      status: StatusCodes.UNAUTHORIZED,
      errorType: 'BadRequestError',
      message: 'Email or password incorrect',
    });
  }

  // if (!user.verified) {
  //   throw new CustomError({
  //     status: StatusCodes.UNAUTHORIZED,
  //     errorType: 'BadRequestError',
  //     message: 'Email not verified',
  //   });
  // }

  const token = jwtAdapter.generateToken({
    id: user.user_id,
    email: user.user_email,
  });

  const response = {
    user: { id: user.user_id, email: user.user_email },
    token,
  };
  return response;
};

export default login;
