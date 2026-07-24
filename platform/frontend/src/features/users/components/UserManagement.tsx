import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { App, Button, Input, Space, Tag, Avatar, Badge, Tooltip, Modal, Form, Select, DatePicker, Row, Col, Card, Statistic, Divider, Spin } from 'antd';
import {
  Search, Download, Shield, Edit2,
  UserPlus, Briefcase, Calendar, Building2, UserCog,
  LayoutGrid, List as ListIcon, GitBranch
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

ModuleRegistry.registerModules([AllCommunityModule]);

const { Option } = Select;

const ROLE_COLORS: Record<string, string> = {
  ADMIN: '#3b82f6',
  RM: '#10b981',
  OPERATIONS: '#f59e0b',
  TEAM_LEADER: '#ec4899',
  PARTNER_MANAGER: '#8b5cf6',
  TELECALLER: '#06b6d4',
  CREDIT_BUREAU: '#0B1E3D',
};

const DEPT_MAP: Record<string, string> = {
  ADMIN: 'Executive',
  RM: 'Sales & Growth',
  OPERATIONS: 'Credit Ops',
  TEAM_LEADER: 'Sales & Growth',
  PARTNER_MANAGER: 'Partner Management',
  TELECALLER: 'Tele Sales',
  CREDIT_BUREAU: 'Credit Bureau',
};

const STAFF_ROLES = ['RM', 'OPERATIONS', 'TEAM_LEADER', 'PARTNER_MANAGER', 'TELECALLER', 'CREDIT_BUREAU'];

function connectorToRow(c: any) {
  const fullName = `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.firstName || 'Unknown';
  const role = c.platformRole || c.role || 'UNKNOWN';
  const emailPrefix = c.firstName ? `${c.firstName.toLowerCase()}.${(c.lastName || '').toLowerCase()}`.replace(/\s+/g, '') : 'employee';
  return {
    id: c.id,
    userId: c.userId,
    empId: `RMG-${c.id?.substring(0, 6).toUpperCase() || '???'}`,
    name: fullName,
    email: c.email || `${emailPrefix}@platform.com`,
    role,
    department: DEPT_MAP[role] || role,
    status: c.status || 'ACTIVE',
    joinDate: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : '—',
    initials: fullName.split(' ').filter(Boolean).map((n: string) => n[0]).join('').toUpperCase().substring(0, 2),
    color: ROLE_COLORS[role] || '#6366f1',
  };
}

const UserManagement: React.FC = () => {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [form] = Form.useForm();
  const [staffData, setStaffData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/connectors', { params: { roles: STAFF_ROLES.join(',') } });
      const list = res.data?.data?.items ?? res.data?.data ?? [];
      setStaffData(list.map(connectorToRow));
    } catch (err) {
      console.error('Failed to fetch staff', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  // Apply department filter + search whenever data, filter, or search changes
  useEffect(() => {
    let result = staffData;
    if (deptFilter !== 'all') {
      const deptValue = deptFilter === 'sales' ? 'Sales & Growth'
        : deptFilter === 'credit' ? 'Credit Ops'
        : deptFilter === 'partner' ? 'Partner Management'
        : deptFilter === 'telesales' ? 'Tele Sales'
        : null;
      if (deptValue) result = result.filter(s => s.department === deptValue);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.empId.toLowerCase().includes(term) ||
        s.department.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
      );
    }
    setFilteredData(result);
  }, [staffData, deptFilter, searchTerm]);

  const columnDefs: any[] = useMemo(() => [
    {
      field: 'name',
      headerName: 'Employee Profile',
      flex: 2.5,
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 12 }}>
          <Avatar
            style={{
              backgroundColor: params.data.color + '20',
              color: params.data.color,
              fontWeight: 700,
              fontSize: 13,
              border: `1px solid ${params.data.color}40`
            }}
          >
            {params.data.initials}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{params.value}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{params.data.email} · {params.data.empId}</span>
          </div>
        </div>
      )
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1.5,
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: '100%' }}>
          <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>{params.value}</span>
        </div>
      )
    },
    {
      field: 'role',
      headerName: 'Role & Access',
      flex: 1.5,
      cellRenderer: (params: any) => {
        const roleStyles: Record<string, any> = {
          'ADMIN': { bg: '#eff6ff', text: '#2563eb' },
          'RM': { bg: '#f0fdf4', text: '#16a34a' },
          'OPERATIONS': { bg: '#fefce8', text: '#a16207' },
          'TEAM_LEADER': { bg: '#fff1f2', text: '#e11d48' },
          'PARTNER_MANAGER': { bg: '#f5f3ff', text: '#7c3aed' },
          'TELECALLER': { bg: '#ecfeff', text: '#0e7490' },
        };
        const style = roleStyles[params.value] || { bg: '#f1f5f9', text: '#475569' };
        return (
          <Tag style={{
            backgroundColor: style.bg, color: style.text, border: 'none',
            borderRadius: 100, padding: '2px 10px', fontWeight: 700, fontSize: 10
          }}>
            {params.value}
          </Tag>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Employment Status',
      flex: 1.2,
      cellRenderer: (params: any) => (
        <Badge
          status={params.value === 'ACTIVE' ? 'success' : 'default'}
          text={<span style={{ fontSize: 12, fontWeight: 600 }}>{params.value}</span>}
        />
      )
    },
    {
      field: 'joinDate',
      headerName: 'Joining Date',
      flex: 1.2,
      cellRenderer: (params: any) => (
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{params.value}</span>
      )
    },
    {
      headerName: 'Actions',
      width: 180,
      pinned: 'right',
      cellRenderer: (params: any) => {
        const handleStatusChange = async (newStatus: string) => {
          try {
            await apiClient.put(`/connectors/${params.data.id}/status`, { status: newStatus });
            if (params.data.userId) {
              await apiClient.put(`/auth/users/${params.data.userId}/status`, { status: newStatus });
            }
            // When offboarding an OPERATIONS user, redistribute their open leads
            if (newStatus === 'INACTIVE' && params.data.role === 'OPERATIONS' && params.data.email) {
              apiClient.post('/customers/leads/reassign', { fromEmail: params.data.email })
                .then(res => {
                  const count = res.data?.data?.reassigned ?? 0;
                  if (count > 0) message.info(`${count} open lead(s) reassigned to active ops team.`);
                })
                .catch(() => {}); // non-blocking
            }
            message.success(`Employee status updated to ${newStatus}`);
            fetchStaff();
          } catch (err: any) {
            message.error(err.response?.data?.message || err.message || 'Failed to update status');
          }
        };

        const handleEdit = () => {
          setEditingStaff(params.data);
          form.setFieldsValue({
            name: params.data.name,
            email: params.data.email || 'employee@platform.com',
            role: params.data.role,
            department: params.data.department,
          });
          setIsModalOpen(true);
        };

        return (
          <Space size={8}>
            <Tooltip title="Edit Profile">
              <Button type="text" size="small" icon={<Edit2 size={14} />} onClick={handleEdit} style={{ color: 'var(--brand-500)' }} />
            </Tooltip>
            {params.data.status === 'ACTIVE' ? (
              <Button
                danger
                size="small"
                onClick={() => handleStatusChange('INACTIVE')}
                style={{ borderRadius: 6, fontSize: 11, fontWeight: 700 }}
              >
                Offboard
              </Button>
            ) : (
              <Button
                type="primary"
                size="small"
                onClick={() => handleStatusChange('ACTIVE')}
                style={{ background: '#10b981', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 700 }}
              >
                Rehire
              </Button>
            )}
          </Space>
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [fetchStaff]);

  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    return {
      firstName: parts[0],
      lastName: parts.length > 1 ? parts.slice(1).join(' ') : parts[0],
    };
  };

  const handleSaveStaff = async (values: any) => {
    try {
      if (editingStaff) {
        const { firstName, lastName } = splitName(values.name);
        await apiClient.put(`/connectors/${editingStaff.id}`, {
          firstName,
          lastName,
          phone: editingStaff.phone || '9999999999',
          region: editingStaff.region || 'NATIONAL',
          platformRole: values.role,
          email: editingStaff.email,
        });
        message.success(`Employee ${values.name} updated successfully`);
      } else {
        // Step 1: Try to register auth account; on 409 recover existing userId
        let userId: string;
        try {
          const authRes = await apiClient.post('/auth/register', {
            email: values.email,
            password: values.tempPassword,
            role: values.role,
          });
          userId = authRes.data?.data?.userId;
          if (!userId) throw new Error('Registration did not return a userId');
        } catch (regErr: any) {
          if (regErr.response?.status === 409) {
            // Email taken — look up existing userId to complete registration
            const lookupRes = await apiClient.get('/auth/users/lookup', {
              params: { email: values.email },
            });
            userId = lookupRes.data?.data?.userId;
            if (!userId) throw new Error('Could not resolve existing user account');
          } else {
            throw regErr;
          }
        }

        // Step 2: Create connector profile
        const { firstName, lastName } = splitName(values.name);
        await apiClient.post('/connectors', {
          userId,
          firstName,
          lastName,
          email: values.email,
          phone: '99' + Math.floor(10000000 + Math.random() * 90000000),
          region: 'NATIONAL',
          platformRole: values.role,
        });

        message.success(`Employee ${values.name} onboarded with role ${values.role}`);
      }
      setIsModalOpen(false);
      setEditingStaff(null);
      form.resetFields();
      fetchStaff();
    } catch (err: any) {
      const serverErrors: string[] = err.response?.data?.errors ?? [];
      const serverMsg: string = err.response?.data?.message ?? '';
      const detail = serverErrors.length > 0 ? serverErrors.join(' · ') : serverMsg || err.message;
      message.error(detail || 'Failed to save employee');
    }
  };

  const rmCount = staffData.filter(s => s.role === 'RM').length;
  const opsCount = staffData.filter(s => s.role === 'OPERATIONS').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="page-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-header-title">HR & Internal User Management</h1>
          <span className="page-header-subtitle">Manage internal employees, departments, and platform access roles</span>
        </div>
        <Space size={12}>
          <Button icon={<Download size={16} />} onClick={() => {
            const headers = ['Employee ID', 'Name', 'Email', 'Role', 'Department', 'Status', 'Joining Date'];
            const rows = filteredData.map(s =>
              [s.empId, s.name, s.email, s.role, s.department, s.status, s.joinDate]
                .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
                .join(',')
            );
            const csv = [headers.join(','), ...rows].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `RealMoneyGroups_InternalTeam_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}>Download Team Details</Button>
          <Button
            type="primary"
            icon={<UserPlus size={16} />}
            onClick={() => setIsModalOpen(true)}
            style={{ height: 40, borderRadius: 12, fontWeight: 700 }}
          >
            Add New Employee
          </Button>
        </Space>
      </div>

      {/* Reporting Hierarchy Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 16, padding: '18px 24px',
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        border: '1px solid rgba(99,102,241,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GitBranch size={16} color="#818cf8" />
          <span style={{ fontSize: 11, fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Reporting Hierarchy
          </span>
        </div>
        {[
          { label: 'Channel Partner', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
          { label: 'Team Leader', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
          { label: 'Relationship Manager', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: item.bg, border: `1px solid ${item.color}40`, borderRadius: 100, padding: '6px 16px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.label}</span>
            </div>
            {i < arr.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18, fontWeight: 300 }}>→</span>
            )}
          </React.Fragment>
        ))}
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>
          RM is responsible for file review & approval
        </span>
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card variant="borderless" className="pro-card">
            <Statistic title="Total Employees" value={staffData.length} prefix={<Briefcase size={18} />} valueStyle={{ fontWeight: 800 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" className="pro-card">
            <Statistic title="Credit Operations" value={opsCount} prefix={<Building2 size={18} />} valueStyle={{ color: '#f59e0b', fontWeight: 800 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" className="pro-card">
            <Statistic title="Field RMs" value={rmCount} prefix={<UserCog size={18} />} valueStyle={{ color: '#10b981', fontWeight: 800 }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless" className="pro-card">
            <Statistic title="Team Leaders" value={staffData.filter(s => s.role === 'TEAM_LEADER').length} prefix={<Calendar size={18} />} valueStyle={{ color: '#3b82f6', fontWeight: 800 }} />
          </Card>
        </Col>
      </Row>

      <div className="pro-card" style={{ padding: 0 }}>
        <div className="page-toolbar" style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input
            placeholder="Search by name, employee ID or department..."
            prefix={<Search size={18} style={{ color: 'var(--text-muted)' }} />}
            style={{ maxWidth: 400, borderRadius: 10, height: 40 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Space>
            <Select value={deptFilter} onChange={setDeptFilter} style={{ width: 200 }}>
              <Option value="all">All Departments</Option>
              <Option value="sales">Sales &amp; Growth</Option>
              <Option value="credit">Credit Operations</Option>
              <Option value="partner">Partner Management</Option>
              <Option value="telesales">Tele Sales</Option>
            </Select>
            <Divider type="vertical" />
            <Space.Compact>
              <Button
                icon={<LayoutGrid size={16} />}
                type={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              />
              <Button
                icon={<ListIcon size={16} />}
                type={viewMode === 'table' ? 'primary' : 'default'}
                onClick={() => setViewMode('table')}
              />
            </Space.Compact>
          </Space>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <AgGridReact
              theme="legacy"
              rowData={filteredData}
              columnDefs={columnDefs}
              rowHeight={64}
              headerHeight={48}
              pagination={true}
              overlayNoRowsTemplate="<span style='color:#94a3b8;font-size:14px'>No employees found. Add your first employee using the button above.</span>"
            />
          </div>
        )}
      </div>

      <Modal
        title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><UserPlus size={20} /> {editingStaff ? 'Edit Employee Profile' : 'Add Internal Employee'}</div>}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingStaff(null); form.resetFields(); }}
        footer={null}
        width={650}
        centered
        forceRender
      >
        <Form form={form} layout="vertical" onFinish={handleSaveStaff} style={{ marginTop: 20 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Full name is required' }]}>
                <Input placeholder="Enter employee full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Official Email" rules={[{ required: !editingStaff, type: 'email', message: 'Valid email is required' }]}>
                <Input placeholder="name@platform.com" disabled={!!editingStaff} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                <Select placeholder="Select Department">
                  <Option value="Sales & Growth">Sales & Growth</Option>
                  <Option value="Credit Ops">Credit Operations</Option>
                  <Option value="Partner Management">Partner Management</Option>
                  <Option value="Tele Sales">Tele Sales</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="role" label="Access Role" rules={[{ required: true }]}>
                <Select
                  placeholder="Select Role"
                  onChange={(val) => {
                    const deptMap: Record<string, string> = {
                      RM: 'Sales & Growth',
                      TEAM_LEADER: 'Sales & Growth',
                      OPERATIONS: 'Credit Ops',
                      PARTNER_MANAGER: 'Partner Management',
                      TELECALLER: 'Tele Sales',
                      CREDIT_BUREAU: 'Credit Bureau',
                    };
                    if (deptMap[val]) form.setFieldValue('department', deptMap[val]);
                  }}
                >
                  <Option value="RM">Relationship Manager</Option>
                  <Option value="OPERATIONS">Operations User</Option>
                  <Option value="TEAM_LEADER">Team Leader</Option>
                  <Option value="PARTNER_MANAGER">Partner Manager</Option>
                  <Option value="TELECALLER">Telecaller</Option>
                  <Option value="CREDIT_BUREAU">Credit Bureau</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="joinDate" label="Joining Date">
                <DatePicker style={{ width: '100%' }} disabled={!!editingStaff} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {!editingStaff && (
                <Form.Item
                  name="tempPassword"
                  label="Temporary Password"
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 8, message: 'At least 8 characters' },
                    {
                      pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                      message: 'Must have uppercase, number & special character',
                    },
                  ]}
                >
                  <Input.Password placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special (!@#$...)" />
                </Form.Item>
              )}
            </Col>
          </Row>

          <div style={{
            background: '#fff7ed', border: '1px solid #ffedd5',
            borderRadius: 12, padding: '12px 16px', marginBottom: 24,
            display: 'flex', gap: 12, alignItems: 'flex-start'
          }}>
            <Shield size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#9a3412', lineHeight: 1.5 }}>
              {editingStaff ? 'Updating this profile will modify their permissions and details immediately in the system.' : 'This will create a login account and an internal employee profile. The employee will be able to log in immediately with their role-based access.'}
            </div>
          </div>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => { setIsModalOpen(false); setEditingStaff(null); form.resetFields(); }}>Discard</Button>
              <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: 8, padding: '0 32px' }}>
                {editingStaff ? 'Save Changes' : 'Create Employee Record'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
