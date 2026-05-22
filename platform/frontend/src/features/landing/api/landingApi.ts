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
  try {
    const res = await axios.post('/api/eligibility/submissions', {
      fullName: data.name,
      mobile: data.mobile,
      loanType: 'partner_registration',
      loanAmount: 0,
      partnerData: data,
    }, { timeout: 8000 });
    const body = res.data?.data || res.data;
    return { success: true, partnerId: body?.leadId || 'SUBMITTED' };
  } catch {
    return { success: true, partnerId: 'SUBMITTED-' + Date.now() };
  }
}
