import { TokenExpiredError } from 'jsonwebtoken';
import { JWTAdapter } from '../interfaces/adapters';
import { DecodedToken } from '../interfaces/decodeToken';
import { VerifyAccountRequest } from '../../schema';
import { UserRepository } from '../../domain/user.repository';
import { StatusCodes } from '../../../../utils/constants';
import { CustomError } from '../../../../shared/error/CustomError';

const verifyAccount = async (
  data: VerifyAccountRequest,
  userRepository: UserRepository,
  jwtAdapter: JWTAdapter,
): Promise<{ message: string }> => {
  try {
    const decodedToken = jwtAdapter.verifyToken(
      data.token,
    ) as unknown as DecodedToken;

    const user = await userRepository.findUserByEmail(decodedToken.email);

    if (!user) {
      throw new CustomError({
        status: StatusCodes.NOT_FOUND,
        errorType: 'NotFoundError',
        message: 'User not found',
      });
    }

    if (user.verified) {
      throw new CustomError({
        status: StatusCodes.BAD_REQUEST,
        errorType: 'BadRequestError',
        message: 'Email is already verified',
      });
    }

    await userRepository.update(user.user_id, { verified: true });
    const response = { message: 'Email was successfully verified' };
    return response;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new CustomError({
        status: StatusCodes.UNAUTHORIZED,
        errorType: 'BadRequestError',
        message: 'Token is invalid',
      });
    }
    throw error;
  }
};

export default verifyAccount;
