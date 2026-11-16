// Fictional CRIF response used when CRIF_LIVE_MODE is not 'true' (local development), so the full
// pull → store → PDF journey can be exercised without a paid bureau call. No real person's data.
export function mockCrifResponse(name: string, mobile: string): Record<string, unknown> {
  return {
    status: 'success',
    requestId: 'mock-0001',
    data: {
      request: {
        NAME: name.toUpperCase(),
        DOB: '15-08-1990',
        PAN: 'ABCDE1234F',
        GENDER: '',
        'EMAIL-1': 'sample.customer@example.test',
        'ADDRESS-1': '12 SAMPLE STREET, MANSAROVAR, JAIPUR 302020 RJ',
        'PHONE-1': mobile,
      },
      personalInfoVariation: {
        'ADDRESS-VARIATIONS': {
          VARIATION: [
            { VALUE: '12 SAMPLE STREET, MANSAROVAR, JAIPUR 302020 RJ', 'REPORTED-DATE': '31-10-2026' },
            { VALUE: '4 TEST COLONY, VAISHALI NAGAR, JAIPUR 302021 RJ', 'REPORTED-DATE': '31-03-2020' },
          ],
        },
      },
      accountsSummary: {
        'PRIMARY-ACCOUNTS-SUMMARY': {
          'PRIMARY-NUMBER-OF-ACCOUNTS': '4',
          'PRIMARY-ACTIVE-NUMBER-OF-ACCOUNTS': '2',
          'PRIMARY-OVERDUE-NUMBER-OF-ACCOUNTS': '0',
          'PRIMARY-CURRENT-BALANCE': '0',
          'PRIMARY-SANCTIONED-AMOUNT': '0',
          'PRIMARY-OVERDUE-AMOUNT': '0',
        },
      },
      inquiryHistory: { HISTORY: [{ 'MEMBER-NAME': 'Sample Bank', 'INQUIRY-DATE': '02-09-2026', AMOUNT: '300000', PURPOSE: 'Personal Loan' }] },
      responses: {
        RESPONSE: [
          { 'LOAN-DETAILS': {
            'ACCT-NUMBER': 'XXXXXXXX1201', 'CREDIT-GRANTOR-GROUP': 'Category D', 'ACCT-TYPE': 'Housing Loan',
            'DATE-REPORTED': '31-10-2026', 'OWNERSHIP-IND': 'Joint', 'ACCOUNT-STATUS': 'Active',
            'DISBURSED-AMT': '2500000', 'DISBURSED-DT': '31-01-2023', 'LAST-PAYMENT-DATE': '31-10-2026',
            'CURRENT-BAL': '2148274', 'OVERDUE-AMT': '0', 'INSTALLMENT-AMT': '23085/Monthly', 'INTEREST-RATE': '8.45',
            'REPAYMENT-TENURE': '180', 'SUIT-FILED-WILFUL-DEFAULT-STATUS': 'No Suit filed', 'WRITE-OFF-AMT': '0',
            'COMBINED-PAYMENT-HISTORY': 'Oct:2026,000/STD|Sep:2026,000/STD|Aug:2026,000/STD|Jul:2026,000/STD|Jun:2026,015/STD|May:2026,000/STD|Apr:2026,000/STD|Mar:2026,000/STD|Feb:2026,000/STD|Jan:2026,000/STD|Dec:2025,000/STD|Nov:2025,000/STD|Oct:2025,000/STD|Sep:2025,XXX/XXX|',
          } },
          { 'LOAN-DETAILS': {
            'ACCT-NUMBER': 'XXXXXXXX2235', 'CREDIT-GRANTOR-GROUP': 'Category D', 'ACCT-TYPE': 'Personal Loan',
            'DATE-REPORTED': '31-10-2026', 'OWNERSHIP-IND': 'Individual', 'ACCOUNT-STATUS': 'Active',
            'DISBURSED-AMT': '300000', 'DISBURSED-DT': '21-07-2025', 'LAST-PAYMENT-DATE': '20-10-2026',
            'CURRENT-BAL': '214000', 'OVERDUE-AMT': '0', 'INSTALLMENT-AMT': '9950/Monthly', 'INTEREST-RATE': '12.5',
            'REPAYMENT-TENURE': '36', 'WRITE-OFF-AMT': '0',
            'COMBINED-PAYMENT-HISTORY': 'Oct:2026,000/STD|Sep:2026,000/STD|Aug:2026,000/STD|Jul:2026,000/STD|',
          } },
          { 'LOAN-DETAILS': {
            'ACCT-NUMBER': 'XXXXXXXX0016', 'CREDIT-GRANTOR-GROUP': 'Category D', 'ACCT-TYPE': 'Two-Wheeler Loan',
            'DATE-REPORTED': '30-06-2018', 'OWNERSHIP-IND': 'Individual', 'ACCOUNT-STATUS': 'Closed',
            'DISBURSED-AMT': '34000', 'DISBURSED-DT': '23-05-2017', 'CLOSED-DATE': '13-06-2018', 'LAST-PAYMENT-DATE': '05-06-2018',
            'CURRENT-BAL': '0', 'OVERDUE-AMT': '0', 'REPAYMENT-TENURE': '12', 'LAST-PAID-AMOUNT': '36048', 'WRITE-OFF-AMT': '0',
          } },
          { 'LOAN-DETAILS': {
            'ACCT-NUMBER': 'XXXXXXXX0471', 'CREDIT-GRANTOR-GROUP': 'Category D', 'ACCT-TYPE': 'Credit Card',
            'DATE-REPORTED': '28-02-2023', 'OWNERSHIP-IND': 'Individual', 'ACCOUNT-STATUS': 'Closed',
            'DISBURSED-DT': '08-01-2020', 'CLOSED-DATE': '06-02-2023', 'CREDIT-LIMIT': '100000',
            'CURRENT-BAL': '0', 'OVERDUE-AMT': '0', 'WRITE-OFF-AMT': '0',
          } },
        ],
      },
      scores: { SCORE: { 'SCORE-TYPE': 'PERFORM CONSUMER 2.2', 'SCORE-VALUE': '742' } },
    },
  };
}
