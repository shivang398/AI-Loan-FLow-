import React, { useState } from 'react';
import axios from 'axios';

// ── Types ──────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 – Loan Info
  loanAmount: string;
  loanType: string;
  profession: string;
  netMonthlySalary: string;

  // Step 2 – Personal
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  dob: string;
  mobile: string;
  alternateContact: string;
  whatsappNo: string;
  email: string;
  officialEmail: string;
  panNumber: string;
  aadhaarNumber: string;

  // Step 3 – Address
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentState: string;
  currentDistrict: string;
  currentCity: string;
  currentPincode: string;
  residenceType: string;
  sameAsPermanent: boolean;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentState: string;
  permanentDistrict: string;
  permanentCity: string;
  permanentPincode: string;

  // Step 4 – Employment
  jobType: string;
  designation: string;
  modeOfSalary: string;
  officeAddress: string;
  officeState: string;
  officeDistrict: string;
  officeCity: string;
  officePincode: string;
  existingEmi: string;
  hasPriorPersonalLoan: string;
}

const INITIAL: FormData = {
  loanAmount: '', loanType: 'personal', profession: '', netMonthlySalary: '',
  firstName: '', lastName: '', gender: '', maritalStatus: '', dob: '',
  mobile: '', alternateContact: '', whatsappNo: '', email: '', officialEmail: '',
  panNumber: '', aadhaarNumber: '',
  currentAddressLine1: '', currentAddressLine2: '', currentState: '',
  currentDistrict: '', currentCity: '', currentPincode: '', residenceType: '',
  sameAsPermanent: false,
  permanentAddressLine1: '', permanentAddressLine2: '', permanentState: '',
  permanentDistrict: '', permanentCity: '', permanentPincode: '',
  jobType: '', designation: '', modeOfSalary: '',
  officeAddress: '', officeState: '', officeDistrict: '', officeCity: '', officePincode: '',
  existingEmi: '', hasPriorPersonalLoan: '',
};

// ── Styles ─────────────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0',
  fontSize: 13, color: '#0f172a', background: '#f8fafc', outline: 'none',
  fontFamily: 'Inter, sans-serif', width: '100%', boxSizing: 'border-box',
  transition: 'border-color 200ms',
};
const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: '#475569',
  textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5, display: 'block',
};
const sel: React.CSSProperties = { ...inp, cursor: 'pointer' };

// ── Field helpers ──────────────────────────────────────────────────────────
const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={lbl}>{label}</label>
    {children}
  </div>
);

const Input = ({
  placeholder, value, onChange, type = 'text',
}: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <input
    type={type} value={value} placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    style={inp}
    onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
  />
);

