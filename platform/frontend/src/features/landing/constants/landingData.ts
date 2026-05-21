export type LenderCategory = 'Public Banks' | 'Private Banks' | 'SFBs' | 'NBFCs' | 'HFCs';

export interface Lender {
  name: string;
  category: LenderCategory;
}

export const LENDERS: Lender[] = [
  // Public Sector Banks
  { name: 'SBI', category: 'Public Banks' },
  { name: 'PNB', category: 'Public Banks' },
  { name: 'Bank of Baroda', category: 'Public Banks' },
  { name: 'Canara Bank', category: 'Public Banks' },
  { name: 'Union Bank of India', category: 'Public Banks' },
  { name: 'Bank of India', category: 'Public Banks' },
  { name: 'Indian Bank', category: 'Public Banks' },
  { name: 'UCO Bank', category: 'Public Banks' },
  // Private Banks
  { name: 'HDFC Bank', category: 'Private Banks' },
  { name: 'ICICI Bank', category: 'Private Banks' },
  { name: 'Axis Bank', category: 'Private Banks' },
  { name: 'Kotak Mahindra Bank', category: 'Private Banks' },
  { name: 'IndusInd Bank', category: 'Private Banks' },
  { name: 'Yes Bank', category: 'Private Banks' },
  { name: 'IDFC First Bank', category: 'Private Banks' },
  { name: 'RBL Bank', category: 'Private Banks' },
  { name: 'Federal Bank', category: 'Private Banks' },
  // SFBs
  { name: 'AU Small Finance Bank', category: 'SFBs' },
  { name: 'Equitas SFB', category: 'SFBs' },
  { name: 'Suryoday SFB', category: 'SFBs' },
  { name: 'Ujjivan SFB', category: 'SFBs' },
  { name: 'Jana SFB', category: 'SFBs' },
  // NBFCs
  { name: 'Bajaj Finserv', category: 'NBFCs' },
  { name: 'Tata Capital', category: 'NBFCs' },
  { name: 'Aditya Birla Finance', category: 'NBFCs' },
  { name: 'L&T Finance', category: 'NBFCs' },
  { name: 'Mahindra Finance', category: 'NBFCs' },
  { name: 'Cholamandalam Finance', category: 'NBFCs' },
  { name: 'Shriram Finance', category: 'NBFCs' },
  { name: 'Muthoot Finance', category: 'NBFCs' },
  { name: 'Manappuram Finance', category: 'NBFCs' },
  { name: 'Piramal Capital', category: 'NBFCs' },
  { name: 'Fullerton India', category: 'NBFCs' },
  { name: 'Hero FinCorp', category: 'NBFCs' },
  { name: 'Poonawalla Fincorp', category: 'NBFCs' },
  { name: 'IIFL Finance', category: 'NBFCs' },
  { name: 'Lendingkart', category: 'NBFCs' },
  { name: 'Jio Finance', category: 'NBFCs' },
  // HFCs
  { name: 'LIC Housing Finance', category: 'HFCs' },
  { name: 'PNB Housing Finance', category: 'HFCs' },
  { name: 'Bajaj Housing Finance', category: 'HFCs' },
  { name: 'ICICI Home Finance', category: 'HFCs' },
  { name: 'Indiabulls Housing Finance', category: 'HFCs' },
];

