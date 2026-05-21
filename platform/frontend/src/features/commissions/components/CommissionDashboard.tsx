import React from 'react';
import { Row, Col, Card, Typography, Table, Tag, Space, Button, Select, Statistic } from 'antd';
import { 
  IndianRupee, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  Clock,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';

const { Title, Text } = Typography;

const data = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 19000 },
  { month: 'Mar', amount: 15000 },
  { month: 'Apr', amount: 28000 },
  { month: 'May', amount: 32000 },
  { month: 'Jun', amount: 45000 },
];

const CommissionDashboard: React.FC = () => {
  const payoutHistory = [
    { id: 'PAY-001', date: '2026-05-14', totalAmount: 32000, amountPaid: 32000, remainingAmount: 0, status: 'FULLY_PAID', ref: 'TXN_992182' },
    { id: 'PAY-002', date: '2026-04-15', totalAmount: 28500, amountPaid: 10000, remainingAmount: 18500, status: 'PARTIALLY_PAID', ref: 'TXN_992181' },
    { id: 'PAY-003', date: '---', totalAmount: 15000, amountPaid: 0, remainingAmount: 15000, status: 'PENDING', ref: '---' },
    { id: 'PAY-004', date: '2026-02-01', totalAmount: 19000, amountPaid: 19000, remainingAmount: 0, status: 'FULLY_PAID', ref: 'TXN_992179' },
  ];

  const columns = [
    { title: 'Payout ID', dataIndex: 'id', key: 'id', render: (id: string) => <Text strong>{id}</Text> },
    { title: 'Total Comm.', dataIndex: 'totalAmount', key: 'totalAmount', render: (amt: number) => <Text className="font-bold">₹{amt.toLocaleString()}</Text> },
    { title: 'Paid', dataIndex: 'amountPaid', key: 'amountPaid', render: (amt: number) => <Text className="text-emerald-600 font-bold">₹{amt.toLocaleString()}</Text> },
    { title: 'Pending', dataIndex: 'remainingAmount', key: 'remainingAmount', render: (amt: number) => <Text className={amt > 0 ? "text-red-500 font-bold" : "text-slate-400 font-bold"}>₹{amt.toLocaleString()}</Text> },
    { title: 'Last Payment Date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => {
        let color = 'default';
        if (status === 'FULLY_PAID') color = 'success';
        if (status === 'PARTIALLY_PAID') color = 'processing';
        if (status === 'PENDING') color = 'warning';
        return <Tag color={color} className="rounded-full border-none px-3 font-bold">{status.replace('_', ' ')}</Tag>;
      }
    },
    { title: 'Reference', dataIndex: 'ref', key: 'ref', render: (ref: string) => <Text className="text-slate-400 font-mono text-xs">{ref}</Text> },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link" icon={<Download size={14} />}>Invoice</Button>
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} className="m-0 font-bold text-slate-800">Earnings & Commissions</Title>
          <Text className="text-slate-500">Track your payouts and performance analytics.</Text>
        </div>
        <Space>
          <Select defaultValue="2026" className="w-32 rounded-lg">
            <Select.Option value="2026">FY 2026</Select.Option>
            <Select.Option value="2025">FY 2025</Select.Option>
          </Select>
          <Button type="primary" icon={<Download size={16} />} className="bg-blue-600">Export Statement</Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl rounded-3xl h-full flex flex-col justify-between p-2">
            <div className="p-4">
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Available for Payout</Text>
              <Title level={1} className="m-0 text-white font-black">₹12,450</Title>
              <div className="flex items-center gap-2 mt-4 text-emerald-400">
                <ArrowUpRight size={18} />
                <Text className="text-emerald-400 font-bold">+18% growth</Text>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center">
              <div>
                <Text className="text-slate-400 text-[10px] uppercase font-bold block">Next Payout Date</Text>
                <Text className="text-white font-medium">June 1, 2026</Text>
              </div>
              <Calendar className="text-slate-500" size={24} />
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card className="shadow-sm border-none rounded-2xl">
                <Statistic
                  title={<Text className="text-slate-500 font-medium">Lifetime Earnings</Text>}
                  value={142500}
                  prefix={<IndianRupee size={20} className="mr-1" />}
                  valueStyle={{ fontWeight: 800 }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shadow-sm border-none rounded-2xl">
                <Statistic
                  title={<Text className="text-slate-500 font-medium">Pending Payouts</Text>}
                  value={8200}
                  prefix={<Clock size={20} className="mr-1" />}
                  valueStyle={{ fontWeight: 800, color: '#f59e0b' }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title={<span className="text-slate-800 font-bold">Earnings Analytics</span>} className="shadow-sm border-none rounded-2xl">
                <div className="h-[200px] min-h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis hide />
                      <RechartsTooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorAmt)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card 
        title={<span className="text-slate-800 font-bold">Payout History</span>} 
        className="shadow-sm border-none rounded-2xl overflow-hidden"
        extra={<Button type="text" icon={<Filter size={16} />} className="text-slate-400" />}
      >
        <Table 
          dataSource={payoutHistory} 
          columns={columns} 
          pagination={false}
          className="border-none"
        />
      </Card>
    </div>
  );
};

export default CommissionDashboard;
