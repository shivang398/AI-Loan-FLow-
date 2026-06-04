import { z } from 'zod';

const indianMobile = /^[6-9]\d{9}$/;

const ALLOWED_DOMAINS = ['realmoneygroups.in', 'realfinserv.com'];

const allowedDomainEmail = z
  .string()
  .email('Enter a valid email address')
  .refine(
    (email) => {
      const at = email.lastIndexOf('@');
      if (at < 0) return false;
      return ALLOWED_DOMAINS.includes(email.slice(at + 1).toLowerCase());
    },
    { message: 'Only @realmoneygroups.in and @realfinserv.com email addresses are permitted' }
  );

export const heroFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().regex(indianMobile, 'Enter a valid 10-digit Indian mobile number'),
  loanType: z.string().min(1, 'Please select a loan type'),
  loanAmount: z
    .number({ invalid_type_error: 'Enter a valid amount' })
    .min(50000, 'Minimum loan amount is ₹50,000')
    .max(100000000, 'Maximum loan amount is ₹10 Cr'),
  consent: z.boolean().refine((v) => v === true, 'You must agree to be contacted'),
});

export type HeroFormData = z.infer<typeof heroFormSchema>;

export const eligibilitySchema = z.object({
  loanType: z.string().min(1, 'Please select a loan type'),
  loanAmount: z.number().min(50000).max(100000000),
  monthlyIncome: z.number().min(15000, 'Minimum income ₹15,000').max(10000000),
  employmentType: z.enum(['SALARIED', 'SELF_EMPLOYED']),
  existingEmi: z.number().min(0).max(10000000),
});

export type EligibilityFormData = z.infer<typeof eligibilitySchema>;

export const partnerRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: allowedDomainEmail,
  mobile: z.string().regex(indianMobile, 'Enter a valid 10-digit Indian mobile number'),
  businessName: z.string().min(2, 'Business name required'),
  city: z.string().min(2, 'City required'),
  yearsOfExperience: z
    .number({ invalid_type_error: 'Enter years of experience' })
    .min(0)
    .max(50),
  interestedProducts: z.array(z.string()).min(1, 'Select at least one product'),
  message: z.string().max(500).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type PartnerRegistrationData = z.infer<typeof partnerRegistrationSchema>;
