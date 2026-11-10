// Hand-off from the hero's quick form to the full application form further down the page
export interface LoanPrefill { loanAmount: string; netMonthlySalary: string; profession: string; mobile: string }

const EVENT = 'rm:loan-prefill';

export const sendPrefill = (data: LoanPrefill) => window.dispatchEvent(new CustomEvent<LoanPrefill>(EVENT, { detail: data }));

export function onPrefill(handler: (data: LoanPrefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<LoanPrefill>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
