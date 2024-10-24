import { StripePaymentAdapter } from './../application/interfaces/adapter';
import { OrderRepository } from '../domain/repositories/order.repository';
import { StripePayment } from './adapters/payment.stripe.adapter';
import { OrderPrismaRepository } from './repositories/order.prisma.repository';

interface Dependencies {
  orderRepository: OrderRepository;
  paymentAdapter: StripePaymentAdapter;
}

export const createDependencies = (): Dependencies => {
  return {
    orderRepository: OrderPrismaRepository,
    paymentAdapter: StripePayment,
  };
};
