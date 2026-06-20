import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Upload, Modal, Form, Input, Select,
  Space, Tooltip, Empty, Spin, App as AntApp,
} from 'antd';
import {
  Upload as UploadIcon, Download, Trash2, FileText, Building2, Briefcase,
  RefreshCw, Eye,
} from 'lucide-react';
import type { UploadFile } from 'antd/es/upload/interface';
import apiClient from '../../../shared/services/apiClient';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const { Title, Text } = Typography;

interface PolicyDoc {
  id: string;
  title: string;
  category: 'BANK' | 'OFFICE';
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
  uploadedByEmail: string;
  uploadedAt: string;
}

const PoliciesPage: React.FC = () => {
  const { message } = AntApp.useApp();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  const [docs, setDocs] = useState<PolicyDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const params = categoryFilter ? { category: categoryFilter } : {};
      const res = await apiClient.get('/policies/documents', { params });
      setDocs(res.data?.data || []);
    } catch {
      message.error('Failed to load policy documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, [categoryFilter]);

  const handleUpload = async (values: { title: string; category: string }) => {
    if (!fileList.length || !fileList[0].originFileObj) {
      message.error('Please select a file');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('file', fileList[0].originFileObj as File);
      await apiClient.post('/policies/documents/upload', formData, {
        headers: { 'Content-Type': undefined },
      });
      message.success('Policy document uploaded successfully');
      setUploadModalOpen(false);
      form.resetFields();
      setFileList([]);
      fetchDocs();
    } catch {
      message.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/policies/documents/${id}`);
      message.success('Document removed');
      setDocs(prev => prev.filter(d => d.id !== id));
    } catch {
      message.error('Delete failed');
    }
  };

  const handleDownload = async (doc: PolicyDoc) => {
    try {
      const res = await apiClient.get(`/policies/documents/${doc.id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: String(res.headers['content-type'] || doc.mimeType) }));
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      message.error('Failed to download document');
    }
  };

  const bankDocs = docs.filter(d => d.category === 'BANK');
  const officeDocs = docs.filter(d => d.category === 'OFFICE');

  const renderSection = (title: string, icon: React.ReactNode, items: PolicyDoc[], accentColor: string) => (
    <div style={{
      background: 'white', borderRadius: 20, padding: 28,
      border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${accentColor}15`,
        }}>
          {icon}
        </div>
        <div>
          <Title level={5} style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</Title>
          <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>{items.length} document{items.length !== 1 ? 's' : ''}</Text>
        </div>
      </div>

      {items.length === 0 ? (
        <Empty description="No documents uploaded yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map(doc => (
            <div key={doc.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              padding: '14px 18px', borderRadius: 14, background: 'var(--surface-1)',
              border: '1px solid var(--surface-2)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: '#fff7ed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FileText size={18} color="#f97316" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text strong style={{ fontSize: 14, color: 'var(--text-primary)', display: 'block' }}>
                  {doc.title}
                </Text>
                <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {doc.fileName} · {doc.fileSizeBytes ? `${(doc.fileSizeBytes / 1024).toFixed(0)} KB` : '—'} ·
                  {' '}{new Date(doc.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
              </div>
              <Space>
                <Tooltip title="View / Download">
                  <Button
                    type="text"
                    icon={<Eye size={16} />}
                    onClick={() => handleDownload(doc)}
                    style={{ color: '#3b82f6' }}
                  />
                </Tooltip>
                <Tooltip title="Download">
                  <Button
                    type="text"
                    icon={<Download size={16} />}
                    onClick={() => handleDownload(doc)}
                    style={{ color: 'var(--text-secondary)' }}
                  />
                </Tooltip>
                {isAdmin && (
                  <Tooltip title="Remove">
                    <Button
                      type="text"
                      icon={<Trash2 size={16} />}
                      danger
                      onClick={() => handleDelete(doc.id)}
                    />
                  </Tooltip>
                )}
              </Space>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: 900, margin: '0 auto', padding: '0 0 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Policy Library
          </div>
          <Title level={2} style={{ margin: 0 }}>Bank & Office Policies</Title>
          <Text style={{ color: 'var(--text-muted)' }}>
            {isAdmin ? 'Upload and manage policy documents for your team.' : 'Access bank guidelines and office policies.'}
          </Text>
        </div>
        <Space>
          <Select
            value={categoryFilter || 'all'}
            onChange={(v) => setCategoryFilter(v === 'all' ? '' : v)}
            style={{ width: 160 }}
          >
            <Select.Option value="all">All Categories</Select.Option>
            <Select.Option value="BANK">Bank Policies</Select.Option>
            <Select.Option value="OFFICE">Office Policies</Select.Option>
          </Select>
          <Button icon={<RefreshCw size={15} />} onClick={fetchDocs} loading={loading}>Refresh</Button>
          {isAdmin && (
            <Button
              type="primary"
              icon={<UploadIcon size={15} />}
              onClick={() => setUploadModalOpen(true)}
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}
            >
              Upload Policy
            </Button>
          )}
        </Space>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
      ) : (
        <>
          {renderSection(
            'Bank Policies & Guidelines',
            <Building2 size={18} color="#3b82f6" />,
            bankDocs,
            '#3b82f6',
          )}
          {renderSection(
            'Office Policies & HR Documents',
            <Briefcase size={18} color="#8b5cf6" />,
            officeDocs,
            '#8b5cf6',
          )}
        </>
      )}

      {/* Upload Modal */}
      <Modal
        title="Upload Policy Document"
        open={uploadModalOpen}
        onCancel={() => { setUploadModalOpen(false); form.resetFields(); setFileList([]); }}
        footer={null}
        destroyOnHidden
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={handleUpload} style={{ marginTop: 16 }}>
          <Form.Item
            name="title"
            label="Document Title"
            rules={[{ required: true, message: 'Enter a title' }]}
          >
            <Input placeholder="e.g. HDFC Bank Personal Loan Policy 2026" size="large" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Select category' }]}
          >
            <Select size="large" placeholder="Select category">
              <Select.Option value="BANK">Bank Policy</Select.Option>
              <Select.Option value="OFFICE">Office / HR Policy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="File (PDF, Word, Image)" required>
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setFileList([{ ...file, uid: file.uid, name: file.name, status: 'done', originFileObj: file }]);
                return false;
              }}
              onRemove={() => setFileList([])}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxCount={1}
            >
              <Button icon={<UploadIcon size={15} />}>Select File</Button>
            </Upload>
          </Form.Item>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
            <Button onClick={() => { setUploadModalOpen(false); form.resetFields(); setFileList([]); }}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={uploading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none' }}
            >
              Upload
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PoliciesPage;
