import React from 'react';
import { Drawer, Typography, Avatar, Card, Button, Space, Timeline, Spin } from 'antd';
import { CheckCircle2, FileText, Activity, ClipboardCheck, Eye, ShieldCheck, PhoneCall } from 'lucide-react';
import { Lead } from '../types';
import { formatAmount, formatLoanType, formatElapsed } from '../../../shared/utils/formatters';

const { Text, Title } = Typography;

interface Props {
  lead: Lead | null;
  open: boolean;
  leadDocs: Record<string, { id: string; fileName?: string }>;
  loadingDocs: boolean;
  viewingDoc: string | null;
  notesValue: string;
  notesSaving: boolean;
  notesSaved: boolean;
  actionLoading: boolean;
  onClose: () => void;
  onNotesChange: (v: string) => void;
  onSaveNotes: () => void;
  onViewDoc: (docId: string) => void;
  onReviewDoc: (docId: string, label: string) => void;
  onOpenDocsModal: () => void;
  onAssign: () => void;
  onUpdateStatus: (status: string, msg: string) => void;
}

const LeadDetailDrawer: React.FC<Props> = ({
  lead, open, leadDocs, loadingDocs, viewingDoc, notesValue, notesSaving, notesSaved,
  actionLoading, onClose, onNotesChange, onSaveNotes, onViewDoc, onReviewDoc,
  onOpenDocsModal, onAssign, onUpdateStatus,
}) => {
  if (!lead) return null;

  return (
    <Drawer
      title={null}
      placement="right"
      width={600}
      onClose={onClose}
      open={open}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
        {/* Header */}
        <div style={{ background: '#fff', padding: '24px 28px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <span style={{ background: '#eef2ff', color: '#4f46e5', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Lead Review
              </span>
              <Title level={3} style={{ margin: '6px 0 0', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a' }}>
                {lead.firstName} {lead.lastName}
              </Title>
            </div>
            <Avatar size={46} style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontWeight: 900, fontSize: 18 }}>
              {lead.firstName[0]}
            </Avatar>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Loan Amount',    value: formatAmount(lead.loanAmount) },
              { label: 'Loan Type',      value: formatLoanType(lead.loanType) },
              { label: 'Lead Age',       value: formatElapsed(lead.createdAt) },
              { label: 'Assigned To',    value: lead.assignedTo || 'Unassigned' },
              { label: 'Profession',     value: lead.profession || '—' },
              { label: 'Monthly Salary', value: lead.netMonthlySalary ? formatAmount(lead.netMonthlySalary) : '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{label}</Text>
                <Text style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{value}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, padding: '20px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Personal Info */}
          <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={13} color="#4f46e5" /> Personal Information
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Email',          value: lead.email },
                { label: 'Mobile',         value: lead.mobile },
                { label: 'Alt. Contact',   value: lead.alternateContact || '—' },
                { label: 'WhatsApp',       value: lead.whatsappNo || '—' },
                { label: 'Official Email', value: lead.officialEmail || '—' },
                { label: 'Gender',         value: lead.gender || '—' },
                { label: 'Marital Status', value: lead.maritalStatus || '—' },
                { label: 'Date of Birth',  value: lead.dob || '—' },
                { label: 'PAN Number',     value: lead.panNumber },
              ].map(({ label, value }) => (
                <div key={label}>
                  <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</Text>
                  <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12 }}>{value}</Text>
                </div>
              ))}
            </div>
          </Card>

          {/* Address */}
          <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={13} color="#059669" /> Address Details
            </Title>
            <div style={{ marginBottom: 10 }}>
              <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Current Address</Text>
              <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                {[lead.currentAddressLine1, lead.currentAddressLine2, lead.currentCity, lead.currentDistrict, lead.currentState, lead.currentPincode].filter(Boolean).join(', ') || '—'}
              </Text>
              {lead.residenceType && (
                <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, color: '#6366f1', background: '#eef2ff', borderRadius: 6, padding: '2px 8px' }}>
                  {lead.residenceType}
                </span>
              )}
            </div>
            <div>
              <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Permanent Address</Text>
              <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                {[lead.permanentAddressLine1, lead.permanentAddressLine2, lead.permanentCity, lead.permanentDistrict, lead.permanentState, lead.permanentPincode].filter(Boolean).join(', ') || '—'}
              </Text>
            </div>
          </Card>

          {/* Employment */}
          <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={13} color="#f59e0b" /> Employment & Finances
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[
                { label: 'Job Type',      value: lead.jobType || '—' },
                { label: 'Designation',   value: lead.designation || '—' },
                { label: 'Salary Mode',   value: lead.modeOfSalary || '—' },
                { label: 'Existing EMI',  value: lead.existingEmi ? formatAmount(lead.existingEmi) : '₹0' },
                { label: 'Prior PL Loan', value: lead.hasPriorPersonalLoan != null ? (lead.hasPriorPersonalLoan ? 'Yes' : 'No') : '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</Text>
                  <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12 }}>{value}</Text>
                </div>
              ))}
            </div>
            <div>
              <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Office Address</Text>
              <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                {[lead.officeAddress, lead.officeCity, lead.officeDistrict, lead.officeState, lead.officePincode].filter(Boolean).join(', ') || '—'}
              </Text>
            </div>
          </Card>

          {/* KYC Documents */}
          <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={13} color="#10b981" /> KYC Documents
            </Title>
            {loadingDocs ? (
              <Spin size="small" />
            ) : (
              <Timeline items={[
                { key: 'PAN_CARD',       label: 'PAN Card' },
                { key: 'AADHAAR_CARD',   label: 'Aadhaar Card' },
                { key: 'BANK_STATEMENT', label: 'Bank Statement (6 months)' },
                { key: 'SALARY_SLIP',    label: 'Salary Slips (3 months)' },
              ].map(({ key, label }) => {
                const doc = leadDocs[key];
                return {
                  color: doc ? 'green' : 'gray',
                  children: (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontWeight: doc ? 700 : 600, color: doc ? '#15803d' : '#94a3b8', fontSize: 12 }}>
                        {label} — {doc ? '✓ Submitted' : 'Not uploaded'}
                      </Text>
                      {doc && (
                        <Space size={4}>
                          <Button
                            size="small"
                            icon={<Eye size={12} />}
                            loading={viewingDoc === doc.id}
                            onClick={() => onViewDoc(doc.id)}
                            style={{ fontWeight: 700, fontSize: 11, borderRadius: 6, height: 26, padding: '0 8px', background: '#4f46e5', color: '#fff', border: 'none' }}
                          >Open</Button>
                          <Button
                            size="small"
                            icon={<ShieldCheck size={12} />}
                            onClick={() => onReviewDoc(doc.id, label)}
                            style={{ fontWeight: 700, fontSize: 11, borderRadius: 6, height: 26, padding: '0 8px', background: '#ecfdf5', color: '#059669', border: '1px solid #bbf7d0' }}
                          >Review</Button>
                        </Space>
                      )}
                    </div>
                  ),
                };
              })} />
            )}
          </Card>

          {/* Ops Notes */}
          <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
            <Title level={5} style={{ fontWeight: 900, marginBottom: 10, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ClipboardCheck size={13} color="#4f46e5" /> Ops Notes
            </Title>
            <textarea
              value={notesValue}
              onChange={e => onNotesChange(e.target.value)}
              placeholder="Add internal notes about this lead — document requests, call logs, issues, next steps…"
              style={{
                width: '100%', minHeight: 100, padding: '10px 12px', borderRadius: 10,
                border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 500, color: '#334155',
                fontFamily: 'Inter, sans-serif', resize: 'vertical', outline: 'none',
                background: '#f8fafc', boxSizing: 'border-box', lineHeight: 1.6,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, gap: 8, alignItems: 'center' }}>
              {notesSaved && <Text style={{ fontSize: 11, color: '#10b981', fontWeight: 700 }}>✓ Saved</Text>}
              <Button
                size="small"
                loading={notesSaving}
                onClick={onSaveNotes}
                style={{ borderRadius: 8, fontWeight: 700, fontSize: 11, background: '#4f46e5', color: '#fff', border: 'none' }}
              >
                Save Notes
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer actions */}
        <div style={{ background: '#fff', padding: '20px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button
            icon={<PhoneCall size={15} />}
            onClick={onAssign}
            style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #a5f3fc', color: '#0e7490', background: '#ecfeff', fontSize: 13 }}
          >
            Assign Telecaller
          </Button>
          {Object.keys(leadDocs).length > 0 && (
            <Button
              onClick={onOpenDocsModal}
              style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #bfdbfe', color: '#1d4ed8', background: '#eff6ff', fontSize: 13 }}
            >
              View Documents
            </Button>
          )}
          {lead.status !== 'QUERY_RAISED' && lead.status !== 'RESOLVED' && (
            <Button
              loading={actionLoading}
              onClick={() => onUpdateStatus('QUERY_RAISED', 'Asked customer for more information')}
              style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #fca5a5', color: '#dc2626', fontSize: 13 }}
            >
              Ask for Info
            </Button>
          )}
          {lead.status === 'QUERY_RAISED' && (
            <Button
              loading={actionLoading}
              onClick={() => onUpdateStatus('IN_REVIEW', 'Info received — continuing review')}
              style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #93c5fd', color: '#1d4ed8', fontSize: 13 }}
            >
              Continue Checking
            </Button>
          )}
          {lead.status === 'NEW' && (
            <Button
              type="primary"
              loading={actionLoading}
              onClick={() => onUpdateStatus('IN_REVIEW', 'Started checking the application')}
              style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, background: '#059669', border: 'none', fontSize: 13 }}
            >
              Start Checking
            </Button>
          )}
          {lead.status === 'IN_REVIEW' && (
            <Button
              type="primary"
              loading={actionLoading}
              onClick={() => onUpdateStatus('RESOLVED', 'Application verified and closed')}
              style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, background: '#4f46e5', border: 'none', fontSize: 13 }}
            >
              Mark as Done
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default LeadDetailDrawer;
