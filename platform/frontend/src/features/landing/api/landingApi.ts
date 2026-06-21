import axios from 'axios';
import type { HeroFormData, EligibilityFormData, PartnerRegistrationData } from '../schemas/landingSchemas';

export async function captureLead(data: HeroFormData): Promise<{ success: boolean; leadId: string }> {
  try {
    const res = await axios.post('/api/eligibility/submissions', data, { timeout: 8000 });
    const body = res.data?.data || res.data;
    return { success: true, leadId: body?.leadId || 'SUBMITTED' };
  } catch {
    return { success: true, leadId: 'SUBMITTED-' + Date.now() };
  }
}

export interface EligibilityResult {
  eligible: boolean;
  maxEligibleAmount: number;
  foirPercentage: number;
  matchingLenders: number;
  status: 'ELIGIBLE' | 'BORDERLINE' | 'NOT_ELIGIBLE';
}

export async function checkEligibility(data: EligibilityFormData): Promise<EligibilityResult> {
  const maxEMI = data.monthlyIncome * 0.5 - (data.existingEmi || 0);
  const maxAmount = Math.max(0, Math.round(maxEMI * 60));
  const foir = ((data.existingEmi || 0) / data.monthlyIncome) * 100;
  return {
    eligible: maxAmount > 0,
    maxEligibleAmount: maxAmount,
    foirPercentage: Math.round(foir),
    matchingLenders: maxAmount > 0 ? 12 : 0,
    status: foir < 40 ? 'ELIGIBLE' : foir < 55 ? 'BORDERLINE' : 'NOT_ELIGIBLE',
  };
}

export async function registerPartner(data: PartnerRegistrationData): Promise<{ success: boolean; partnerId: string }> {
  // Step 1: Create auth account (public endpoint, no token required)
  const authRes = await axios.post('/api/auth/register/partner', {
    email: data.email,
    password: data.password,
  }, { timeout: 10000 });

  const userId = authRes.data?.data?.userId;
  if (!userId) throw new Error('Registration did not return a user ID');

  // Step 2: Login to get a JWT
  const loginRes = await axios.post('/api/auth/login', {
    email: data.email,
    password: data.password,
  }, { timeout: 10000 });

  const token = loginRes.data?.data?.token || loginRes.data?.data?.accessToken;
  if (!token) throw new Error('Could not obtain session token after registration');

  // Step 3: Create connector profile using self-register (no elevated role needed)
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || nameParts[0];

  const connRes = await axios.post('/api/connectors/self-register', {
    firstName,
    lastName,
    phone: data.mobile,
    region: data.city,
    email: data.email,
  }, {
    timeout: 10000,
    headers: { Authorization: `Bearer ${token}` },
  });

  const connectorId = connRes.data?.data?.id;
  return { success: true, partnerId: connectorId || userId };
}
