import { Request, Response } from 'express';
import { createDependencies } from './infrastructure/dependency.provider';
import * as PaymentService from './application';
import { StatusCodes } from '../../utils/constants';
import { config } from '../../config/config';

const { FRONTEND_URL} = config()
const { orderRepository, paymentAdapter } = createDependencies();

export const checkout = async (req: Request, res: Response) => {
  const response = await PaymentService.checkout(req.body, paymentAdapter);
  res.status(StatusCodes.OK).json(response);
};


export const success = async (req: Request, res: Response) => {
  const { session_id } = req.query;
  await PaymentService.success(session_id as string, paymentAdapter, orderRepository)
  res.redirect(`${FRONTEND_URL}/success`);
};

export const cancel = async (req: Request, res: Response) => {
  res.redirect(`${FRONTEND_URL}/cancel`);
};

