import { z } from 'zod';
import { Role } from '../entities/user.entity';
export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username must contain only letters, numbers, and underscores',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(15, { message: 'Password must be at most 15 characters long' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain a special character',
    }),
  role: z.nativeEnum(Role).default(Role.OBSERVER),
});

export type signUpDto = z.infer<typeof signUpSchema>;

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(15, { message: 'Password must be at most 15 characters long' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain a special character',
    }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
