import { z } from "zod";
import { OrderSchema } from "../../schema/Order.schema";

export type OrderRequest = z.infer<typeof OrderSchema>;