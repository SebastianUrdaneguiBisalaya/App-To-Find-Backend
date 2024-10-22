import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(1).email(),
  password: z.string().min(6).max(12),
});

export type SignUpRequest = z.infer<typeof SignUpSchema>;
