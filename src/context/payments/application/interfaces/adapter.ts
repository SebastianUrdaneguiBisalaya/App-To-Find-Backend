import Stripe from "stripe";
import { OrderRequest } from "./request";

export interface StripePaymentAdapter {
  createCheckoutSession(data: OrderRequest): Promise<{ url: string}>;
  getSession(sessionId: string): Promise<Stripe.Response<Stripe.Checkout.Session>> ;
}