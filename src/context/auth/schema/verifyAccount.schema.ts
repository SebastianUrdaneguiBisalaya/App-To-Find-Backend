import { z } from 'zod';

export const VerifyAccountSchema = z.object({
  token: z.string().min(1),
});

export type VerifyAccountRequest = z.infer<typeof VerifyAccountSchema>;
