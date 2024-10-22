import { Request, Response } from 'express';
import * as authService from './application';
import { createDependencies } from './infrastructure/dependency.provider';
import { LoginRequest, SignUpRequest } from './schema';
import { StatusCodes } from '../../utils/constants';

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
  res
    .status(StatusCodes.OK)
    .cookie('token', response.token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    })
    .json({ data: response.user });
};

export const verifyAccount = async (req: Request, res: Response) => {
  const data = req.body;
  const response = await authService.verifyAccount(
    data,
    userRepository,
    jwtAdapter(),
  );
  res.status(StatusCodes.OK).json({ data: response });
};
