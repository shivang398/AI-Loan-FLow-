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

export const loginSchema = z.object({
  email: allowedDomainEmail,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: allowedDomainEmail,
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