const Select = ({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={sel}
    onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
    <option value="">— Select —</option>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ── Steps config ───────────────────────────────────────────────────────────
const STEPS = [
  { title: 'Loan Info',   subtitle: 'What you need' },
  { title: 'Personal',    subtitle: 'Your details' },
  { title: 'Address',     subtitle: 'Where you live' },
  { title: 'Employment',  subtitle: 'Work & finances' },
];

// ── Validation ─────────────────────────────────────────────────────────────
const validateStep = (step: number, f: FormData): string => {
  if (step === 0) {
    if (!f.loanAmount || isNaN(Number(f.loanAmount)) || Number(f.loanAmount) < 10000)
      return 'Enter a valid loan amount (min ₹10,000).';
    if (!f.profession) return 'Select your profession.';
    if (!f.netMonthlySalary || isNaN(Number(f.netMonthlySalary)) || Number(f.netMonthlySalary) < 1000)
      return 'Enter a valid monthly salary.';
  }
  if (step === 1) {
    if (!f.firstName.trim()) return 'First name is required.';
    if (!f.lastName.trim()) return 'Last name is required.';
    if (!f.gender) return 'Select gender.';
    if (!f.dob) return 'Date of birth is required.';
    if (!/^[0-9]{10}$/.test(f.mobile)) return 'Mobile must be 10 digits.';
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Valid email is required.';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(f.panNumber.toUpperCase())) return 'Invalid PAN (e.g. ABCDE1234F).';
  }
  if (step === 2) {
    if (!f.currentAddressLine1.trim()) return 'Current address is required.';
    if (!f.currentState.trim()) return 'State is required.';
    if (!f.currentCity.trim()) return 'City is required.';
    if (!/^[0-9]{6}$/.test(f.currentPincode)) return 'Valid 6-digit pincode required.';
  }
  if (step === 3) {
    if (!f.jobType) return 'Select job type.';
    if (!f.designation.trim()) return 'Designation is required.';
    if (!f.modeOfSalary) return 'Select salary mode.';
    if (!f.officeCity.trim()) return 'Office city is required.';
  }
  return '';
};

// ── Main Component ─────────────────────────────────────────────────────────
const CustomerRegistrationSection: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof FormData) => (v: string | boolean) =>
    setForm(f => ({ ...f, [key]: v }));

  const next = () => {
    const err = validateStep(step, form);
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const back = () => { setError(''); setStep(s => s - 1); };

  const handleSubmit = async () => {
    const err = validateStep(3, form);
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      const permanent = form.sameAsPermanent
        ? {
            permanentAddressLine1: form.currentAddressLine1,
            permanentAddressLine2: form.currentAddressLine2,
            permanentState: form.currentState,
            permanentDistrict: form.currentDistrict,
            permanentCity: form.currentCity,
            permanentPincode: form.currentPincode,
          }
        : {
            permanentAddressLine1: form.permanentAddressLine1,
            permanentAddressLine2: form.permanentAddressLine2,
            permanentState: form.permanentState,
            permanentDistrict: form.permanentDistrict,
            permanentCity: form.permanentCity,
            permanentPincode: form.permanentPincode,
          };

      await axios.post('/api/customers', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        panNumber: form.panNumber.toUpperCase(),
        aadhaarNumber: form.aadhaarNumber || undefined,
        loanType: form.loanType,
        loanAmount: Number(form.loanAmount),
        profession: form.profession,
        netMonthlySalary: Number(form.netMonthlySalary),
        gender: form.gender,
        maritalStatus: form.maritalStatus || undefined,
        dob: form.dob,
        alternateContact: form.alternateContact || undefined,
        whatsappNo: form.whatsappNo || undefined,
        officialEmail: form.officialEmail || undefined,
        currentAddressLine1: form.currentAddressLine1,
        currentAddressLine2: form.currentAddressLine2 || undefined,
        currentState: form.currentState,
        currentDistrict: form.currentDistrict || undefined,
        currentCity: form.currentCity,
        currentPincode: form.currentPincode,
        residenceType: form.residenceType || undefined,
        ...permanent,
        jobType: form.jobType,
        designation: form.designation,
        modeOfSalary: form.modeOfSalary,
        officeAddress: form.officeAddress || undefined,
        officeState: form.officeState || undefined,
        officeDistrict: form.officeDistrict || undefined,
        officeCity: form.officeCity,
        officePincode: form.officePincode || undefined,
        existingEmi: form.existingEmi ? Number(form.existingEmi) : 0,
        hasPriorPersonalLoan: form.hasPriorPersonalLoan === 'YES',
      });
      setSuccess(true);
    } catch (ex: any) {
      const msg = ex?.response?.data?.message || ex?.response?.data?.error || 'Submission failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };
  const grid3: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 };

  return (
    <section id="customer-register" style={{ padding: '80px 0', background: 'linear-gradient(180deg,#F0F4FF 0%,#F8FAFC 100%)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FEF9EC', borderRadius: 100, padding: '6px 18px', border: '1px solid #D4AF3740', marginBottom: 14 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4AF37' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Apply Now · Free</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.4rem)', fontWeight: 900, color: '#0A1F44', margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Apply for Your Loan
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Complete the 4-step form below. Our advisor will contact you within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 48px rgba(10,31,68,0.09)', overflow: 'hidden' }}>

          {success ? (
            <div style={{ textAlign: 'center', padding: '60px 40px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✓</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>Application Submitted!</h3>
              <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 28px', lineHeight: 1.6, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                Thank you! Your loan application is in our queue. A Real Money advisor will call you within 24 hours.
              </p>
              <button onClick={() => { setSuccess(false); setForm(INITIAL); setStep(0); }}
                style={{ padding: '12px 32px', borderRadius: 14, border: '1.5px solid #0A1F44', background: 'transparent', fontSize: 14, fontWeight: 700, color: '#0A1F44', cursor: 'pointer' }}>
                Submit Another Application
              </button>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div style={{ padding: '24px 32px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {i < STEPS.length - 1 && (
                      <div style={{
                        position: 'absolute', top: 16, left: '50%', width: '100%', height: 2,
                        background: i < step ? '#D4AF37' : '#e2e8f0', zIndex: 0,
                      }} />
                    )}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', zIndex: 1,
                      background: i < step ? '#D4AF37' : i === step ? '#0A1F44' : '#f1f5f9',
                      color: i <= step ? '#fff' : '#94a3b8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, marginBottom: 6,
                      border: i === step ? '2px solid #0A1F44' : 'none',
                      transition: 'all 300ms',
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i === step ? '#0A1F44' : i < step ? '#D4AF37' : '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {s.title}
                    </span>
                    <span style={{ fontSize: 10, color: '#cbd5e1', fontWeight: 500 }}>{s.subtitle}</span>
                  </div>
                ))}
              </div>

              {/* Form Body */}
              <div style={{ padding: '28px 32px 24px' }}>
                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>
                    {error}
                  </div>
                )}

                {/* ── Step 0: Loan Info ── */}
                {step === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2}>
                      <F label="Loan Amount (₹)">
                        <Input placeholder="e.g. 500000" value={form.loanAmount} onChange={set('loanAmount')} />
                      </F>
                      <F label="Loan Type">
                        <Select value={form.loanType} onChange={set('loanType')} options={[
                          { value: 'personal', label: 'Personal Loan' },
                          { value: 'business', label: 'Business Loan' },
                          { value: 'home', label: 'Home Loan' },
                          { value: 'education', label: 'Education Loan' },
                          { value: 'lap', label: 'Loan Against Property' },
                        ]} />
                      </F>
                    </div>
                    <div style={grid2}>
                      <F label="Current Profession">
                        <Select value={form.profession} onChange={set('profession')} options={[
                          { value: 'SALARIED', label: 'Salaried' },
                          { value: 'SELF_EMPLOYED', label: 'Self-Employed' },
                        ]} />
                      </F>
                      <F label="Net Monthly Salary (₹)">
                        <Input placeholder="e.g. 50000" value={form.netMonthlySalary} onChange={set('netMonthlySalary')} />
                      </F>
                    </div>
                  </div>
                )}

                {/* ── Step 1: Personal ── */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2}>
                      <F label="First Name (as per PAN)">
                        <Input placeholder="Rahul" value={form.firstName} onChange={set('firstName')} />
                      </F>
                      <F label="Last Name">
                        <Input placeholder="Sharma" value={form.lastName} onChange={set('lastName')} />
                      </F>
                    </div>
                    <div style={grid3}>
                      <F label="Gender">
                        <Select value={form.gender} onChange={set('gender')} options={[
                          { value: 'MALE', label: 'Male' },
                          { value: 'FEMALE', label: 'Female' },
                          { value: 'OTHER', label: 'Other' },
                        ]} />
                      </F>
                      <F label="Marital Status">
                        <Select value={form.maritalStatus} onChange={set('maritalStatus')} options={[
                          { value: 'SINGLE', label: 'Single' },
                          { value: 'MARRIED', label: 'Married' },
                          { value: 'DIVORCED', label: 'Divorced' },
                          { value: 'WIDOWED', label: 'Widowed' },
                        ]} />
                      </F>
                      <F label="Date of Birth">
                        <input type="date" value={form.dob} onChange={e => set('dob')(e.target.value)} style={inp}
                          onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                      </F>
                    </div>
                    <div style={grid2}>
                      <F label="Mobile No.">
                        <Input placeholder="9876543210" value={form.mobile} onChange={set('mobile')} type="tel" />
                      </F>
                      <F label="Alternate Contact">
                        <Input placeholder="Optional" value={form.alternateContact} onChange={set('alternateContact')} type="tel" />
                      </F>
                    </div>
                    <div style={grid2}>
                      <F label="WhatsApp No.">
                        <Input placeholder="If different from mobile" value={form.whatsappNo} onChange={set('whatsappNo')} type="tel" />
                      </F>
                      <F label="Email Address">
                        <Input placeholder="rahul@gmail.com" value={form.email} onChange={set('email')} type="email" />
                      </F>
                    </div>
                    <div style={grid3}>
                      <F label="Official Email">
                        <Input placeholder="rahul@company.com" value={form.officialEmail} onChange={set('officialEmail')} type="email" />
                      </F>
                      <F label="PAN Number">
                        <Input placeholder="ABCDE1234F" value={form.panNumber} onChange={v => set('panNumber')(v.toUpperCase())} />
                      </F>
                      <F label="Aadhaar Number">
                        <Input placeholder="1234 5678 9012" value={form.aadhaarNumber} onChange={set('aadhaarNumber')} />
                      </F>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Address ── */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#0A1F44', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                        Current Address
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <F label="Address Line 1">
                          <Input placeholder="House No., Street" value={form.currentAddressLine1} onChange={set('currentAddressLine1')} />
                        </F>
                        <F label="Address Line 2">
                          <Input placeholder="Landmark, Area (optional)" value={form.currentAddressLine2} onChange={set('currentAddressLine2')} />
                        </F>
                        <div style={grid3}>
                          <F label="State">
                            <Input placeholder="Maharashtra" value={form.currentState} onChange={set('currentState')} />
                          </F>
                          <F label="District">
                            <Input placeholder="Pune" value={form.currentDistrict} onChange={set('currentDistrict')} />
                          </F>
                          <F label="City">
                            <Input placeholder="Pune" value={form.currentCity} onChange={set('currentCity')} />
                          </F>
                        </div>
                        <div style={grid2}>
                          <F label="Pincode">
                            <Input placeholder="411001" value={form.currentPincode} onChange={set('currentPincode')} />
                          </F>
                          <F label="Residence Type">
                            <Select value={form.residenceType} onChange={set('residenceType')} options={[
                              { value: 'OWNED', label: 'Owned' },
                              { value: 'RENTED', label: 'Rented' },
                              { value: 'COMPANY_PROVIDED', label: 'Company Provided' },
                              { value: 'FAMILY_OWNED', label: 'Family Owned' },
                            ]} />
                          </F>
                        </div>
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#334155' }}>
                      <input type="checkbox" checked={form.sameAsPermanent}
                        onChange={e => set('sameAsPermanent')(e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: '#D4AF37', cursor: 'pointer' }} />
                      Permanent address is same as current address
                    </label>

                    {!form.sameAsPermanent && (
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 800, color: '#0A1F44', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                          Permanent Address
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <F label="Address Line 1">
                            <Input placeholder="House No., Street" value={form.permanentAddressLine1} onChange={set('permanentAddressLine1')} />
                          </F>
                          <F label="Address Line 2">
                            <Input placeholder="Landmark, Area (optional)" value={form.permanentAddressLine2} onChange={set('permanentAddressLine2')} />
                          </F>
                          <div style={grid3}>
                            <F label="State">
                              <Input placeholder="Maharashtra" value={form.permanentState} onChange={set('permanentState')} />
                            </F>
                            <F label="District">
                              <Input placeholder="Nagpur" value={form.permanentDistrict} onChange={set('permanentDistrict')} />
                            </F>
                            <F label="City">
                              <Input placeholder="Nagpur" value={form.permanentCity} onChange={set('permanentCity')} />
                            </F>
                          </div>
                          <F label="Pincode">
                            <Input placeholder="440001" value={form.permanentPincode} onChange={set('permanentPincode')} />
                          </F>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Step 3: Employment ── */}
                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid3}>
                      <F label="Job Type">
                        <Select value={form.jobType} onChange={set('jobType')} options={[
                          { value: 'FULL_TIME', label: 'Full-Time' },
                          { value: 'PART_TIME', label: 'Part-Time' },
                          { value: 'CONTRACT', label: 'Contract' },
                          { value: 'GOVERNMENT', label: 'Government' },
                          { value: 'BUSINESS_OWNER', label: 'Business Owner' },
                        ]} />
                      </F>
                      <F label="Designation">
                        <Input placeholder="Software Engineer" value={form.designation} onChange={set('designation')} />
                      </F>
                      <F label="Mode of Salary">
                        <Select value={form.modeOfSalary} onChange={set('modeOfSalary')} options={[
                          { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
                          { value: 'CASH', label: 'Cash' },
                          { value: 'CHEQUE', label: 'Cheque' },
                        ]} />
                      </F>
                    </div>
                    <F label="Office Address">
                      <Input placeholder="Building, Street, Area" value={form.officeAddress} onChange={set('officeAddress')} />
                    </F>
                    <div style={grid3}>
                      <F label="State">
                        <Input placeholder="Maharashtra" value={form.officeState} onChange={set('officeState')} />
                      </F>
                      <F label="District">
                        <Input placeholder="Pune" value={form.officeDistrict} onChange={set('officeDistrict')} />
                      </F>
                      <F label="City">
                        <Input placeholder="Pune" value={form.officeCity} onChange={set('officeCity')} />
                      </F>
                    </div>
                    <div style={grid3}>
                      <F label="Office Pincode">
                        <Input placeholder="411001" value={form.officePincode} onChange={set('officePincode')} />
                      </F>
                      <F label="Existing Monthly EMI (₹)">
                        <Input placeholder="0" value={form.existingEmi} onChange={set('existingEmi')} />
                      </F>
                      <F label="Prior Personal Loan?">
                        <Select value={form.hasPriorPersonalLoan} onChange={set('hasPriorPersonalLoan')} options={[
                          { value: 'YES', label: 'Yes' },
                          { value: 'NO', label: 'No' },
                        ]} />
                      </F>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div style={{ padding: '16px 32px 24px', display: 'flex', gap: 12, justifyContent: 'space-between', borderTop: '1px solid #f8fafc' }}>
                <button
                  onClick={back}
                  disabled={step === 0}
                  style={{
                    padding: '12px 28px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                    background: step === 0 ? '#f8fafc' : '#fff', fontSize: 14, fontWeight: 700,
                    color: step === 0 ? '#cbd5e1' : '#475569', cursor: step === 0 ? 'default' : 'pointer',
                  }}
                >
                  ← Back
                </button>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Step {step + 1} of {STEPS.length}</span>
                  {step < STEPS.length - 1 ? (
                    <button onClick={next} style={{
                      padding: '12px 32px', borderRadius: 12, border: 'none',
                      background: 'linear-gradient(135deg,#0A1F44,#1e3a6e)', color: '#fff',
                      fontSize: 14, fontWeight: 800, cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(10,31,68,0.22)',
                    }}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={loading} style={{
                      padding: '12px 32px', borderRadius: 12, border: 'none',
                      background: loading ? '#94a3b8' : 'linear-gradient(135deg,#D4AF37,#B8960C)',
                      color: loading ? '#fff' : '#0A1F44', fontSize: 14, fontWeight: 800,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: loading ? 'none' : '0 6px 20px rgba(212,175,55,0.35)',
                    }}>
                      {loading ? 'Submitting…' : 'Submit Application ✓'}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 11.5, color: '#94a3b8', marginTop: 14, fontWeight: 500 }}>
          By submitting you agree to our Terms & Privacy Policy. Your data is encrypted and secure.
        </p>
      </div>
    </section>
  );
};

export default CustomerRegistrationSection;
