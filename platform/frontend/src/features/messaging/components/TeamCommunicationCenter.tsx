import React, { useState, useEffect, useCallback } from 'react';
import {
  Layout,
  Input,
  List,
  Avatar,
  Typography,
  Badge,
  Divider,
  Card,
  Button,
  Tag,
  Tabs,
  Modal,
  App,
  Select,
  Spin
} from 'antd';
import {
  Search,
  Users,
  MessageCircle,
  MessageSquareShare,
  Smartphone,
  Info,
  Clock
} from 'lucide-react';
import MessagingPanel from '../../operations/components/MessagingPanel';
import apiClient from '../../../shared/services/apiClient';

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

interface ChatItem {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  type: string;
  phone?: string;
}

const TeamCommunicationCenter: React.FC = () => {
  const { notification } = App.useApp();
  const [activeTab, setActiveTab] = useState('external');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [activeChatName, setActiveChatName] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('APPROVED');
  const [externalChats, setExternalChats] = useState<ChatItem[]>([]);
  const [internalChats, setInternalChats] = useState<ChatItem[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);

  const fetchConversations = useCallback(async () => {
    setLoadingChats(true);
    try {
      // Fetch WhatsApp (external) conversations
      const extRes = await apiClient.get('/messaging/whatsapp/conversations');
      const extList: any[] = extRes.data?.data ?? [];
      setExternalChats(extList.map((c: any) => ({
        id: c.id,
        name: c.customerName || 'Unknown Customer',
        lastMsg: 'WhatsApp conversation',
        time: c.updatedAt ? new Date(c.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—',
        unread: 0,
        type: 'CUSTOMER',
        phone: c.customerPhone,
      })));
    } catch {
      setExternalChats([]);
    }

    try {
      // Fetch internal team conversations
      const intRes = await apiClient.get('/messaging/conversations', { params: { type: 'INTERNAL_RM_OPS' } });
      const intList: any[] = intRes.data?.data ?? [];

      if (intList.length === 0) {
        // Create a default internal ops channel if none exists
        const created = await apiClient.post('/messaging/conversations', {
          connectorId: '00000000-0000-0000-0000-000000000001',
          type: 'INTERNAL_RM_OPS',
        });
        const conv = created.data?.data;
        if (conv) {
          setInternalChats([{ id: conv.id, name: 'Operations Team', lastMsg: 'Internal channel', time: 'Now', unread: 0, type: 'TEAM' }]);
        }
      } else {
        setInternalChats(intList.map((c: any) => ({
          id: c.id,
          name: 'Operations Team',
          lastMsg: 'Internal channel',
          time: c.updatedAt ? new Date(c.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—',
          unread: 0,
          type: 'TEAM',
        })));
      }
    } catch {
      setInternalChats([]);
    }
    setLoadingChats(false);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleSendStatus = () => {
    notification.success({
      message: 'Status Sent to WhatsApp',
      description: `Loan status "${selectedStatus}" has been successfully pushed to the connector's WhatsApp.`,
      placement: 'topRight',
      className: 'rounded-2xl shadow-2xl border border-emerald-100',
    });
    setIsStatusModalOpen(false);
  };

  return (
    <Layout className="h-[calc(100vh-120px)] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white border border-slate-100 animate-in fade-in duration-700">
      {/* Sidebar: Lists */}
      <Sider width={350} className="bg-white border-r border-slate-100 flex flex-col pt-4">
        <div className="px-6 mb-6">
          <Title level={3} className="m-0 font-extrabold text-slate-800 tracking-tight">Messaging</Title>
          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 block">Unified Comm Center</Text>
        </div>

        <div className="px-6 mb-4">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="custom-tabs"
            items={[
              { 
                key: 'external', 
                label: (
                  <span className="flex items-center gap-2 px-1">
                    <Smartphone size={16} /> WhatsApp
                  </span>
                ) 
              },
              { 
                key: 'internal', 
                label: (
                  <span className="flex items-center gap-2 px-1">
                    <Users size={16} /> Team Chat
                  </span>
                ) 
              },
            ]}
          />
        </div>

        <div className="px-6 mb-6">
          <Input 
            placeholder="Search threads..." 
            prefix={<Search size={18} className="text-slate-300 mr-2" />}
            className="rounded-2xl bg-slate-50 border-slate-100 py-3 text-sm focus:bg-white transition-all shadow-sm"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          {loadingChats ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}><Spin /></div>
          ) : (
          <List
            itemLayout="horizontal"
            dataSource={activeTab === 'external' ? externalChats : internalChats}
            renderItem={(item) => (
              <div
                onClick={() => { setActiveChat(item.id); setActiveChatName(item.name); }}
                className={`group p-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 mb-2 relative overflow-hidden ${
                  activeChat === item.id 
                    ? 'bg-blue-600 shadow-lg shadow-blue-200' 
                    : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'
                }`}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex gap-4">
                    <Badge dot color={activeChat === item.id ? '#fff' : '#3b82f6'} offset={[-2, 36]}>
                      <Avatar 
                        size={48} 
                        className={`font-black text-lg transition-transform group-hover:scale-105 duration-300 ${
                          activeChat === item.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {item.name[0]}
                      </Avatar>
                    </Badge>
                    <div className="flex flex-col justify-center">
                      <Text className={`block text-sm leading-none mb-1.5 transition-colors ${
                        activeChat === item.id ? 'font-bold text-white' : 'font-bold text-slate-800'
                      }`}>
                        {item.name}
                      </Text>
                      <Text className={`text-xs truncate w-40 transition-colors ${
                        activeChat === item.id ? 'text-blue-100' : 'text-slate-400'
                      }`}>
                        {item.lastMsg}
                      </Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <Text className={`text-[10px] uppercase font-black tracking-tighter block mb-1.5 transition-colors ${
                      activeChat === item.id ? 'text-blue-200' : 'text-slate-300'
                    }`}>
                      {item.time}
                    </Text>
                    {item.unread > 0 && (
                      <Badge 
                        count={item.unread} 
                        className="custom-badge" 
                        style={{ backgroundColor: activeChat === item.id ? '#fff' : '#3b82f6', color: activeChat === item.id ? '#3b82f6' : '#fff' }} 
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          />
          )}
        </div>
      </Sider>

      {/* Main Content */}
      <Content className="flex flex-col relative bg-slate-50/20">
        {activeChat ? (
          <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-500">
             <MessagingPanel conversationId={activeChat} contactName={activeChatName} />
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[3rem] flex items-center justify-center mb-8 shadow-inner animate-pulse">
               <MessageCircle size={60} className="text-blue-200" />
            </div>
            <Title level={2} className="text-slate-300 font-black mb-2 uppercase tracking-tighter">Select a Channel</Title>
            <Text className="text-slate-400 text-lg font-medium max-w-sm">
              All communications are encrypted and logged for audit purposes.
            </Text>
          </div>
        )}
      </Content>

      {/* Right Context Sidebar */}
      {activeChat && (
        <Sider width={340} className="bg-white border-l border-slate-100 p-8 hidden xl:block overflow-y-auto custom-scrollbar">
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
                <Avatar size={100} className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-4xl shadow-xl shadow-blue-100 border-4 border-white">
                  {activeChatName[0] || '?'}
                </Avatar>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full shadow-sm"></div>
            </div>
            <Title level={4} className="m-0 font-black text-slate-800 text-xl tracking-tight">
              {activeChatName}
            </Title>
            <div className="flex justify-center gap-2 mt-3">
              <Tag color="blue" className="rounded-full border-none font-bold px-4 py-0.5 text-[10px] uppercase tracking-wider shadow-sm">
                {activeTab === 'external' ? 'CONNECTOR' : 'INTERNAL'}
              </Tag>
              {activeTab === 'external' && (
                <Tag color="emerald" className="rounded-full border-none font-bold px-4 py-0.5 text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Smartphone size={10} /> WHATSAPP
                </Tag>
              )}
            </div>
          </div>

          <Divider className="my-8 opacity-50" />

          <div className="space-y-8">
            {activeTab === 'external' ? (
              <>
                <section>
                  <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-4">Contact Info</Text>
                  <Card className="bg-slate-50 border-none shadow-none rounded-[1.5rem] p-4 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                         <Smartphone size={20} />
                      </div>
                      <div>
                        <Text className="text-slate-400 text-[10px] font-bold block">WHATSAPP NUMBER</Text>
                        <Text className="text-slate-800 font-black">
                          {externalChats.find(c => c.id === activeChat)?.phone || '—'}
                        </Text>
                      </div>
                    </div>
                  </Card>
                </section>

                <section>
                  <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-4">Active Application</Text>
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl shadow-slate-200 rounded-[2rem] p-6 text-white relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-1000"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <Tag className="bg-white/10 text-white border-none rounded-full px-3 text-[10px] font-black">APP-99218</Tag>
                        <Clock size={16} className="text-slate-500" />
                      </div>
                      <Text className="text-white font-black text-xl block leading-tight mb-1">Personal Loan</Text>
                      <Text className="text-slate-400 font-bold block mb-4">₹10,00,000.00</Text>
                      <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl">
                         <Info size={14} className="text-orange-400" />
                         <Text className="text-white text-xs font-bold">Pending: Salary Slip Verification</Text>
                      </div>
                    </div>
                  </Card>
                </section>

                <Button 
                  block 
                  type="primary" 
                  onClick={() => setIsStatusModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 border-none rounded-[1.25rem] h-14 font-black shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 group transition-all duration-300 active:scale-95"
                >
                  <MessageSquareShare size={20} className="group-hover:rotate-12 transition-transform" />
                  PUSH STATUS TO WHATSAPP
                </Button>
              </>
            ) : (
              <section className="space-y-6">
                <Text className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-4">Team Members</Text>
                <div className="flex -space-x-4 mb-8">
                   <Avatar className="border-4 border-white bg-blue-100 text-blue-600 font-bold">AD</Avatar>
                   <Avatar className="border-4 border-white bg-purple-100 text-purple-600 font-bold">MK</Avatar>
                   <Avatar className="border-4 border-white bg-amber-100 text-amber-600 font-bold">RJ</Avatar>
                   <Avatar className="border-4 border-white bg-slate-100 text-slate-400">+12</Avatar>
                </div>
                <Card className="bg-blue-50 border-none rounded-[2rem] p-6">
                   <Title level={5} className="text-blue-800 font-black mb-2">Team Objective</Title>
                   <Text className="text-blue-600 text-xs font-medium leading-relaxed">
                     Resolution of all pending document queries for the current quarter leads. Current TAT: 4.2 hours.
                   </Text>
                </Card>
              </section>
            )}
          </div>
        </Sider>
      )}

      {/* WhatsApp Status Update Modal */}
      <Modal
        title={null}
        open={isStatusModalOpen}
        onCancel={() => setIsStatusModalOpen(false)}
        footer={null}
        centered
        width={400}
        className="custom-modal"
      >
        <div className="p-4 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
             <Smartphone size={32} className="text-emerald-600" />
          </div>
          <Title level={3} className="font-black text-slate-800 mb-2 tracking-tight">Push Update</Title>
          <Text className="text-slate-400 block mb-8 font-medium">Select the official case status to send to the connector via WhatsApp.</Text>
          
          <div className="text-left mb-8">
            <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-3 ml-1">New Case Status</Text>
            <Select 
              className="w-full h-14 custom-select"
              defaultValue="APPROVED"
              onChange={setSelectedStatus}
              options={[
                { value: 'DOC_PENDING', label: 'Documents Pending' },
                { value: 'BANK_VERIFY', label: 'Bank Verification' },
                { value: 'APPROVED', label: 'Sanction Approved' },
                { value: 'DISBURSED', label: 'Loan Disbursed' },
                { value: 'REJECTED', label: 'Application Rejected' },
              ]}
            />
          </div>

          <div className="flex gap-4">
            <Button 
              block 
              className="h-14 rounded-2xl font-bold text-slate-400 hover:text-slate-600 border-slate-100"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              block 
              type="primary" 
              className="h-14 rounded-2xl font-black bg-emerald-600 shadow-lg shadow-emerald-100 border-none"
              onClick={handleSendStatus}
            >
              Send Now
            </Button>
          </div>
        </div>
      </Modal>

      <style>{`
        .custom-tabs .ant-tabs-nav::before { border-bottom: 2px solid #f8fafc; }
        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn { color: #3b82f6 !important; font-weight: 800; }
        .custom-tabs .ant-tabs-ink-bar { background: #3b82f6; height: 3px !important; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-select .ant-select-selector { border-radius: 1.25rem !important; border: 2px solid #f1f5f9 !important; background: #f8fafc !important; font-weight: 700 !important; color: #1e293b !important; padding: 0 16px !important; display: flex !important; align-items: center !important; }
        .custom-modal .ant-modal-content { border-radius: 2.5rem; padding: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
      `}</style>
    </Layout>
  );
};

export default TeamCommunicationCenter;
