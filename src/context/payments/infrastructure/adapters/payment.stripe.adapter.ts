import Stripe from 'stripe';
import { config } from '../../../../config/config';
import { StripePaymentAdapter } from '../../application/interfaces/adapter';
import { OrderRequest } from '../../application/interfaces/request';

const { STRIPE_SECRET_KEY, BACKEND_URL } = config();

const stripe = new Stripe(STRIPE_SECRET_KEY);

const mapLineItems = (
  data: OrderRequest,
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  const lineItems = Object.values(
    data.purchases.reduce((acc: Record<string, Stripe.Checkout.SessionCreateParams.LineItem>, purchase) => {
      const { ticket_name, purchase_amount } = purchase;

      if (!acc[ticket_name]) {
        acc[ticket_name] = {
          price_data: {
            currency: 'PEN',
            product_data: {
              name: ticket_name,
            },
            unit_amount: purchase_amount,
          },
          quantity: 1,
        };
      } else {
        if (acc[ticket_name].quantity !== undefined) {
          acc[ticket_name].quantity += 1;
        } 
      }
      return acc;
    }, {}),
  );

  return lineItems;
  //   const lineItems = data.purchases.map((purchase) => {
  //     return {
  //       price_data: {
  //         currency: 'PEN',
  //         product_data: {
  //           name: purchase.purchase_id
  //         },
  //         unit_amount: purchase.purchase_amount
  //       },
  //       quantity: 1,
  //     }
  //   })
};

export const StripePayment: StripePaymentAdapter = {
  async createCheckoutSession(data: OrderRequest): Promise<{ url: string }> {
    const lineItems = mapLineItems(data);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${BACKEND_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BACKEND_URL}/payment/cancel`,
      metadata: {
        order: JSON.stringify(data),
      },
    });
    return { url: session.url as string };
  },

  async getSession(
    sessionId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  },
};
