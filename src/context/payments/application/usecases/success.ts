import { OrderRequest } from './../interfaces/request';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { StripePaymentAdapter } from '../interfaces/adapter';
import { mapCreateOrderToDB } from '../mapper/payment.mapper';


export const success= async ( 
    sessionId: string,
    paymentAdapter: StripePaymentAdapter,
    orderRepository:  OrderRepository
) => {
    const session = await paymentAdapter.getSession(sessionId)   
    if(session?.metadata?.order){
        const orderData = JSON.parse(session.metadata.order) as OrderRequest
        const { order, purchases } = mapCreateOrderToDB(orderData, 'SUCCESS')
        await orderRepository.createOrderWithPurchases(order, purchases)
        return;
    }
    throw new Error('Order not found')    
}