export const LOAN_PRODUCTS = [
  {
    key: 'home',
    title: 'Home Loan',
    rate: '8.40% p.a.',
    maxAmount: 'Up to ₹10 Cr',
    icon: 'Home',
    description: 'Best rates for your dream home. Salaried & self-employed.',
  },
  {
    key: 'personal',
    title: 'Personal Loan',
    rate: '10.50% p.a.',
    maxAmount: 'Up to ₹50 L',
    icon: 'Wallet',
    description: 'Instant personal loans with minimal documentation.',
  },
  {
    key: 'business',
    title: 'Business Loan',
    rate: '14.00% p.a.',
    maxAmount: 'Up to ₹5 Cr',
    icon: 'Briefcase',
    description: 'Fuel your business growth with flexible working capital.',
  },
  {
    key: 'lap',
    title: 'LAP',
    rate: '9.00% p.a.',
    maxAmount: 'Up to ₹7.5 Cr',
    icon: 'Building2',
    description: 'Unlock the equity in your property at competitive rates.',
  },
  {
    key: 'car',
    title: 'Car Loan',
    rate: '8.75% p.a.',
    maxAmount: 'Up to ₹1 Cr',
    icon: 'Car',
    description: 'Drive home your dream car with easy EMI options.',
  },
  {
    key: 'education',
    title: 'Education Loan',
    rate: '9.50% p.a.',
    maxAmount: 'Up to ₹1.5 Cr',
    icon: 'GraduationCap',
    description: 'Finance your education at top institutions in India & abroad.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    city: 'Jaipur',
    product: 'Home Loan',
    amount: '₹45 L',
    lender: 'HDFC Bank',
    days: '4 days',
    review: 'Got my home loan approved in just 4 days. The team was extremely professional and helped me compare multiple lender offers.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    product: 'Business Loan',
    amount: '₹25 L',
    lender: 'Bajaj Finserv',
    days: '36 hours',
    review: 'My business needed urgent funding. Real Money Advisory got me disbursed in 36 hours — absolutely incredible service.',
    rating: 5,
  },
  {
    name: 'Amit Verma',
    city: 'Delhi',
    product: 'Personal Loan',
    amount: '₹15 L',
    lender: 'Multiple Offers',
    days: '2 days',
    review: 'They matched me with 8 lenders and I got a personal loan at 11.5% — much better than what my bank offered directly.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    city: 'Ahmedabad',
    product: 'LAP',
    amount: '₹1.2 Cr',
    lender: 'Tata Capital',
    days: '5 days',
    review: 'LAP for ₹1.2 Cr was seamless. Document upload portal saved us so much time. Highly recommended for large-ticket loans.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    city: 'Jaipur',
    product: 'Car Loan',
    amount: 'New Car',
    lender: 'ICICI Bank',
    days: '2 days',
    review: 'Got my car loan at 8.9% interest rate in just 2 days. The advisor guided me through every step of the process.',
    rating: 5,
  },
  {
    name: 'Anita Iyer',
    city: 'Bengaluru',
    product: 'Education Loan',
    amount: '₹40 L',
    lender: 'SBI',
    days: '7 days',
    review: 'Education loan of ₹40L sanctioned from SBI for my MBA abroad. The team handled all the documentation professionally.',
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    key: '1',
    label: 'What is Real Money Advisory Solution Pvt Ltd?',
    children: 'Real Money Advisory Solution Pvt Ltd is a NBFC-registered Corporate Direct Selling Agent (DSA) headquartered in Jaipur, Rajasthan. We are partnered with 50+ banks and NBFCs across India to provide customers with the best loan products — including Home Loans, Personal Loans, Business Loans, LAP, Car Loans and Education Loans. We act as a bridge between borrowers and lenders, providing personalized advisory to help customers get loans at the most competitive interest rates.',
  },
  {
    key: '2',
    label: 'Is Real Money Advisory a registered DSA?',
    children: 'Yes. Real Money Advisory Solution Pvt Ltd (CIN: U67190RJ2024PTC000000) is a legally incorporated Private Limited Company registered under the Companies Act, 2013. We operate as a Corporate DSA (Direct Selling Agent) authorized by our lender partners. All our operations are conducted in compliance with applicable RBI guidelines and regulations.',
  },
  {
    key: '3',
    label: 'Do you charge any fees from customers?',
    children: 'No — our advisory services are completely free for borrowers. We are compensated by lender partners on successful loan disbursals. We follow a Fair Practice Code and maintain full transparency: if any processing fee, documentation charge, or other fee is applicable, it is always disclosed upfront before you proceed with any lender. We never charge hidden fees.',
  },
  {
    key: '4',
    label: 'How is my personal & financial data protected?',
    children: 'We take data privacy seriously. Your personal and financial data is encrypted end-to-end and stored on secure servers. We share your information only with lenders you explicitly consent to apply with, and only for the purpose of loan processing. We comply with India\'s Information Technology Act and applicable data protection guidelines. You can request deletion of your data at any time by writing to contact@realmoneyadvisory.in.',
  },
  {
    key: '5',
    label: 'What documents are required for a loan application?',
    children: 'Document requirements vary by loan type and lender, but typically include: (1) KYC — Aadhaar, PAN card, passport-size photo; (2) Address proof — utility bill, rental agreement, or passport; (3) Income proof — salary slips (last 3 months) for salaried, or ITR + bank statements for self-employed; (4) Bank statements — last 6 months; (5) For Home Loan/LAP — property documents. Our advisors will provide you a precise checklist based on your specific loan requirement.',
  },
  {
    key: '6',
    label: 'How long does loan approval and disbursal take?',
    children: 'For Personal Loans and Car Loans, approval can happen in as little as 24–48 hours with complete documentation. Business Loans typically take 2–5 working days. Home Loans and LAP may take 5–10 working days due to property valuation and legal verification. Our average disbursal time across all loan types is under 48 hours once documentation is complete. We actively follow up with lender partners on your behalf to ensure the fastest possible processing.',
  },
  {
    key: '7',
    label: 'Can I compare multiple lender offers before choosing?',
    children: 'Absolutely — this is one of our core value propositions. After you submit your requirement, our system matches your profile with all eligible lenders from our 50+ partner network. You will receive a comparison of offers showing interest rates, processing fees, loan tenure, and EMI amounts for each lender. You make the final choice — we never push any specific lender. Our goal is to ensure you get the best deal.',
  },
  {
    key: '8',
    label: 'What if my CIBIL score is below 700?',
    children: 'A CIBIL score below 700 does not automatically disqualify you. Many of our NBFC and Small Finance Bank partners have flexible credit criteria and may still consider your application based on income stability, existing assets, or co-applicant profiles. Our advisors will do a thorough profile assessment and match you with lenders most likely to approve your case. We also provide guidance on credit score improvement strategies if needed.',
  },
];

export const STATS = [
  { label: 'Lender Partners', value: 50, suffix: '+', prefix: '' },
  { label: 'Loans Disbursed', value: 0, suffix: ' Cr+', prefix: '₹' },
  { label: 'Happy Customers', value: 0, suffix: '+', prefix: '' },
  { label: 'Customer Rating', value: 4.8, suffix: '/5', prefix: '' },
  { label: 'Avg Disbursal', value: 48, suffix: ' hrs', prefix: '' },
  { label: 'Cities Served', value: 15, suffix: '+', prefix: '' },
];
