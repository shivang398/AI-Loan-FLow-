import React, { useState, useMemo } from 'react';
import { Slider, InputNumber, Select, Row, Col, Table, Tabs, Typography } from 'antd';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const { Title, Text } = Typography;

const LOAN_TYPES = [
  { label: 'Personal Loan', value: 'personal', minRate: 10.5, maxRate: 24, minTenure: 12, maxTenure: 60 },
  { label: 'Home Loan', value: 'home', minRate: 8.4, maxRate: 12, minTenure: 60, maxTenure: 300 },
  { label: 'Car Loan', value: 'car', minRate: 8.75, maxRate: 15, minTenure: 12, maxTenure: 84 },
  { label: 'Business Loan', value: 'business', minRate: 14, maxRate: 28, minTenure: 12, maxTenure: 48 },
  { label: 'Education Loan', value: 'education', minRate: 8.15, maxRate: 15, minTenure: 60, maxTenure: 180 },
  { label: 'Loan Against Property', value: 'lap', minRate: 9, maxRate: 16, minTenure: 12, maxTenure: 180 },
  { label: 'Gold Loan', value: 'gold', minRate: 7.5, maxRate: 18, minTenure: 3, maxTenure: 36 },
];

function calcEMI(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function buildSchedule(principal: number, annualRate: number, months: number, emi: number) {
  const r = annualRate / 12 / 100;
  let balance = principal;
  const rows = [];
  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    rows.push({
      month: i,
      emi: Math.round(emi),
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }
  return rows;
}

const BANK_RATES = [
  { bank: 'SBI', personalLoan: '11.15%', homeLoan: '8.50%', carLoan: '8.85%', business: '14.10%' },
  { bank: 'HDFC Bank', personalLoan: '10.85%', homeLoan: '8.70%', carLoan: '8.90%', business: '15.00%' },
  { bank: 'ICICI Bank', personalLoan: '10.80%', homeLoan: '8.75%', carLoan: '9.00%', business: '16.00%' },
  { bank: 'Axis Bank', personalLoan: '10.49%', homeLoan: '8.75%', carLoan: '8.95%', business: '14.95%' },
  { bank: 'Kotak Mahindra', personalLoan: '10.99%', homeLoan: '8.65%', carLoan: '8.75%', business: '17.00%' },
  { bank: 'Bank of Baroda', personalLoan: '11.40%', homeLoan: '8.40%', carLoan: '8.75%', business: '14.00%' },
  { bank: 'Punjab National Bank', personalLoan: '11.75%', homeLoan: '8.45%', carLoan: '8.80%', business: '14.50%' },
  { bank: 'IDFC First Bank', personalLoan: '10.75%', homeLoan: '8.85%', carLoan: '9.10%', business: '15.75%' },
  { bank: 'IndusInd Bank', personalLoan: '10.49%', homeLoan: '8.80%', carLoan: '9.25%', business: '16.00%' },
  { bank: 'YES Bank', personalLoan: '11.05%', homeLoan: '8.95%', carLoan: '9.50%', business: '16.50%' },
];

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Math.round(n));

const EmiCalculator: React.FC = () => {
  const [loanType, setLoanType] = useState('personal');
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.85);
  const [tenure, setTenure] = useState(36);
  const [showSchedule, setShowSchedule] = useState(false);

  const selected = LOAN_TYPES.find(t => t.value === loanType)!;

  const emi = useMemo(() => calcEMI(principal, rate, tenure), [principal, rate, tenure]);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - principal;
  const schedule = useMemo(() => buildSchedule(principal, rate, tenure, emi), [principal, rate, tenure, emi]);

  // Yearly summary for chart
  const yearlySummary = useMemo(() => {
    const years: { year: string; principal: number; interest: number }[] = [];
    for (let y = 1; y <= Math.ceil(tenure / 12); y++) {
      const start = (y - 1) * 12;
      const end = Math.min(y * 12, tenure);
      const slice = schedule.slice(start, end);
      years.push({
        year: `Yr ${y}`,
        principal: slice.reduce((s, r) => s + r.principal, 0),
        interest: slice.reduce((s, r) => s + r.interest, 0),
      });
    }
    return years;
  }, [schedule, tenure]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#4f46e5' },
    { name: 'Interest', value: Math.round(totalInterest), color: '#f97316' },
  ];

  const scheduleColumns = [
    { title: 'Month', dataIndex: 'month', key: 'month', width: 70 },
    { title: 'EMI', dataIndex: 'emi', key: 'emi', render: (v: number) => fmt(v) },
    { title: 'Principal', dataIndex: 'principal', key: 'principal', render: (v: number) => <Text style={{ color: '#4f46e5', fontWeight: 600 }}>{fmt(v)}</Text> },
    { title: 'Interest', dataIndex: 'interest', key: 'interest', render: (v: number) => <Text style={{ color: '#f97316', fontWeight: 600 }}>{fmt(v)}</Text> },
    { title: 'Balance', dataIndex: 'balance', key: 'balance', render: (v: number) => fmt(v) },
  ];

  const rateColumns = [
    { title: 'Bank', dataIndex: 'bank', key: 'bank', render: (v: string) => <Text strong>{v}</Text> },
    { title: 'Personal Loan', dataIndex: 'personalLoan', key: 'pl' },
    { title: 'Home Loan', dataIndex: 'homeLoan', key: 'hl' },
    { title: 'Car Loan', dataIndex: 'carLoan', key: 'cl' },
    { title: 'Business', dataIndex: 'business', key: 'bus' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          Financial Tools
        </div>
        <Title level={2} style={{ margin: 0 }}>EMI Calculator</Title>
        <Text style={{ color: 'var(--text-muted)' }}>Calculate loan EMIs as per Indian banking standards</Text>
      </div>

      <Tabs defaultActiveKey="calculator" items={[
        {
          key: 'calculator',
          label: 'EMI Calculator',
          children: (
            <Row gutter={[24, 24]}>
              {/* Controls */}
              <Col xs={24} lg={12}>
                <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid var(--surface-3)' }}>
                  <div style={{ marginBottom: 24 }}>
                    <Text style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                      Loan Type
                    </Text>
                    <Select
                      value={loanType}
                      onChange={v => {
                        setLoanType(v);
                        const t = LOAN_TYPES.find(l => l.value === v)!;
                        setRate(t.minRate);
                        setTenure(Math.min(36, t.maxTenure));
                        if (principal > 50000000) setPrincipal(500000);
                      }}
                      options={LOAN_TYPES.map(t => ({ value: t.value, label: t.label }))}
                      style={{ width: '100%' }}
                      size="large"
                    />
                  </div>

                  {/* Principal */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontWeight: 700, fontSize: 13 }}>Loan Amount</Text>
                      <InputNumber
                        value={principal}
                        onChange={v => setPrincipal(v || 100000)}
                        formatter={v => `₹ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={v => Number(v!.replace(/₹\s?|(,*)/g, ''))}
                        min={50000}
                        max={loanType === 'home' ? 100000000 : 10000000}
                        style={{ width: 160 }}
                        size="small"
                      />
                    </div>
                    <Slider
                      min={50000} max={loanType === 'home' ? 10000000 : 5000000}
                      step={50000} value={principal} onChange={setPrincipal}
                      tooltip={{ formatter: (v) => fmt(v!) }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>₹50,000</Text>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {loanType === 'home' ? '₹1 Cr' : '₹50 Lakh'}
                      </Text>
                    </div>
                  </div>

                  {/* Rate */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontWeight: 700, fontSize: 13 }}>Interest Rate (per annum)</Text>
                      <InputNumber
                        value={rate}
                        onChange={v => setRate(v || selected.minRate)}
                        min={selected.minRate}
                        max={selected.maxRate}
                        step={0.05}
                        precision={2}
                        formatter={v => `${v}%`}
                        parser={v => Number(v!.replace('%', ''))}
                        style={{ width: 90 }}
                        size="small"
                      />
                    </div>
                    <Slider
                      min={selected.minRate} max={selected.maxRate}
                      step={0.05} value={rate} onChange={setRate}
                      tooltip={{ formatter: (v) => `${v}%` }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.minRate}%</Text>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.maxRate}%</Text>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontWeight: 700, fontSize: 13 }}>Tenure</Text>
                      <InputNumber
                        value={tenure}
                        onChange={v => setTenure(v || selected.minTenure)}
                        min={selected.minTenure}
                        max={selected.maxTenure}
                        formatter={v => `${v} mo`}
                        parser={v => Number(v!.replace(' mo', ''))}
                        style={{ width: 90 }}
                        size="small"
                      />
                    </div>
                    <Slider
                      min={selected.minTenure} max={selected.maxTenure}
                      step={6} value={tenure} onChange={setTenure}
                      tooltip={{ formatter: (v) => `${v} months (${(v! / 12).toFixed(1)} yrs)` }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.minTenure} mo</Text>
                      <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.maxTenure} mo</Text>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Results */}
              <Col xs={24} lg={12}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* EMI Card */}
                  <div style={{
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    borderRadius: 20, padding: '28px 32px', color: 'white',
                  }}>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Monthly EMI
                    </Text>
                    <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.02em', margin: '8px 0 20px' }}>
                      {fmt(emi)}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                          Total Payable
                        </Text>
                        <Text style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>{fmt(totalPayable)}</Text>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                          Total Interest
                        </Text>
                        <Text style={{ color: '#f97316', fontWeight: 800, fontSize: 16 }}>{fmt(totalInterest)}</Text>
                      </div>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--surface-3)', height: 220 }}>
                    <ResponsiveContainer width="100%" height={172} debounce={10}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="40%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          dataKey="value"
                          strokeWidth={2}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(v) => fmt(Number(v))} />
                        <Legend
                          layout="vertical"
                          align="right"
                          verticalAlign="middle"
                          formatter={(value, entry: any) => (
                            <span style={{ fontSize: 12 }}>
                              {value}: {fmt(entry.payload.value)}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Amortization link */}
                  <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    style={{
                      width: '100%', height: 44, borderRadius: 12,
                      background: showSchedule ? '#f0f9ff' : 'white',
                      border: `1px solid ${showSchedule ? '#3b82f6' : 'var(--surface-3)'}`,
                      color: '#3b82f6', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    {showSchedule ? 'Hide' : 'View'} Amortization Schedule
                  </button>
                </div>
              </Col>

              {/* Yearly Breakdown Chart */}
              <Col span={24}>
                <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--surface-3)' }}>
                  <Title level={5} style={{ marginBottom: 20 }}>Yearly Principal vs Interest</Title>
                  <div style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height={200} debounce={10}>
                      <LineChart data={yearlySummary} margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                        <RechartsTooltip formatter={(v) => fmt(Number(v))} />
                        <Legend />
                        <Line type="monotone" dataKey="principal" stroke="#4f46e5" strokeWidth={2} dot={false} name="Principal Paid" />
                        <Line type="monotone" dataKey="interest" stroke="#f97316" strokeWidth={2} dot={false} name="Interest Paid" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>

              {/* Amortization Table */}
              {showSchedule && (
                <Col span={24}>
                  <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--surface-3)' }}>
                    <Title level={5} style={{ marginBottom: 16 }}>Full Amortization Schedule</Title>
                    <Table
                      dataSource={schedule}
                      columns={scheduleColumns}
                      rowKey="month"
                      size="small"
                      pagination={{ pageSize: 12, showSizeChanger: false }}
                      scroll={{ x: 500 }}
                    />
                  </div>
                </Col>
              )}
            </Row>
          ),
        },
        {
          key: 'rates',
          label: 'Bank Rates Reference',
          children: (
            <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--surface-3)' }}>
              <div style={{ marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0 }}>Current Interest Rates (Indicative)</Title>
                <Text style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                  Rates are indicative and may vary based on customer profile. Updated May 2026.
                </Text>
              </div>
              <Table
                dataSource={BANK_RATES}
                columns={rateColumns}
                rowKey="bank"
                pagination={false}
                size="middle"
              />
            </div>
          ),
        },
      ]} />
    </div>
  );
};

export default EmiCalculator;
