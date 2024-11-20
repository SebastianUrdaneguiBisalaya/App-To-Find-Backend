
import { Order } from "../entity/Order.entity";
import { Purchase } from "../entity/Purchase.entity";

export interface OrderRepository {
    createOrderWithPurchases(orderData: Order, purchaseDataArray: Omit<Purchase, "order_id">[]): Promise<void>;
    update(orderId: string, orderData: Partial<Order>): Promise<void>;
}