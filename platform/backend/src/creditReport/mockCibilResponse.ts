// Fictional Tenacio cibil-soft-pull reply (CCR layout) used when CRIF_LIVE_MODE is not 'true', so the
// pull → store → PDF journey runs locally without a paid bureau call. No real person's data.

function history(months: number, late: Record<number, string> = {}) {
  const out: Array<Record<string, string>> = [];
  const d = new Date();
  for (let i = 0; i < months; i++) {
    const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const key = `${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getFullYear()).slice(2)}`;
    out.push({ key, PaymentStatus: late[i] ?? '000', SuitFiledStatus: '*', AssetClassificationStatus: '*' });
  }
  return out;
}

export function mockCibilResponse(name: string, mobile: string, pan?: string | null): Record<string, unknown> {
  return {
    status: 'success',
    requestId: 'mock-cibil-0001',
    data: {
      InquiryResponseHeader: { Date: new Date().toISOString().slice(0, 10), ReportOrderNO: 'MOCK-CIBIL-0001' },
      CCRResponse: {
        CIRReportDataLst: [{
          CIRReportData: {
            IDAndContactInfo: {
              PersonalInfo: { Name: { FullName: name.toUpperCase() }, DateOfBirth: '1990-08-15', Gender: 'Male' },
              IdentityInfo: { PANId: [{ IdNumber: pan || 'ABCDE1234F' }] },
              AddressInfo: [
                { Address: '12 SAMPLE STREET MANSAROVAR JAIPUR', State: 'RJ', Postal: '302020', ReportedDate: '2026-10-31' },
                { Address: '4 TEST COLONY VAISHALI NAGAR JAIPUR', State: 'RJ', Postal: '302021', ReportedDate: '2020-03-31' },
              ],
              PhoneInfo: [{ typeCode: 'M', Number: mobile }],
              EmailAddressInfo: [{ EmailAddress: 'SAMPLE.CUSTOMER@EXAMPLE.TEST' }],
            },
            ScoreDetails: [{
              Type: 'ERS', Version: '4.0', Name: 'CIBIL TRANSUNION SCORE VERSION 3.0', Value: '742',
              ScoringElements: [{ type: 'RES', seq: '1', code: '502', Description: 'Overdue Amount' }],
            }],
            RetailAccountsSummary: {
              NoOfAccounts: '3', NoOfActiveAccounts: '2', NoOfWriteOffs: '0', TotalPastDue: '0.00',
              MostSevereStatusWithIn24Months: '30+', SingleHighestCredit: '100000', SingleHighestSanctionAmount: '2500000',
              TotalHighCredit: '100000', AverageOpenBalance: '1181137', SingleHighestBalance: '2148274',
              NoOfPastDueAccounts: '0', NoOfZeroBalanceAccounts: '1', RecentAccount: 'Personal Loan on 21-07-2025',
              OldestAccount: 'Credit Card on 08-01-2020', TotalBalanceAmount: '2362274', TotalSanctionAmount: '2800000',
              TotalCreditLimit: '100000', TotalMonthlyPaymentAmount: '33035',
            },
            RetailAccountDetails: [
              { seq: '1', AccountNumber: 'XXXXXXXX1201', Institution: 'SAMPLE HOUSING FINANCE LTD', AccountType: 'Housing Loan',
                OwnershipType: 'Joint Account', Balance: '2148274', PastDueAmount: '0', Open: 'Yes', SanctionAmount: '2500000',
                LastPaymentDate: '2026-10-31', DateReported: '2026-10-31', DateOpened: '2023-01-31', AccountStatus: 'Current Account',
                InstallmentAmount: '23085', RepaymentTenure: '180', InterestRate: '8.45', TermFrequency: 'Monthly',
                History48Months: history(24, { 4: '01+' }) },
              { seq: '2', AccountNumber: 'XXXXXXXX2235', Institution: 'SAMPLE BANK LTD', AccountType: 'Personal Loan',
                OwnershipType: 'Individual', Balance: '214000', PastDueAmount: '0', Open: 'Yes', SanctionAmount: '300000',
                LastPaymentDate: '2026-10-20', DateReported: '2026-10-31', DateOpened: '2025-07-21', AccountStatus: 'Current Account',
                InstallmentAmount: '9950', RepaymentTenure: '36', InterestRate: '12.5', TermFrequency: 'Monthly',
                History48Months: history(15) },
              { seq: '3', AccountNumber: 'XXXXXXXX0471', Institution: 'SAMPLE CARD BANK LTD', AccountType: 'Credit Card',
                OwnershipType: 'Individual', Balance: '0', PastDueAmount: '0', Open: 'No', CreditLimit: '100000', HighCredit: '100000',
                DateReported: '2023-02-28', DateOpened: '2020-01-08', DateClosed: '2023-02-06', AccountStatus: 'Closed Account',
                History48Months: history(14, { 7: '30+' }) },
            ],
            Enquiries: [{ seq: '1', Institution: 'SAMPLE BANK LTD', Date: '2026-09-02', RequestPurpose: 'Personal Loan', Amount: '300000' }],
          },
        }],
      },
    },
  };
}
