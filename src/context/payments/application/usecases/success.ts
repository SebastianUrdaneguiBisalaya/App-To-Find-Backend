import { OrderRepository } from '../../domain/repositories/order.repository';
import { StripePaymentAdapter } from '../interfaces/adapter';

export const success= async ( 
    sessionId: string,
    paymentAdapter: StripePaymentAdapter,
    orderRepository:  OrderRepository
) => {
    const session = await paymentAdapter.getSession(sessionId)   
    if(session?.metadata?.order){
        const orderData = JSON.parse(session.metadata.order)       
        await orderRepository.update(orderData.order_id, {order_state: 'SUCCESS'})
        return;
    }
    throw new Error('Order not found')    
}