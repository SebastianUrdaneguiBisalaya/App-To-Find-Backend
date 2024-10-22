/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { StatusCodes } from '../../utils/constants';

export function validateData(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorData = error.flatten();
        res.status(StatusCodes.BAD_REQUEST).json({
          error: { message: 'Invalid data', details: errorData.fieldErrors },
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: { message: 'Internal Server Error' } });
      }
    }
  };
}
