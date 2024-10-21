import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
