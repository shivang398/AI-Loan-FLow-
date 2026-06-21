import React, { useState } from 'react';
import axios from 'axios';
import { INDIA_STATES, getDistricts, getCities } from '../constants/indiaLocations';

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
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  mobile: string;
  alternateContact: string;
  whatsappSameAsMobile: boolean;
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
  currentCityCustom: string;
  currentPincode: string;
  residenceType: string;
  sameAsPermanent: boolean;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentState: string;
  permanentDistrict: string;
  permanentCity: string;
  permanentCityCustom: string;
  permanentPincode: string;

  // Step 4 – Employment
  jobType: string;
  designation: string;
  companyType: string;
  companyName: string;
  modeOfSalary: string;
  officeAddress: string;
  officeState: string;
  officeDistrict: string;
  officeCity: string;
  officeCityCustom: string;
  officePincode: string;
  hasPriorPersonalLoan: string;
  existingEmi: string;
}

const INITIAL: FormData = {
  loanAmount: '', loanType: 'personal', profession: '', netMonthlySalary: '',
  firstName: '', lastName: '', gender: '', maritalStatus: '', dobDay: '', dobMonth: '', dobYear: '',
  mobile: '', alternateContact: '',
  whatsappSameAsMobile: false, whatsappNo: '',
  email: '', officialEmail: '',
  panNumber: '', aadhaarNumber: '',
  currentAddressLine1: '', currentAddressLine2: '',
  currentState: '', currentDistrict: '', currentCity: '', currentCityCustom: '',
  currentPincode: '', residenceType: '',
  sameAsPermanent: false,
  permanentAddressLine1: '', permanentAddressLine2: '',
  permanentState: '', permanentDistrict: '', permanentCity: '', permanentCityCustom: '',
  permanentPincode: '',
  jobType: '', designation: '', companyType: '', companyName: '', modeOfSalary: 'BANK_TRANSFER',
  officeAddress: '',
  officeState: '', officeDistrict: '', officeCity: '', officeCityCustom: '',
  officePincode: '',
  hasPriorPersonalLoan: '', existingEmi: '',
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
const F = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={lbl}>
      {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const Input = ({
  placeholder, value, onChange, type = 'text', disabled = false, maxLength, inputMode,
}: {
  placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; disabled?: boolean; maxLength?: number; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) => (
  <input
    type={type} value={value} placeholder={placeholder} disabled={disabled}
    maxLength={maxLength} inputMode={inputMode}
    onChange={e => onChange(e.target.value)}
    style={{ ...inp, ...(disabled ? { background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' } : {}) }}
    onFocus={e => { if (!disabled) e.currentTarget.style.borderColor = '#D4AF37'; }}
    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
  />
);

// Digits-only transformer for phone/numeric fields
const digitsOnly = (v: string) => v.replace(/\D/g, '');
// Aadhaar formatter: auto-inserts spaces → "1234 5678 9012"
const formatAadhaar = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 12);
  return d.replace(/^(\d{1,4})(\d{0,4})(\d{0,4})$/, (_m, a, b, c) =>
    [a, b, c].filter(s => s.length > 0).join(' ')
  );
};
// PAN transformer: uppercase + alphanumeric only, max 10 chars
const transformPan = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);

const Sel = ({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={sel}
    onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
    <option value="">— Select —</option>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ── Indian organisation types ──────────────────────────────────────────────
const INDIA_ORG_TYPES = [
  { value: 'PRIVATE_LIMITED', label: 'Private Limited Company (Pvt. Ltd.)' },
  { value: 'PUBLIC_LIMITED',  label: 'Public Limited Company (Ltd.)' },
  { value: 'LLP',             label: 'Limited Liability Partnership (LLP)' },
  { value: 'OPC',             label: 'One Person Company (OPC)' },
  { value: 'PARTNERSHIP',     label: 'Partnership Firm' },
  { value: 'PROPRIETORSHIP',  label: 'Sole Proprietorship' },
  { value: 'CENTRAL_GOVT',    label: 'Central Government' },
  { value: 'STATE_GOVT',      label: 'State Government' },
  { value: 'MUNICIPAL',       label: 'Municipal Corporation / Local Body' },
  { value: 'PSU',             label: 'Public Sector Undertaking (PSU)' },
  { value: 'DEFENCE',         label: 'Defence / Armed Forces / Paramilitary' },
  { value: 'SEMI_GOVT',       label: 'Semi-Government / Autonomous Body' },
  { value: 'NGO',             label: 'NGO / Trust / Society / Section 8' },
  { value: 'EDUCATION',       label: 'Educational Institution' },
  { value: 'OTHER',           label: 'Other' },
];

// ── Location Picker: cascading State → District → City (with "Others" text input) ──
const LocationPicker: React.FC<{
  stateVal: string; districtVal: string; cityVal: string; cityCustomVal: string;
  onState: (v: string) => void; onDistrict: (v: string) => void;
  onCity: (v: string) => void; onCityCustom: (v: string) => void;
}> = ({ stateVal, districtVal, cityVal, cityCustomVal, onState, onDistrict, onCity, onCityCustom }) => {
  const districts = getDistricts(stateVal);
  const cities = getCities(stateVal, districtVal);

  const handleStateChange = (v: string) => {
    onState(v);
    onDistrict('');
    onCity('');
    onCityCustom('');
  };
  const handleDistrictChange = (v: string) => {
    onDistrict(v);
    onCity('');
    onCityCustom('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="State *">
          <select value={stateVal} onChange={e => handleStateChange(e.target.value)} style={sel}
            onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
            <option value="">— Select State —</option>
            {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </F>
        <F label="District" required>
          <select value={districtVal} onChange={e => handleDistrictChange(e.target.value)} style={sel}
            disabled={!stateVal}
            onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
            <option value="">— Select District —</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </F>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cityVal === 'Others' ? '1fr 1fr' : '1fr', gap: 12 }}>
        <F label="City *">
          <select value={cityVal} onChange={e => onCity(e.target.value)} style={sel}
            disabled={!districtVal}
            onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
            <option value="">— Select City —</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </F>
        {cityVal === 'Others' && (
          <F label="Specify City *">
            <input
              type="text" value={cityCustomVal} placeholder="Enter your city name"
              onChange={e => onCityCustom(e.target.value)}
              style={inp}
              onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
          </F>
        )}
      </div>
    </div>
  );
};

// ── Steps config ───────────────────────────────────────────────────────────
const STEPS = [
  { title: 'Loan Info',   subtitle: 'What you need' },
  { title: 'Personal',    subtitle: 'Your details' },
  { title: 'Address',     subtitle: 'Where you live' },
  { title: 'Employment',  subtitle: 'Work & finances' },
  { title: 'Documents',   subtitle: 'KYC & proofs' },
];

// ── Document types required ─────────────────────────────────────────────────
const DOC_TYPES = [
  { key: 'AADHAAR',        label: 'Aadhaar Card',             hint: 'Front & back, clear scan/photo',   required: true },
  { key: 'PAN',            label: 'PAN Card',                 hint: 'Original PAN card image/scan',      required: true },
  { key: 'BANK_STATEMENT', label: 'Bank Statement (6 months)', hint: 'Last 6 months, all pages',        required: true },
  { key: 'INCOME_PROOF',   label: 'Salary Slips (3 months)',  hint: 'Last 3 months payslips',            required: true },
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
    if (!f.firstName.trim() || !/^[A-Za-z\s]{2,}$/.test(f.firstName.trim())) return 'First name must be at least 2 letters (no numbers).';
    if (!f.lastName.trim() || !/^[A-Za-z\s]{1,}$/.test(f.lastName.trim())) return 'Last name must be letters only.';
    if (!f.gender) return 'Select gender.';
    if (!f.dobDay || !f.dobMonth || !f.dobYear) return 'Date of birth is required — select day, month and year.';
    const dobDate = new Date(Number(f.dobYear), Number(f.dobMonth) - 1, Number(f.dobDay));
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear() - (today < new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate()) ? 1 : 0);
    if (age < 21) return 'Applicant must be at least 21 years old.';
    if (age > 60) return 'Applicant must be under 60 years of age.';
    if (!/^[6-9][0-9]{9}$/.test(f.mobile)) return 'Mobile must be a valid 10-digit Indian number starting with 6–9.';
    if (f.alternateContact && !/^[6-9][0-9]{9}$/.test(f.alternateContact)) return 'Alternate contact must be a valid 10-digit number.';
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Valid email address is required (e.g. name@gmail.com).';
    if (!f.officialEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.officialEmail)) return 'Official email is required (e.g. rahul@company.com).';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(f.panNumber)) return 'Invalid PAN format — must be 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).';
    if (!f.aadhaarNumber || !/^[0-9]{12}$/.test(f.aadhaarNumber.replace(/\s/g, ''))) return 'Aadhaar must be exactly 12 digits.';
  }
  if (step === 2) {
    if (!f.currentAddressLine1.trim()) return 'Current address line 1 is required.';
    if (!f.currentState.trim()) return 'State is required.';
    if (!f.currentDistrict.trim()) return 'District is required.';
    if (!f.currentCity.trim()) return 'City is required.';
    if (f.currentCity === 'Others' && !f.currentCityCustom.trim()) return 'Please specify your city name.';
    if (!/^[0-9]{6}$/.test(f.currentPincode)) return 'Valid 6-digit pincode required.';
    if (!f.sameAsPermanent) {
      if (!f.permanentAddressLine1.trim()) return 'Permanent address line 1 is required.';
      if (!f.permanentState.trim()) return 'Permanent state is required.';
      if (!f.permanentDistrict.trim()) return 'Permanent district is required.';
      if (!f.permanentCity.trim()) return 'Permanent city is required.';
      if (f.permanentCity === 'Others' && !f.permanentCityCustom.trim()) return 'Please specify your permanent city name.';
      if (!/^[0-9]{6}$/.test(f.permanentPincode)) return 'Valid 6-digit permanent pincode required.';
    }
  }
  if (step === 3) {
    if (!f.companyType) return 'Select your organisation type.';
    if (f.companyType === 'OTHER' && !f.companyName.trim()) return 'Please enter your company or employer name.';
    if (!f.jobType) return 'Select job type.';
    if (!f.designation.trim()) return 'Designation is required.';
    if (!f.modeOfSalary) return 'Select salary mode.';
    if (!f.officeAddress.trim()) return 'Office address is required.';
    if (!f.officeState.trim()) return 'Office state is required.';
    if (!f.officeDistrict.trim()) return 'Office district is required.';
    if (!f.officeCity.trim()) return 'Office city is required.';
    if (f.officeCity === 'Others' && !f.officeCityCustom.trim()) return 'Please specify your office city name.';
    if (!/^[0-9]{6}$/.test(f.officePincode)) return 'Valid 6-digit office pincode required.';
    if (!f.hasPriorPersonalLoan) return 'Please indicate if you have any running loans/EMIs.';
    if (f.hasPriorPersonalLoan === 'YES' && (!f.existingEmi || isNaN(Number(f.existingEmi))))
      return 'Please enter your existing monthly EMI amount.';
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
  // After customer creation, hold the customerId for document upload
  const [customerId, setCustomerId] = useState<string | null>(null);
  // Track per-doc upload state: key → 'idle' | 'uploading' | 'done' | 'error'
  const [docState, setDocState] = useState<Record<string, 'idle' | 'uploading' | 'done' | 'error'>>({});
  const [docFiles, setDocFiles] = useState<Record<string, File | null>>({});

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
      const resolveCity = (city: string, custom: string) =>
        city === 'Others' ? custom : city;

      const permanent = form.sameAsPermanent
        ? {
            permanentAddressLine1: form.currentAddressLine1,
            permanentAddressLine2: form.currentAddressLine2,
            permanentState: form.currentState,
            permanentDistrict: form.currentDistrict,
            permanentCity: resolveCity(form.currentCity, form.currentCityCustom),
            permanentPincode: form.currentPincode,
          }
        : {
            permanentAddressLine1: form.permanentAddressLine1,
            permanentAddressLine2: form.permanentAddressLine2,
            permanentState: form.permanentState,
            permanentDistrict: form.permanentDistrict,
            permanentCity: resolveCity(form.permanentCity, form.permanentCityCustom),
            permanentPincode: form.permanentPincode,
          };

      const res = await axios.post('/api/customers/leads', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        panNumber: form.panNumber.toUpperCase(),
        aadhaarNumber: form.aadhaarNumber ? form.aadhaarNumber.replace(/\s/g, '') : undefined,
        loanType: form.loanType,
        loanAmount: Number(form.loanAmount),
        profession: form.profession,
        netMonthlySalary: Number(form.netMonthlySalary),
        gender: form.gender,
        maritalStatus: form.maritalStatus || undefined,
        dob: `${form.dobYear}-${form.dobMonth.padStart(2,'0')}-${form.dobDay.padStart(2,'0')}`,
        alternateContact: form.alternateContact || undefined,
        whatsappNo: form.whatsappSameAsMobile ? form.mobile : (form.whatsappNo || undefined),
        officialEmail: form.officialEmail || undefined,
        currentAddressLine1: form.currentAddressLine1,
        currentAddressLine2: form.currentAddressLine2 || undefined,
        currentState: form.currentState,
        currentDistrict: form.currentDistrict || undefined,
        currentCity: resolveCity(form.currentCity, form.currentCityCustom),
        currentPincode: form.currentPincode,
        residenceType: form.residenceType || undefined,
        ...permanent,
        jobType: form.jobType,
        designation: form.designation,
        companyName: form.companyType === 'OTHER'
          ? (form.companyName || undefined)
          : (INDIA_ORG_TYPES.find(o => o.value === form.companyType)?.label || undefined),
        modeOfSalary: form.modeOfSalary,
        officeAddress: form.officeAddress || undefined,
        officeState: form.officeState || undefined,
        officeDistrict: form.officeDistrict || undefined,
        officeCity: resolveCity(form.officeCity, form.officeCityCustom),
        officePincode: form.officePincode || undefined,
        existingEmi: form.hasPriorPersonalLoan === 'YES' ? Number(form.existingEmi) : 0,
        hasPriorPersonalLoan: form.hasPriorPersonalLoan === 'YES',
      });
      // Store customerId and advance to document upload step
      const cid = res.data?.data?.id;
      setCustomerId(cid || null);
      setStep(4);
    } catch (ex: any) {
      const msg = ex?.response?.data?.message || ex?.response?.data?.error || 'Submission failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDocUpload = async (docKey: string, fileArg?: File) => {
    const file = fileArg ?? docFiles[docKey];
    if (!file || !customerId) return;
    setDocState(prev => ({ ...prev, [docKey]: 'uploading' }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('ownerId', customerId);
      fd.append('documentType', docKey);
      // Do NOT set Content-Type manually — browser must auto-generate boundary
      await axios.post('/api/documents/public/upload', fd);
      setDocState(prev => ({ ...prev, [docKey]: 'done' }));
    } catch {
      setDocState(prev => ({ ...prev, [docKey]: 'error' }));
    }
  };

  // Auto-upload as soon as a file is selected
  const handleDocFileChange = (docKey: string, file: File | null) => {
    setDocFiles(prev => ({ ...prev, [docKey]: file }));
    if (file) {
      setDocState(prev => ({ ...prev, [docKey]: 'idle' }));
      handleDocUpload(docKey, file);
    }
  };

  const allRequiredUploaded = DOC_TYPES.filter(d => d.required).every(d => docState[d.key] === 'done');

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
            Apply for Your Personal Loan
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Complete the 5-step form below. Our advisor will contact you within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 48px rgba(10,31,68,0.09)', overflow: 'hidden' }}>

          {success ? (
            <div style={{ textAlign: 'center', padding: '60px 40px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✓</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>Application Submitted!</h3>
              <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 28px', lineHeight: 1.6, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                Thank you! Your personal loan application is in our queue. A Real Money advisor will call you within 24 hours.
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
                      <F label="Loan Amount (₹)" required>
                        <Input placeholder="e.g. 500000" value={form.loanAmount} onChange={set('loanAmount')} />
                      </F>
                      <F label="Loan Type">
                        {/* Personal Loan only */}
                        <div style={{
                          ...inp, display: 'flex', alignItems: 'center', gap: 10,
                          background: '#f0fdf4', borderColor: '#86efac', cursor: 'default',
                        }}>
                          <span style={{
                            width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0,
                            boxShadow: '0 0 0 2px #bbf7d0',
                          }} />
                          <span style={{ fontWeight: 700, color: '#15803d', fontSize: 13 }}>Personal Loan</span>
                          <span style={{
                            marginLeft: 'auto', fontSize: 10, fontWeight: 700, background: '#dcfce7',
                            color: '#16a34a', borderRadius: 100, padding: '2px 8px', letterSpacing: '0.05em',
                          }}>OUR CORE PRODUCT</span>
                        </div>
                      </F>
                    </div>
                    <div style={grid2}>
                      <F label="Current Profession" required>
                        <Sel value={form.profession} onChange={set('profession')} options={[
                          { value: 'SALARIED', label: 'Salaried' },
                          { value: 'SELF_EMPLOYED', label: 'Self-Employed' },
                        ]} />
                      </F>
                      <F label="Net Monthly Salary (₹)" required>
                        <Input placeholder="e.g. 50000" value={form.netMonthlySalary} onChange={set('netMonthlySalary')} />
                      </F>
                    </div>
                  </div>
                )}

                {/* ── Step 1: Personal ── */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={grid2}>
                      <F label="First Name (as per PAN)" required>
                        <Input placeholder="Rahul" value={form.firstName} onChange={set('firstName')} />
                      </F>
                      <F label="Last Name" required>
                        <Input placeholder="Sharma" value={form.lastName} onChange={set('lastName')} />
                      </F>
                    </div>
                    <div style={grid3}>
                      <F label="Gender" required>
                        <Sel value={form.gender} onChange={set('gender')} options={[
                          { value: 'MALE', label: 'Male' },
                          { value: 'FEMALE', label: 'Female' },
                          { value: 'OTHER', label: 'Other' },
                        ]} />
                      </F>
                      <F label="Marital Status">
                        <Sel value={form.maritalStatus} onChange={set('maritalStatus')} options={[
                          { value: 'SINGLE', label: 'Single' },
                          { value: 'MARRIED', label: 'Married' },
                          { value: 'DIVORCED', label: 'Divorced' },
                          { value: 'WIDOWED', label: 'Widowed' },
                        ]} />
                      </F>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ ...lbl }}>
                          Date of Birth<span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.2fr', gap: 8 }}>
                          <Sel value={form.dobDay} onChange={set('dobDay')} options={
                            Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1).padStart(2, '0') }))
                          } />
                          <Sel value={form.dobMonth} onChange={set('dobMonth')} options={[
                            { value: '1', label: 'January' }, { value: '2', label: 'February' },
                            { value: '3', label: 'March' },   { value: '4', label: 'April' },
                            { value: '5', label: 'May' },     { value: '6', label: 'June' },
                            { value: '7', label: 'July' },    { value: '8', label: 'August' },
                            { value: '9', label: 'September' },{ value: '10', label: 'October' },
                            { value: '11', label: 'November' },{ value: '12', label: 'December' },
                          ]} />
                          <Sel value={form.dobYear} onChange={set('dobYear')} options={(() => {
                            const y = new Date().getFullYear();
                            return Array.from({ length: 40 }, (_, i) => y - 60 + i)
                              .filter(yr => yr <= y - 21)
                              .reverse()
                              .map(yr => ({ value: String(yr), label: String(yr) }));
                          })()} />
                        </div>
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Age must be 21–60 years</span>
                      </div>
                    </div>
                    <div style={grid2}>
                      <F label="Mobile No." required>
                        <Input
                          placeholder="10-digit number (e.g. 9876543210)"
                          value={form.mobile}
                          onChange={v => {
                            const digits = digitsOnly(v).slice(0, 10);
                            set('mobile')(digits);
                            if (form.whatsappSameAsMobile) set('whatsappNo')(digits);
                          }}
                          type="tel" inputMode="numeric" maxLength={10}
                        />
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Must start with 6, 7, 8 or 9</span>
                      </F>
                      <F label="Alternate Contact">
                        <Input
                          placeholder="Optional 10-digit number"
                          value={form.alternateContact}
                          onChange={v => set('alternateContact')(digitsOnly(v).slice(0, 10))}
                          type="tel" inputMode="numeric" maxLength={10}
                        />
                      </F>
                    </div>

                    {/* WhatsApp — same-as-mobile toggle */}
                    <F label="WhatsApp No.">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{
                          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                          fontSize: 13, fontWeight: 600, color: '#334155',
                          padding: '9px 12px', borderRadius: 10,
                          background: form.whatsappSameAsMobile ? '#f0fdf4' : '#f8fafc',
                          border: `1.5px solid ${form.whatsappSameAsMobile ? '#86efac' : '#e2e8f0'}`,
                          transition: 'all 200ms',
                        }}>
                          <input
                            type="checkbox"
                            checked={form.whatsappSameAsMobile}
                            onChange={e => {
                              const checked = e.target.checked;
                              setForm(f => ({
                                ...f,
                                whatsappSameAsMobile: checked,
                                whatsappNo: checked ? f.mobile : '',
                              }));
                            }}
                            style={{ width: 16, height: 16, accentColor: '#16a34a', cursor: 'pointer' }}
                          />
                          {form.whatsappSameAsMobile
                            ? <><span style={{ color: '#15803d', fontWeight: 700 }}>✓ Same as mobile number</span><span style={{ fontSize: 11, color: '#86efac', marginLeft: 4 }}>{form.mobile || '—'}</span></>
                            : <span>My WhatsApp number is the same as my mobile</span>
                          }
                        </label>
                        {!form.whatsappSameAsMobile && (
                          <Input
                            placeholder="10-digit WhatsApp number"
                            value={form.whatsappNo}
                            onChange={v => set('whatsappNo')(digitsOnly(v).slice(0, 10))}
                            type="tel" inputMode="numeric" maxLength={10}
                          />
                        )}
                      </div>
                    </F>

                    <div style={grid2}>
                      <F label="Email Address" required>
                        <Input placeholder="rahul@gmail.com" value={form.email} onChange={set('email')} type="email" />
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Format: name@domain.com</span>
                      </F>
                      <F label="Official / Company Email" required>
                        <Input placeholder="rahul@company.com" value={form.officialEmail} onChange={set('officialEmail')} type="email" />
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Format: name@company.com</span>
                      </F>
                    </div>
                    <div style={grid2}>
                      <F label="PAN Number" required>
                        <Input
                          placeholder="ABCDE1234F"
                          value={form.panNumber}
                          onChange={v => set('panNumber')(transformPan(v))}
                          maxLength={10}
                        />
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>5 letters · 4 digits · 1 letter (e.g. ABCDE1234F)</span>
                      </F>
                      <F label="Aadhaar Number" required>
                        <Input
                          placeholder="1234 5678 9012"
                          value={form.aadhaarNumber}
                          onChange={v => set('aadhaarNumber')(formatAadhaar(v))}
                          inputMode="numeric"
                          maxLength={14}
                        />
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>12-digit Aadhaar number</span>
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
                        <F label="Address Line 1" required>
                          <Input placeholder="House No., Street" value={form.currentAddressLine1} onChange={set('currentAddressLine1')} />
                        </F>
                        <F label="Address Line 2">
                          <Input placeholder="Landmark, Area (optional)" value={form.currentAddressLine2} onChange={set('currentAddressLine2')} />
                        </F>
                        <LocationPicker
                          stateVal={form.currentState}
                          districtVal={form.currentDistrict}
                          cityVal={form.currentCity}
                          cityCustomVal={form.currentCityCustom}
                          onState={v => setForm(f => ({ ...f, currentState: v, currentDistrict: '', currentCity: '', currentCityCustom: '' }))}
                          onDistrict={v => setForm(f => ({ ...f, currentDistrict: v, currentCity: '', currentCityCustom: '' }))}
                          onCity={set('currentCity')}
                          onCityCustom={set('currentCityCustom')}
                        />
                        <div style={grid2}>
                          <F label="Pincode" required>
                            <Input placeholder="411001" value={form.currentPincode} onChange={set('currentPincode')} />
                          </F>
                          <F label="Residence Type">
                            <Sel value={form.residenceType} onChange={set('residenceType')} options={[
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
                          <F label="Address Line 1" required>
                            <Input placeholder="House No., Street" value={form.permanentAddressLine1} onChange={set('permanentAddressLine1')} />
                          </F>
                          <F label="Address Line 2">
                            <Input placeholder="Landmark, Area (optional)" value={form.permanentAddressLine2} onChange={set('permanentAddressLine2')} />
                          </F>
                          <LocationPicker
                            stateVal={form.permanentState}
                            districtVal={form.permanentDistrict}
                            cityVal={form.permanentCity}
                            cityCustomVal={form.permanentCityCustom}
                            onState={v => setForm(f => ({ ...f, permanentState: v, permanentDistrict: '', permanentCity: '', permanentCityCustom: '' }))}
                            onDistrict={v => setForm(f => ({ ...f, permanentDistrict: v, permanentCity: '', permanentCityCustom: '' }))}
                            onCity={set('permanentCity')}
                            onCityCustom={set('permanentCityCustom')}
                          />
                          <F label="Pincode" required>
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
                    <div style={grid2}>
                      <F label="Organisation Type" required>
                        <Sel value={form.companyType} onChange={v => { set('companyType')(v); if (v !== 'OTHER') set('companyName')(''); }} options={INDIA_ORG_TYPES} />
                      </F>
                      {form.companyType === 'OTHER' && (
                        <F label="Company / Employer Name" required>
                          <Input placeholder="Enter your company or employer name" value={form.companyName} onChange={set('companyName')} />
                        </F>
                      )}
                    </div>
                    <div style={grid3}>
                      <F label="Job Type" required>
                        <Sel value={form.jobType} onChange={set('jobType')} options={[
                          { value: 'FULL_TIME', label: 'Full-Time' },
                          { value: 'PART_TIME', label: 'Part-Time' },
                          { value: 'CONTRACT', label: 'Contract' },
                          { value: 'GOVERNMENT', label: 'Government' },
                          { value: 'BUSINESS_OWNER', label: 'Business Owner' },
                        ]} />
                      </F>
                      <F label="Designation" required>
                        <Input placeholder="e.g. Software Engineer" value={form.designation} onChange={set('designation')} />
                      </F>
                      <F label="Mode of Salary">
                        <div style={{
                          ...inp, display: 'flex', alignItems: 'center', gap: 10,
                          background: '#f0fdf4', borderColor: '#86efac', cursor: 'default',
                        }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0, boxShadow: '0 0 0 2px #bbf7d0' }} />
                          <span style={{ fontWeight: 700, color: '#15803d', fontSize: 13 }}>Bank Transfer</span>
                          <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#16a34a', borderRadius: 100, padding: '2px 8px', letterSpacing: '0.05em' }}>REQUIRED</span>
                        </div>
                        <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Lenders require salary via bank transfer for loan eligibility</span>
                      </F>
                    </div>
                    <F label="Office Address" required>
                      <Input placeholder="Building, Street, Area" value={form.officeAddress} onChange={set('officeAddress')} />
                    </F>
                    <LocationPicker
                      stateVal={form.officeState}
                      districtVal={form.officeDistrict}
                      cityVal={form.officeCity}
                      cityCustomVal={form.officeCityCustom}
                      onState={v => setForm(f => ({ ...f, officeState: v, officeDistrict: '', officeCity: '', officeCityCustom: '' }))}
                      onDistrict={v => setForm(f => ({ ...f, officeDistrict: v, officeCity: '', officeCityCustom: '' }))}
                      onCity={set('officeCity')}
                      onCityCustom={set('officeCityCustom')}
                    />
                    <F label="Office Pincode" required>
                      <Input placeholder="411001" value={form.officePincode} onChange={set('officePincode')} />
                    </F>

                    {/* Prior Loan / EMI section */}
                    <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: '#0A1F44', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Existing Loan / EMI Details
                      </p>
                      <F label="Do you have any existing running loans or EMIs?" required>
                        <Sel value={form.hasPriorPersonalLoan} onChange={set('hasPriorPersonalLoan')} options={[
                          { value: 'YES', label: 'Yes — I have running EMI(s)' },
                          { value: 'NO', label: 'No — I have no running EMIs' },
                        ]} />
                      </F>
                      {form.hasPriorPersonalLoan === 'YES' && (
                        <F label="Total Existing Monthly EMI (₹)">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <Input
                              placeholder="e.g. 15000"
                              value={form.existingEmi}
                              onChange={set('existingEmi')}
                            />
                            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                              Enter the total combined EMI you pay each month across all existing loans.
                            </span>
                          </div>
                        </F>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Step 4: Documents ── */}
                {step === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 18 }}>📋</span>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1d4ed8' }}>Upload your KYC documents to complete the application</p>
                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#1e40af' }}>All 4 documents are required. Your application will be submitted once all are uploaded.</p>
                      </div>
                    </div>
                    {DOC_TYPES.map(doc => {
                      const state = docState[doc.key] || 'idle';
                      const file = docFiles[doc.key];
                      const isDone = state === 'done';
                      const isUploading = state === 'uploading';
                      const isError = state === 'error';
                      return (
                        <div key={doc.key} style={{
                          border: `1.5px solid ${isDone ? '#86efac' : isError ? '#fca5a5' : '#e2e8f0'}`,
                          borderRadius: 14, padding: '14px 16px',
                          background: isDone ? '#f0fdf4' : isError ? '#fef2f2' : '#f8fafc',
                          display: 'flex', alignItems: 'center', gap: 14, transition: 'all 200ms',
                        }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: isDone ? '#dcfce7' : isError ? '#fee2e2' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                            {isDone ? '✓' : isError ? '✗' : isUploading ? '⏳' : '📄'}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isDone ? '#15803d' : '#0f172a' }}>
                              {doc.label} <span style={{ color: '#ef4444' }}>*</span>
                            </p>
                            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                              {isDone ? 'Uploaded successfully' : isError ? 'Upload failed — try again' : doc.hint}
                            </p>
                            {file && !isDone && (
                              <p style={{ margin: '2px 0 0', fontSize: 11, color: '#475569', fontWeight: 600 }}>
                                {file.name} ({(file.size / 1024).toFixed(0)} KB)
                              </p>
                            )}
                          </div>
                          {!isDone && (
                            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                              <label style={{ padding: '8px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 700, color: '#475569', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                {file ? 'Change' : 'Choose File'}
                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }}
                                  onChange={e => handleDocFileChange(doc.key, e.target.files?.[0] ?? null)} />
                              </label>
                              {file && (
                                <button onClick={() => handleDocUpload(doc.key)} disabled={isUploading}
                                  style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: isUploading ? '#94a3b8' : 'linear-gradient(135deg,#0A1F44,#1e3a6e)', color: '#fff', fontSize: 12, fontWeight: 800, cursor: isUploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
                                  {isUploading ? 'Uploading…' : 'Upload'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', margin: '4px 0 0' }}>
                      Accepted formats: PDF, JPG, PNG · Max 10 MB per file
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div style={{ padding: '16px 32px 24px', display: 'flex', gap: 12, justifyContent: 'space-between', borderTop: '1px solid #f8fafc' }}>
                <button
                  onClick={back}
                  disabled={step === 0 || step === 4}
                  style={{
                    padding: '12px 28px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                    background: (step === 0 || step === 4) ? '#f8fafc' : '#fff', fontSize: 14, fontWeight: 700,
                    color: (step === 0 || step === 4) ? '#cbd5e1' : '#475569',
                    cursor: (step === 0 || step === 4) ? 'default' : 'pointer',
                  }}
                >
                  ← Back
                </button>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Step {step + 1} of {STEPS.length}</span>
                  {step < 3 && (
                    <button onClick={next} style={{
                      padding: '12px 32px', borderRadius: 12, border: 'none',
                      background: 'linear-gradient(135deg,#0A1F44,#1e3a6e)', color: '#fff',
                      fontSize: 14, fontWeight: 800, cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(10,31,68,0.22)',
                    }}>Continue →</button>
                  )}
                  {step === 3 && (
                    <button onClick={handleSubmit} disabled={loading} style={{
                      padding: '12px 32px', borderRadius: 12, border: 'none',
                      background: loading ? '#94a3b8' : 'linear-gradient(135deg,#0A1F44,#1e3a6e)',
                      color: '#fff', fontSize: 14, fontWeight: 800,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: loading ? 'none' : '0 6px 20px rgba(10,31,68,0.22)',
                    }}>
                      {loading ? 'Saving…' : 'Save & Continue to Documents →'}
                    </button>
                  )}
                  {step === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      {!allRequiredUploaded && (
                        <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
                          Upload all 4 required documents to submit
                        </span>
                      )}
                      <button
                        onClick={() => { if (allRequiredUploaded) setSuccess(true); }}
                        disabled={!allRequiredUploaded}
                        style={{
                          padding: '12px 32px', borderRadius: 12, border: 'none',
                          background: allRequiredUploaded
                            ? 'linear-gradient(135deg,#D4AF37,#B8960C)'
                            : '#e2e8f0',
                          color: allRequiredUploaded ? '#0A1F44' : '#94a3b8',
                          fontSize: 14, fontWeight: 800,
                          cursor: allRequiredUploaded ? 'pointer' : 'not-allowed',
                          boxShadow: allRequiredUploaded ? '0 6px 20px rgba(212,175,55,0.35)' : 'none',
                          transition: 'all 300ms',
                        }}
                      >
                        Submit Application ✓
                      </button>
                    </div>
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
