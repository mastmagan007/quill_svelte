import { z } from "zod";
export const formSchema = z.object({
    username: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(64, { message: 'Name must be less than 64 characters' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(32, { message: 'Password must be less than 32 characters' })
    .trim(),
});
export type FormSchema = typeof formSchema;