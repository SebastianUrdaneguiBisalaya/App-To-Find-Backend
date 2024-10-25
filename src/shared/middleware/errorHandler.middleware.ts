/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../error/CustomError';
import { StatusCodes } from '../../utils/constants';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err)
  if (err instanceof CustomError) {
    res.status(err.status).json({ error: { message: err.message } });
    return;
  }
  if (
    err.name === 'PrismaClientInitializationError' ||
    err.name === 'PrismaClientKnownRequestError'
  ) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { message: 'Something went wrong' } });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: err.message } });
};
