import { OrderRequest } from '../interfaces/request';
import { StripePaymentAdapter } from '../interfaces/adapter';
import { mapCreateOrderToDB } from '../mapper/payment.mapper';
import { OrderRepository } from '../../domain/repositories/order.repository';

export const checkout = async (
  data: OrderRequest,
  paymentAdapter: StripePaymentAdapter,
  orderRepository: OrderRepository,
) => {
  const session = await paymentAdapter.createCheckoutSession(data);
  const { order, purchases } = mapCreateOrderToDB(data, 'PENDING');
  await orderRepository.createOrderWithPurchases(order, purchases);
  return { data: session };
};
