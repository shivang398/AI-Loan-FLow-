import axios from 'axios';
import type { HeroFormData, EligibilityFormData, PartnerRegistrationData } from '../schemas/landingSchemas';

const CUSTOMER_SERVICE = 'http://localhost:8083';
const ELIGIBILITY_SERVICE = 'http://localhost:8085';

export async function captureLead(data: HeroFormData): Promise<{ success: boolean; leadId: string }> {
  try {
    const res = await axios.post(`${CUSTOMER_SERVICE}/api/leads/capture`, data, { timeout: 5000 });
    return res.data;
  } catch {
    console.log('Mock lead captured:', data);
    return { success: true, leadId: 'MOCK-' + Date.now() };
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
  try {
    const res = await axios.post(`${ELIGIBILITY_SERVICE}/api/eligibility/quick-check`, data, { timeout: 5000 });
    return res.data;
  } catch {
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
}

export async function registerPartner(data: PartnerRegistrationData): Promise<{ success: boolean; partnerId: string }> {
  try {
    const res = await axios.post(`${CUSTOMER_SERVICE}/api/partners/register`, data, { timeout: 5000 });
    return res.data;
  } catch {
    console.log('Mock partner registered:', data);
    return { success: true, partnerId: 'MOCK-' + Date.now() };
  }
}
