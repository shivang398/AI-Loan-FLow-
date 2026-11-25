// Fictional Tenacio cibil-soft-pull reply in the TrueLink layout Tenacio actually sends (structure copied
// from a live reply, 2026-11-25; every value invented). Used when CRIF_LIVE_MODE is not 'true'.

const sym = (symbol: string) => ({ symbol, description: '', rank: '999999', abbreviation: '' });
const tz = (iso: string) => `${iso}+05:30`;

function months(count: number, late: Record<number, string> = {}) {
  const out: Array<{ date: string; status: string }> = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 0));
    out.push({ date: tz(end.toISOString().slice(0, 10)), status: late[i] ?? '0' });
  }
  return out;
}

function tradeline(o: {
  type: string; lender: string; number: string; ownership: string; opened: string; closed?: string; high: string; balance: string;
  emi: string; rate: string; term: string; pastDue: string; history: Array<{ date: string; status: string }>;
}) {
  return {
    accountTypeAbbreviation: '', accountTypeDescription: '', accountTypeSymbol: o.type,
    Tradeline: {
      creditorName: o.lender, highBalance: o.high, currentBalance: o.balance, dateOpened: tz(o.opened),
      ...(o.closed ? { dateClosed: tz(o.closed) } : {}),
      dateReported: tz('2026-10-31'), writtenOffAmtTotal: '-1', AccountDesignator: sym(o.ownership), accountNumber: o.number,
      AccountCondition: sym(''), OpenClosed: sym(''), settlementAmount: '-1', writtenOffPrincipal: '-1',
      GrantedTrade: {
        interestRate: o.rate, PaymentFrequency: sym('03'), EMIAmount: o.emi, CashLimit: '-1', AccountType: sym(o.type),
        CreditType: sym(o.type), actualPaymentAmount: '-1', termMonths: o.term, CreditLimit: '-1', amountPastDue: o.pastDue,
        PayStatusHistory: { MonthlyPayStatus: o.history, status: o.history.map((m) => m.status).join(',') },
      },
    },
  };
}

export function mockTrueLinkResponse(name: string, mobile: string, pan?: string | null): Record<string, unknown> {
  return {
    status: 'success', requestId: 'mock-cibil-truelink-0001', type: 'point', serviceStatusCode: 200,
    data: {
      cibilData: {
        GetCustomerAssetsResponse: {
          ResponseStatus: 'Success',
          GetCustomerAssetsSuccess: {
            CreditSummaryData: { OldestCreditAccountPeriod: '96', Inquires: '3', OnTimePaymentHistory: '97.50', CreditCardUtilization: '24.10', CreditMix: '50.00' },
            Asset: {
              Status: 'Active', CreationDate: '2026-11-25T18:38:13.000+05:30', AssetId: '10000000001',
              TrueLinkCreditReport: {
                currentversion: '5.0',
                Borrower: {
                  Birth: { date: tz('1990-08-15') },
                  BorrowerName: { Name: { Forename: name.toUpperCase() } },
                  Gender: 'Female',
                  CreditScore: {
                    riskScore: '742', scoreName: 'CIBILTransUnionScore3', CreditScoreModel: sym('CIBILTUSC3'),
                    CreditScoreFactor: [
                      { bureauCode: '32', Factor: sym('32'), FactorText: ['Your recent payments have been on time, which supports your score.'] },
                      { bureauCode: '04', Factor: sym('04'), FactorText: ['High utilisation on your credit card lowers your score.'] },
                    ],
                  },
                  BorrowerAddress: [
                    { dateReported: tz('2026-10-31'), CreditAddress: { StreetAddress: '12 SAMPLE STREET MANSAROVAR JAIPUR', City: '', PostalCode: '302020', Region: '08' } },
                    { dateReported: tz('2020-03-31'), CreditAddress: { StreetAddress: '4 TEST COLONY VAISHALI NAGAR JAIPUR', City: '', PostalCode: '302021', Region: '08' } },
                  ],
                  BorrowerTelephone: [{ PhoneNumber: { Number: mobile }, PhoneType: sym('01') }],
                  EmailAddress: [{ Email: 'SAMPLE.CUSTOMER@EXAMPLE.TEST' }],
                  IdentifierPartition: { Identifier: [{ ID: { Id: pan || 'ABCDE1234F', IdentifierName: 'TaxId' } }] },
                },
                TradeLinePartition: [
                  tradeline({ type: '05', lender: 'SAMPLE BANK', number: 'XXXXXXXX2235', ownership: '1', opened: '2025-07-21', high: '300000', balance: '214000', emi: '9950', rate: '12.50', term: '36', pastDue: '0', history: months(16) }),
                  tradeline({ type: '02', lender: 'TEST HOUSING', number: 'XXXXXXXX1201', ownership: '4', opened: '2023-01-31', high: '2540000', balance: '2148274', emi: '23085', rate: '8.45', term: '180', pastDue: '0', history: months(36, { 4: '15' }) }),
                  tradeline({ type: '10', lender: 'DEMO CARD CO', number: 'XXXXXXXX0471', ownership: '1', opened: '2020-01-08', high: '100000', balance: '24100', emi: '-1', rate: '-1.00', term: '-1', pastDue: '0', history: months(12) }),
                  tradeline({ type: '13', lender: 'SAMPLE FINANCE', number: 'XXXXXXXX8942', ownership: '1', opened: '2017-05-23', closed: '2018-06-13', high: '34000', balance: '0', emi: '-1', rate: '-1.00', term: '12', pastDue: '0', history: [] }),
                ],
                InquiryPartition: [
                  { Inquiry: { amount: '300000', inquiryType: '05', subscriberName: 'SAMPLE BANK', inquiryDate: tz('2026-09-02') } },
                ],
              },
            },
          },
        },
      },
      htmlUrl: null,
    },
  };
}
