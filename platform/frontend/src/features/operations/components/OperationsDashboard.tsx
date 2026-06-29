import React, { useState, useEffect } from 'react';
import { Typography, App, Modal, Space, Button } from 'antd';
import { Activity, ClipboardCheck, ShieldAlert, Users, TrendingUp, FileText, Eye, ShieldCheck } from 'lucide-react';
import api from '../../../shared/services/apiClient';
import LoanTimeline from '../../documents/components/LoanTimeline';
import LeadsQueueTable from './LeadsQueueTable';
import LeadDetailDrawer from './LeadDetailDrawer';
import AssignTelecallerModal from './AssignTelecallerModal';
import DocReviewModal from './DocReviewModal';
import { Lead } from '../types';

const { Text, Title } = Typography;

const openSafeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch {
    // invalid URL
  }
};

const OperationsDashboard: React.FC = () => {
  const { notification } = App.useApp();

  // ── Leads ──────────────────────────────────────────────────────────────────
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // ── Lead detail drawer ─────────────────────────────────────────────────────
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [leadDocs, setLeadDocs] = useState<Record<string, { id: string; fileName?: string }>>({});
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [notesValue, setNotesValue] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // ── Loan history ───────────────────────────────────────────────────────────
  const [historyLead, setHistoryLead] = useState<Lead | null>(null);

  // ── Document review ────────────────────────────────────────────────────────
  const [reviewTarget, setReviewTarget] = useState<{ docId: string; label: string } | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'APPROVED' | 'REJECTED'>('APPROVED');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // ── Telecaller assignment ──────────────────────────────────────────────────
  const [telecallers, setTelecallers] = useState<{ label: string; value: string }[]>([]);
  const [assignModalLead, setAssignModalLead] = useState<Lead | null>(null);
  const [assignEmail, setAssignEmail] = useState('');
  const [assignLoading, setAssignLoading] = useState(false);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await api.get('/customers/leads');
      const data = res.data?.data ?? res.data ?? {};
      setLeads(Array.isArray(data) ? data : (data.items ?? []));
    } catch {
      // table shows empty state
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.get('/connectors', { params: { roles: 'TELECALLER', size: 200 } })
      .then(res => {
        const items: any[] = res.data?.data?.items ?? res.data?.data ?? [];
        setTelecallers(items.map(t => ({
          label: `${t.firstName} ${t.lastName || ''} (${t.email})`.trim(),
          value: t.email,
        })));
      })
      .catch(() => {});
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleViewDetail = async (lead: Lead) => {
    setDrawerLead(lead);
    setIsDrawerOpen(true);
    setNotesValue(lead.opsNotes || '');
    setNotesSaved(false);
    const docOwnerId = lead.customerId || lead.id;
    setLoadingDocs(true);
    try {
      const res = await api.get(`/documents/by-customer/${docOwnerId}`);
      const docs: any[] = res.data?.data ?? [];
      const map: Record<string, { id: string; fileName?: string }> = {};
      docs.forEach((d: any) => { if (d.documentType && d.id) map[d.documentType] = { id: d.id, fileName: d.fileName }; });
      setLeadDocs(map);
    } catch {
      setLeadDocs({});
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleViewDoc = async (docId: string) => {
    setViewingDoc(docId);
    try {
      const res = await api.get(`/documents/${docId}/presigned-url`);
      const url: string = res.data?.data ?? res.data;
      if (url) openSafeUrl(url);
    } catch {
      notification.error({ message: 'Could not open document. Please try again.', style: { borderRadius: 12 } });
    } finally {
      setViewingDoc(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!drawerLead) return;
    setNotesSaving(true);
    try {
      await api.put(`/customers/leads/${drawerLead.id}/notes`, { notes: notesValue });
      setLeads(prev => prev.map(l => l.id === drawerLead.id ? { ...l, opsNotes: notesValue } : l));
      setDrawerLead(prev => prev ? { ...prev, opsNotes: notesValue } : null);
      setNotesSaved(true);
    } catch {
      // user can retry
    } finally {
      setNotesSaving(false);
    }
  };

  const handleReviewDoc = async () => {
    if (!reviewTarget) return;
    setReviewLoading(true);
    try {
      await api.put(`/documents/${reviewTarget.docId}/review`, { status: reviewStatus, remarks: reviewRemarks });
      notification.success({ message: `Document ${reviewStatus === 'APPROVED' ? 'approved' : 'rejected'} successfully`, style: { borderRadius: 16, border: '1px solid #d1fae5' } });
      setReviewTarget(null);
      setReviewRemarks('');
    } catch (err: any) {
      notification.error({ message: err?.response?.data?.message || 'Failed to review document', style: { borderRadius: 16 } });
    } finally {
      setReviewLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!assignModalLead || !assignEmail) return;
    setAssignLoading(true);
    try {
      await api.put(`/customers/leads/${assignModalLead.id}`, { assignedTo: assignEmail });
      setLeads(prev => prev.map(l => l.id === assignModalLead.id ? { ...l, assignedTo: assignEmail } : l));
      if (drawerLead?.id === assignModalLead.id) setDrawerLead(prev => prev ? { ...prev, assignedTo: assignEmail } : null);
      notification.success({ message: `Lead assigned to ${assignEmail}`, style: { borderRadius: 16, border: '1px solid #d1fae5' } });
      setAssignModalLead(null);
      setAssignEmail('');
    } catch (err: any) {
      notification.error({ message: err?.response?.data?.message || 'Failed to assign lead', style: { borderRadius: 16 } });
    } finally {
      setAssignLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string, successMsg: string) => {
    if (!drawerLead) return;
    setActionLoading(true);
    try {
      await api.put(`/customers/leads/${drawerLead.id}/status`, { status: newStatus });
      setLeads(prev => prev.map(l => l.id === drawerLead.id ? { ...l, status: newStatus } : l));
      setDrawerLead(prev => prev ? { ...prev, status: newStatus } : null);
      notification.success({ message: successMsg, style: { borderRadius: 16, border: '1px solid #d1fae5' } });
      if (newStatus === 'RESOLVED') setIsDrawerOpen(false);
    } catch (err: any) {
      notification.error({ message: err?.response?.data?.message || 'Failed to update lead status', style: { borderRadius: 16 } });
    } finally {
      setActionLoading(false);
    }
  };

  const newCount = leads.filter(l => l.status === 'NEW').length;
  const uniqueOps = [...new Set(leads.map(l => l.assignedTo).filter(Boolean))].length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: 'calc(100vh - 152px)' }}>

      {/* KPI Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 16,
        alignItems: 'center', background: '#ffffff', borderRadius: 20,
        padding: '18px 24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', flexShrink: 0,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="#4f46e5" />
            </div>
            <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Operations · Live Queue
            </Text>
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: '-0.03em', color: '#0f172a' }}>Leads Dashboard</Title>
        </div>
        {[
          { icon: <ClipboardCheck size={17} color="#7c3aed" />, bg: '#f5f3ff', value: leads.length, label: 'Total Leads', valueBg: '#7c3aed', labelBg: '#a78bfa' },
          { icon: <ShieldAlert size={17} color="#ef4444" />,    bg: '#fef2f2', value: newCount,     label: 'New Leads',   valueBg: '#dc2626', labelBg: '#f87171' },
          { icon: <Users size={17} color="#10b981" />,          bg: '#ecfdf5', value: uniqueOps,   label: 'Ops Members', valueBg: '#059669', labelBg: '#34d399' },
        ].map(({ icon, bg, value, label, valueBg, labelBg }) => (
          <div key={label} style={{ background: bg, borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
            <div>
              <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: valueBg, lineHeight: 1 }}>{value}</Text>
              <Text style={{ fontSize: 10, fontWeight: 700, color: labelBg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</Text>
            </div>
          </div>
        ))}
        <div style={{ background: '#eff6ff', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={17} color="#3b82f6" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 16, color: '#2563eb', lineHeight: 1 }}>Auto</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Round Robin</Text>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <LeadsQueueTable
          leads={leads}
          loading={loadingLeads}
          onRefresh={fetchLeads}
          onViewDetail={handleViewDetail}
          onViewHistory={lead => setHistoryLead(lead)}
          onAssign={lead => { setAssignModalLead(lead); setAssignEmail(lead.assignedTo || ''); }}
        />
      </div>

      {/* Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={drawerLead}
        open={isDrawerOpen}
        leadDocs={leadDocs}
        loadingDocs={loadingDocs}
        viewingDoc={viewingDoc}
        notesValue={notesValue}
        notesSaving={notesSaving}
        notesSaved={notesSaved}
        actionLoading={actionLoading}
        onClose={() => setIsDrawerOpen(false)}
        onNotesChange={v => { setNotesValue(v); setNotesSaved(false); }}
        onSaveNotes={handleSaveNotes}
        onViewDoc={handleViewDoc}
        onReviewDoc={(docId, label) => { setReviewTarget({ docId, label }); setReviewStatus('APPROVED'); setReviewRemarks(''); }}
        onOpenDocsModal={() => setDocsModalOpen(true)}
        onAssign={() => drawerLead && (setAssignModalLead(drawerLead), setAssignEmail(drawerLead.assignedTo || ''))}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* View KYC Docs Modal */}
      <Modal
        open={docsModalOpen}
        onCancel={() => setDocsModalOpen(false)}
        footer={null}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={16} color="#4f46e5" />
            <span style={{ fontWeight: 900, fontSize: 15, color: '#1e293b' }}>
              KYC Documents — {drawerLead?.firstName} {drawerLead?.lastName}
            </span>
          </div>
        }
        width={480}
        styles={{ body: { padding: '20px 24px' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'PAN_CARD',       label: 'PAN Card',                  icon: '🪪' },
            { key: 'AADHAAR_CARD',   label: 'Aadhaar Card',              icon: '📋' },
            { key: 'BANK_STATEMENT', label: 'Bank Statement (6 months)', icon: '🏦' },
            { key: 'SALARY_SLIP',    label: 'Salary Slips (3 months)',   icon: '💰' },
          ].map(({ key, label, icon }) => {
            const doc = leadDocs[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: doc ? '#f0fdf4' : '#f8fafc', border: `1px solid ${doc ? '#bbf7d0' : '#e2e8f0'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: doc ? '#15803d' : '#94a3b8' }}>{label}</div>
                    <div style={{ fontSize: 11, color: doc ? '#16a34a' : '#cbd5e1', fontWeight: 600 }}>{doc ? '✓ Submitted' : 'Not uploaded'}</div>
                  </div>
                </div>
                {doc ? (
                  <Space size={6}>
                    <Button
                      size="small"
                      icon={<Eye size={12} />}
                      loading={viewingDoc === doc.id}
                      onClick={() => handleViewDoc(doc.id)}
                      style={{ fontWeight: 700, fontSize: 12, borderRadius: 8, height: 30, padding: '0 12px', background: '#4f46e5', color: '#fff', border: 'none' }}
                    >Open</Button>
                    <Button
                      size="small"
                      icon={<ShieldCheck size={12} />}
                      onClick={() => { setReviewTarget({ docId: doc.id, label }); setReviewStatus('APPROVED'); setReviewRemarks(''); }}
                      style={{ fontWeight: 700, fontSize: 12, borderRadius: 8, height: 30, padding: '0 10px', background: '#ecfdf5', color: '#059669', border: '1px solid #bbf7d0' }}
                    >Review</Button>
                  </Space>
                ) : (
                  <span style={{ fontSize: 11, color: '#cbd5e1', fontWeight: 600 }}>—</span>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Loan History */}
      {historyLead && (
        <LoanTimeline
          customerId={historyLead.customerId}
          loanLabel={`${historyLead.firstName} ${historyLead.lastName}`}
          onClose={() => setHistoryLead(null)}
        />
      )}

      {/* Doc Review Modal */}
      <DocReviewModal
        target={reviewTarget}
        status={reviewStatus}
        remarks={reviewRemarks}
        loading={reviewLoading}
        onChangeStatus={setReviewStatus}
        onChangeRemarks={setReviewRemarks}
        onConfirm={handleReviewDoc}
        onCancel={() => setReviewTarget(null)}
      />

      {/* Assign Telecaller Modal */}
      <AssignTelecallerModal
        lead={assignModalLead}
        telecallers={telecallers}
        assignEmail={assignEmail}
        loading={assignLoading}
        onChangeEmail={setAssignEmail}
        onConfirm={handleAssign}
        onCancel={() => { setAssignModalLead(null); setAssignEmail(''); }}
      />

      <style>{`
        .ops-queue-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #94a3b8 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          padding: 11px 14px !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ops-queue-table .ant-table-tbody > tr > td {
          padding: 14px 14px !important;
          border-bottom: 1px solid #f8fafc !important;
          transition: background 0.15s !important;
        }
        .ops-queue-table .ant-table-tbody > tr:hover > td { background: #fafafe !important; }
        .ops-queue-table .ant-table { border-radius: 0 !important; }
      `}</style>
    </div>
  );
};

export default OperationsDashboard;
