import { prisma } from '../../../../database/database';
import { Order } from '../../domain/entity/Order.entity';
import { Purchase } from '../../domain/entity/Purchase.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

export const OrderPrismaRepository: OrderRepository = {
  async createOrderWithPurchases(
    orderData: Order,
    purchaseDataArray: Omit<Purchase, "order_id">[],
  ): Promise<void> {
    await prisma.order.create({
      data: {
        ...orderData,
        purchases: {
          create: purchaseDataArray,
        },
      },
    });
  },
};
