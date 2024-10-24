import { z } from "zod";

const purchaseSchema = z.object({
    purchase_id: z.string(),
    ticket_id: z.string(),
    purchase_amount: z.number(),
  });
  
export const OrderSchema = z.object({
    order_id: z.string(),
    event_id: z.string(),
    user_id: z.string(),
    total_amount: z.number(),
    purchases: z.array(purchaseSchema),
});

