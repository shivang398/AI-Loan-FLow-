import { z } from 'zod';

const ALLOWED_DOMAINS = ['realmoneygroups.in', 'realfinserv.com'];

const allowedDomainEmail = z
  .string()
  .email('Invalid email address')
  .refine(
    (email) => {
      const at = email.lastIndexOf('@');
      if (at < 0) return false;
      const domain = email.slice(at + 1).toLowerCase();
      return ALLOWED_DOMAINS.includes(domain);
    },
    { message: 'Only @realmoneygroups.in and @realfinserv.com email addresses are permitted' }
  );

const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const loginSchema = z.object({
  email: allowedDomainEmail,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: allowedDomainEmail,
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
