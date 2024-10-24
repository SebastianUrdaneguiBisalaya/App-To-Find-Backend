import { Order } from '../../domain/entity/Order.entity';
import { Purchase } from '../../domain/entity/Purchase.entity';
import { OrderRequest } from '../interfaces/request';

export const mapCreateOrderToDB = (
  data: OrderRequest,
  status: string,
): { order: Order, purchases: Omit<Purchase, "order_id">[] } => {
  const order = {
    order_id: data.order_id,
    order_date: new Date(),
    order_state: status,
    user_id: data.user_id,
    event_id: data.event_id,
  };

  const purchases = data.purchases.map((purchase) => {
    return {
      purchase_id: purchase.purchase_id,
      user_id: data.user_id,
      purchase_amount: purchase.purchase_amount,
      ticket_id: purchase.ticket_id,
      bar_code: purchase.purchase_id,
      purchase_quantity: 1,
    };
  });

  return { order, purchases };
};

