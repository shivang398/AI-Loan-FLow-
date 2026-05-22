import React, { useState, useEffect } from 'react';
import apiClient from '../../../shared/services/apiClient';
import {
  App,
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Select,
  Form,
  Tabs,
  Row,
  Col,
  Statistic,
  Upload,
  InputNumber,
  Spin
} from 'antd';
import {
  FileSpreadsheet,
  Download,
  Clock,
  Settings,
  UploadCloud,
  Users,
  Briefcase,
  TrendingUp,
  Inbox
} from 'lucide-react';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const ReportingDashboard: React.FC = () => {
  const { message } = App.useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm] = Form.useForm();
  const [rmList, setRmList] = useState<any[]>([]);
  const [rmReports, setRmReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    // Fetch RM list for upload modal dropdown
    apiClient.get('/connectors?roles=RM').then(res => {
      setRmList(res.data?.data || []);
    }).catch(() => {});

    // Fetch uploaded MIS reports from backend
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const res = await apiClient.get('/reports/mis-uploads');
      setRmReports(res.data?.data || res.data || []);
    } catch {
      // Endpoint may not exist yet — show empty state
      setRmReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const totalVolume = rmReports.reduce((acc, curr) => acc + (curr.volume || 0), 0);

  const columns = [
    {
      title: 'Uploaded By (RM Name)',
      dataIndex: 'rmName',
      key: 'rmName',
      render: (text: string) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} color="#3b82f6" />
          </div>
          <Text strong className="text-slate-700">{text}</Text>
        </Space>
      )
    },
    {
      title: 'Source File',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text: string) => (
        <Space>
          <FileSpreadsheet size={16} className="text-emerald-600" />
          <Text className="text-slate-600">{text || '—'}</Text>
        </Space>
      )
    },
    {
      title: 'Business Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (val: number) => <span className="font-bold text-blue-600">₹{(val || 0).toLocaleString()}</span>
    },
    { title: 'Upload Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'VERIFIED' ? 'success' : 'processing'} className="rounded-full px-3 font-bold">
          {(status || 'PENDING_REVIEW').replace('_', ' ')}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<Download size={16} />} className="text-blue-600" />
        </Space>
      )
    }
  ];

  const handleUpload = async (values: any) => {
    try {
      await apiClient.post('/reports/mis-uploads', {
        rmName: values.rmName,
        fileName: 'Uploaded_Report.xlsx',
        volume: values.volume,
      });
      message.success('MIS Report submitted for review.');
      setShowUploadModal(false);
      uploadForm.resetFields();
      fetchReports();
    } catch {
      message.error('Failed to submit report. Please try again.');
    }
  };

  const handleGenerateMaster = async () => {
    setIsExporting(true);
    try {
      const response = await apiClient.get('/reports/connector-summary/download', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'master_mis_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      message.success('Master MIS downloaded successfully.');
    } catch (err) {
      console.error(err);
      message.error('Failed to generate MIS report.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} className="m-0 font-bold text-slate-800">Master MIS & Operations</Title>
          <Text className="text-slate-500">Consolidate RM-uploaded reports into the Master Business Volume.</Text>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<UploadCloud size={16} />}
            className="bg-blue-600"
            onClick={() => setShowUploadModal(true)}
            style={{ borderRadius: 8, height: 40, fontWeight: 600 }}
          >
            Upload RM MIS
          </Button>
        </Space>
      </div>

      <Tabs
        defaultActiveKey="1"
        className="premium-tabs"
        items={[
          {
            key: '1',
            label: <div className="flex items-center gap-2"><Briefcase size={16} /> Master Consolidation</div>,
            children: (
              <div className="space-y-6">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl">
                      <Statistic
                        title={<span className="text-blue-100 font-medium">Total Master Volume</span>}
                        value={totalVolume}
                        prefix="₹"
                        valueStyle={{ color: 'white', fontWeight: 900, fontSize: 32 }}
                      />
                      <div className="mt-4 flex items-center gap-2 text-blue-200 text-sm font-medium">
                        <TrendingUp size={16} /> Based on {rmReports.length} uploaded report{rmReports.length !== 1 ? 's' : ''}
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm border-none rounded-2xl">
                      <Statistic
                        title={<span className="text-slate-500 font-medium">Total Reports Uploaded</span>}
                        value={rmReports.length}
                        prefix={<FileSpreadsheet size={20} className="mr-2 text-emerald-500" />}
                        valueStyle={{ fontWeight: 800, color: '#1e293b' }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm border-none rounded-2xl">
                      <Statistic
                        title={<span className="text-slate-500 font-medium">Pending Verifications</span>}
                        value={rmReports.filter(r => r.status === 'PENDING_REVIEW').length}
                        prefix={<Clock size={20} className="mr-2 text-amber-500" />}
                        valueStyle={{ fontWeight: 800, color: '#1e293b' }}
                      />
                    </Card>
                  </Col>
                </Row>

                <Card
                  title={<span className="font-bold text-slate-800">Uploaded RM Reports (Master Ledger)</span>}
                  variant="borderless"
                  className="shadow-sm rounded-2xl overflow-hidden"
                  extra={
                    <Button type="primary" onClick={handleGenerateMaster} loading={isExporting} style={{ background: '#10b981', fontWeight: 600 }}>
                      Generate Master MIS
                    </Button>
                  }
                >
                  {loadingReports ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
                  ) : (
                    <Table
                      rowKey="id"
                      dataSource={rmReports}
                      columns={columns}
                      pagination={{ pageSize: 10 }}
                      className="border-none"
                      locale={{ emptyText: 'No MIS reports uploaded yet. Use "Upload RM MIS" to add reports.' }}
                    />
                  )}
                </Card>
              </div>
            )
          },
          {
            key: '2',
            label: <div className="flex items-center gap-2"><Settings size={16} /> Export Configuration</div>,
            children: (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title={<span className="font-bold text-slate-800">Automated Report Scheduling</span>} variant="borderless" className="shadow-sm rounded-2xl">
                  <Form layout="vertical">
                    <Form.Item label="Schedule Frequency">
                      <Select defaultValue="weekly" className="w-full">
                        <Select.Option value="daily">Daily Master Consolidation</Select.Option>
                        <Select.Option value="weekly">Weekly Business Summary</Select.Option>
                        <Select.Option value="monthly">Monthly Audit Report</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Recipients (Emails)">
                      <Select mode="tags" placeholder="admin@realmoney.in" defaultValue={['admin@realmoney.in']} className="w-full" />
                    </Form.Item>
                    <Button type="primary" className="bg-blue-600">Update Schedule</Button>
                  </Form>
                </Card>
              </div>
            )
          }
        ]}
      />

      {/* Upload MIS Modal */}
      <Modal
        title={<span className="font-bold text-slate-800 flex items-center gap-2"><UploadCloud size={20} className="text-blue-600" /> Upload RM MIS Report</span>}
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        footer={null}
        width={500}
      >
        <Form form={uploadForm} layout="vertical" onFinish={handleUpload} className="mt-4">
          <Form.Item name="rmName" label="Select RM" rules={[{ required: true }]}>
            <Select placeholder="Select the RM uploading this MIS" showSearch optionFilterProp="children">
              {rmList.map((rm: any) => (
                <Select.Option key={rm.id} value={`${rm.firstName} ${rm.lastName}`.trim()}>
                  {rm.firstName} {rm.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="volume" label="Total Business Volume Declared (₹)" rules={[{ required: true }]}>
            <InputNumber
              className="w-full"
              size="large"
              formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item label="MIS File (.xlsx, .csv)">
            <Dragger multiple={false} beforeUpload={() => false}>
              <p className="ant-upload-drag-icon flex justify-center text-blue-500">
                <Inbox size={48} />
              </p>
              <p className="ant-upload-text font-semibold">Click or drag MIS file to this area</p>
              <p className="ant-upload-hint text-slate-500 px-4">Upload standard MIS format (.xlsx or .csv)</p>
            </Dragger>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setShowUploadModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600">Submit MIS to Master</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReportingDashboard;
