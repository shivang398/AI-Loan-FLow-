import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { App, Card, Row, Col, Statistic, Tag, Input, Space, Button, Modal, Form, Select, DatePicker, InputNumber } from 'antd';
import { Wallet, Search, AlertCircle, CheckCircle2, Clock, Download, Edit2, History } from 'lucide-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import apiClient from '../../../shared/services/apiClient';

ModuleRegistry.registerModules([AllCommunityModule]);

const { Option } = Select;

const PayoutTracker: React.FC = () => {
  const { message } = App.useApp();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [form] = Form.useForm();

  const [rowData, setRowData] = useState<any[]>([]);

  const fetchPayoutData = async () => {
    try {
      const connectorsRes = await apiClient.get('/connectors?roles=CONNECTOR');
      const connectorsList = connectorsRes.data?.data || [];
      const connectorMap = new Map(connectorsList.map((c: any) => [c.id, `${c.firstName || ''} ${c.lastName || ''}`.trim()]));

      const txRes = await apiClient.get('/commissions/transactions');
      const txList = txRes.data?.data || txRes.data || [];

      const statusMap: Record<string, string> = { PAID: 'FULLY_PAID' };
      const mapped = txList.map((t: any) => {
        const total = Number(t.totalPayout || t.connectorCommission || 0);
        const backendStatus = t.status || 'PENDING';
        const displayStatus = statusMap[backendStatus] || backendStatus;
        const paid = Number(t.amountPaid || 0);

        return {
          id: t.id,
          connectorId: t.connectorId,
          connector: connectorMap.get(t.connectorId) || 'Unknown Partner',
          totalAmount: total,
          amountPaid: paid,
          remainingAmount: Math.max(0, total - paid),
          status: displayStatus,
          date: t.paymentDate
            ? new Date(t.paymentDate).toISOString().split('T')[0]
            : t.createdAt ? new Date(t.createdAt).toISOString().split('T')[0] : '—',
        };
      });
      setRowData(mapped);
    } catch (err) {
      console.error('Failed to load payout data', err);
    }
  };

  useEffect(() => {
    fetchPayoutData();
  }, []);

  const handleUpdateClick = (data: any) => {
    setSelectedPayout(data);
    form.setFieldsValue({
      status: data.status,
      amountPaid: data.amountPaid
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (values: any) => {
    const { status, amountPaid, paymentDate } = values;
    const backendStatus = status === 'FULLY_PAID' ? 'PAID' : status;

    const body: any = { status: backendStatus };
    if (backendStatus === 'PARTIALLY_PAID' && amountPaid != null) {
      body.amountPaid = amountPaid;
    }
    if (paymentDate) {
      body.paymentDate = paymentDate.toISOString();
    }

    try {
      await apiClient.put(`/commissions/transactions/${selectedPayout.id}/status`, body);
      message.success('Payout status updated successfully.');
      setIsUpdateModalOpen(false);
      form.resetFields();
      fetchPayoutData();
    } catch (err: any) {
      message.error(err.response?.data?.message || err.message || 'Failed to update payout.');
    }
  };

  const columnDefs: any[] = [
    { field: 'id', headerName: 'Payout ID', width: 120, cellRenderer: (p: any) => <span style={{ fontWeight: 700, color: '#6366f1' }}>{p.value}</span> },
    { field: 'connector', headerName: 'Channel Partner', flex: 1.5, cellRenderer: (p: any) => <span style={{ fontWeight: 600 }}>{p.value}</span> },
    { 
      field: 'totalAmount', 
      headerName: 'Total Comm. (₹)', 
      width: 140,
      cellRenderer: (p: any) => <span style={{ fontWeight: 700, color: '#1e293b' }}>₹{p.value.toLocaleString()}</span>
    },
    { 
      field: 'amountPaid', 
      headerName: 'Paid (₹)', 
      width: 120,
      cellRenderer: (p: any) => <span style={{ fontWeight: 700, color: '#10b981' }}>₹{p.value.toLocaleString()}</span>
    },
    { 
      field: 'remainingAmount', 
      headerName: 'Pending (₹)', 
      width: 120,
      cellRenderer: (p: any) => <span style={{ fontWeight: 700, color: p.value > 0 ? '#ef4444' : '#64748b' }}>₹{p.value.toLocaleString()}</span>
    },
    { 
      field: 'status', 
      headerName: 'Settlement Status', 
      width: 160,
      cellRenderer: (p: any) => {
        const styles: any = {
          FULLY_PAID: { color: 'success', icon: <CheckCircle2 size={12} />, label: 'FULLY PAID' },
          PARTIALLY_PAID: { color: 'processing', icon: <History size={12} />, label: 'PARTIALLY PAID' },
          PENDING: { color: 'warning', icon: <Clock size={12} />, label: 'PENDING' },
          DISPUTED: { color: 'error', icon: <AlertCircle size={12} />, label: 'DISPUTED' },
        };
        const s = styles[p.value] || styles.PENDING;
        return <Tag icon={s.icon} color={s.color} style={{ borderRadius: 6, fontWeight: 700 }}>{s.label}</Tag>
      }
    },
    { field: 'date', headerName: 'Last Payment Date', width: 150 },
    {
      headerName: 'Actions',
      width: 100,
      cellRenderer: (p: any) => (
        <Button 
          type="text" 
          icon={<Edit2 size={16} />} 
          className="text-blue-600" 
          onClick={() => handleUpdateClick(p.data)}
        />
      )
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-header-title">Commission & Payout Tracker</h1>
          <span className="page-header-subtitle">Manage partial and full settlements for channel partner commissions.</span>
        </div>
        <Button icon={<Download size={16} />} type="primary" className="bg-blue-600 font-bold">Download Settlement Report</Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card variant="borderless" className="pro-card shadow-sm" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Total Commission Outflow</span>}
              value={rowData.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0)}
              prefix={<span style={{ color: 'white' }}>₹</span>}
              valueStyle={{ color: 'white', fontWeight: 800, fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="pro-card shadow-sm">
            <Statistic 
              title="Pending Settlements (To Be Paid)" 
              value={rowData.reduce((acc, curr) => acc + curr.remainingAmount, 0)} 
              prefix="₹" 
              valueStyle={{ color: '#ef4444', fontWeight: 800 }} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="pro-card shadow-sm">
            <Statistic 
              title="Amount Successfully Paid" 
              value={rowData.reduce((acc, curr) => acc + curr.amountPaid, 0)} 
              prefix="₹" 
              valueStyle={{ color: '#10b981', fontWeight: 800 }} 
            />
          </Card>
        </Col>
      </Row>

      <div className="pro-card shadow-sm" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input
            placeholder="Search by Channel Partner or Payout ID..."
            prefix={<Search size={18} className="text-slate-400" />}
            style={{ maxWidth: 400, borderRadius: 10 }}
          />
          <Space>
            <Tag color="blue" className="cursor-pointer px-3 py-1 text-sm font-bold rounded-lg border-none">Pending Only</Tag>
            <Tag className="cursor-pointer px-3 py-1 text-sm font-bold rounded-lg bg-slate-100 border-none text-slate-600">All Time</Tag>
          </Space>
        </div>
        <div className="ag-theme-alpine h-[450px] w-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowHeight={60}
            headerHeight={45}
            overlayNoRowsTemplate="<span style='color:#94a3b8;font-size:14px'>No commission records yet. They will appear here once channel partners submit disbursed cases.</span>"
          />
        </div>
      </div>

      {/* Payment Update Modal */}
      <Modal
        title={<div className="flex items-center gap-2"><Wallet size={20} className="text-blue-600" /> Update Settlement Status</div>}
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={null}
        width={450}
      >
        {selectedPayout && (
          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 font-medium">Channel Partner:</span>
              <span className="font-bold text-slate-800">{selectedPayout.connector}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 font-medium">Total Comm:</span>
              <span className="font-bold text-blue-600">₹{selectedPayout.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Pending:</span>
              <span className="font-bold text-red-500">₹{selectedPayout.remainingAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Form form={form} layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item name="status" label="Payment Status" rules={[{ required: true }]}>
            <Select>
              <Option value="FULLY_PAID">Fully Paid</Option>
              <Option value="PARTIALLY_PAID">Partially Paid</Option>
              <Option value="PENDING">Pending</Option>
              <Option value="DISPUTED">Disputed</Option>
            </Select>
          </Form.Item>

          {/* Dynamic field based on status selection could be handled here, but we will just show amount paid */}
          <Form.Item shouldUpdate className="mb-0">
            {() => {
              const currentStatus = form.getFieldValue('status');
              if (currentStatus === 'PARTIALLY_PAID') {
                return (
                  <Form.Item name="amountPaid" label="Total Amount Paid So Far (₹)" rules={[{ required: true }]}>
                    <InputNumber className="w-full" max={selectedPayout?.totalAmount} min={0} />
                  </Form.Item>
                );
              }
              return null;
            }}
          </Form.Item>

          <Form.Item name="paymentDate" label="Payment Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item className="mb-0 text-right mt-6">
            <Space>
              <Button onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600 font-bold">Confirm Update</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PayoutTracker;
