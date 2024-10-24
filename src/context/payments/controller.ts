import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export const checkout = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Example product',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Example product',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url:
      'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: {
      customData: JSON.stringify({
        id: 'cs_test_a1GIhROQKz1i7JFEq6J2fr66GeYswvFt1Br2XEYUbGnvZxYxkLV1tHgaNT',
        object: 'checkout.session',
        livemode: false,
        payment_intent: 'pi_3QDExvFa8J1H48831wNMRW6Z',
        status: 'complete',
      }),
    },
  });

  console.log(session);
};

export const success = async (req: Request, res: Response) => {
  const { session_id } = req.query;
  console.log(session_id, 'SESSION ID');
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const customData = JSON.parse(session.metadata.customData);
  console.log(customData);
  res.redirect("http://localhost:5173/success");
};
