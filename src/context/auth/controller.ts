import { Request, Response } from 'express';
import * as authService from './application';
import { createDependencies } from './infrastructure/dependency.provider';
import { LoginRequest, SignUpRequest } from './schema';
import { StatusCodes } from '../../utils/constants';
import { config } from '../../config/config';

const { NODE_ENV, FRONTEND_URL } = config();

const { userRepository, bcryptAdapter, jwtAdapter, mailerService } =
  createDependencies();

export const signUp = async (req: Request, res: Response) => {
  const data = req.body as SignUpRequest;
  const response = await authService.signUp(
    data,
    userRepository,
    bcryptAdapter,
    jwtAdapter('4h'),
    mailerService,
  );
  res.status(StatusCodes.CREATED).json({ data: response });
};

export const login = async (req: Request, res: Response) => {
  const data = req.body as LoginRequest;
  const response = await authService.login(
    data,
    userRepository,
    bcryptAdapter,
    jwtAdapter('1h'),
  );
  res.cookie('token', response.token, {
    httpOnly: true,
    secure: NODE_ENV === 'prod',
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: 'strict',
  });
  res.status(StatusCodes.OK).json({ data: response.user });
};

export const verifyAccount = async (req: Request, res: Response) => {
  const { token: data } = req.params;
  if (typeof data !== 'string') {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid token format. Token must be a string.' });
    return;
  }
  await authService.verifyAccount(data, userRepository, jwtAdapter());
  res.redirect(`${FRONTEND_URL}/verified`);
};

export const logOut = async (_req: Request, res: Response) => {
  res.clearCookie('token');
  res
    .status(StatusCodes.OK)
    .json({ data: { message: 'Logged out successfully' } });
};
