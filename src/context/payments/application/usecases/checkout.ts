import { OrderRequest } from "../interfaces/request";
import { StripePaymentAdapter } from "../interfaces/adapter";

export const checkout = async ( 
    data: OrderRequest,
    paymentAdapter: StripePaymentAdapter
) => {
    const session = await paymentAdapter.createCheckoutSession(data)   
    return { data : session }
}