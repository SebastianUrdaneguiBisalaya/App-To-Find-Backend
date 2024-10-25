import { NextFunction, Response, Request } from 'express';
import { CustomError } from '../error/CustomError';
import { StatusCodes } from '../../utils/constants';
import { createDependencies } from '../../context/auth/infrastructure/dependency.provider';

const { jwtAdapter } = createDependencies();

export const authorizationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomError({
      status: StatusCodes.UNAUTHORIZED,
      errorType: 'UnauthorizedError',
      message: 'Not Authorized',
    });
  }

  try {
    const decoded = jwtAdapter().verifyToken(token);
    if (!decoded) {
      throw new CustomError({
        status: StatusCodes.UNAUTHORIZED,
        errorType: 'UnauthorizedError',
        message: 'Not Authorized',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new CustomError({
      status: StatusCodes.UNAUTHORIZED,
      errorType: 'UnauthorizedError',
      message: `Token is invalid.${error.message}`,
    });
  }
  next();
};
