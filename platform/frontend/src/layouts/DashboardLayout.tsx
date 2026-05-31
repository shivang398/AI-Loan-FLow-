import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Tooltip, Typography, Drawer, List, Spin } from 'antd';
import {
  LayoutDashboard, Users, ShieldCheck, ClipboardList, BarChart3,
  LogOut, PanelLeftClose, PanelLeft, Bell, Settings,
  Wallet, Files, FileText, ChevronDown, Search, UsersRound, Network,
  BookOpen, Calculator, Menu as MenuIcon, X, CheckCheck, UserCheck,
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import api from '../shared/services/apiClient';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const MOBILE_BREAKPOINT = 768;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifServiceDown, setNotifServiceDown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMobileDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const fetchUnreadCount = useCallback(async () => {
    if (notifServiceDown) return;
    try {
      const res = await api.get('/notifications/unread-count');
      setUnreadCount(res.data?.data?.count ?? 0);
    } catch (err: any) {
      // Stop polling if the service itself is broken (5xx), not just a network hiccup
      if (err?.response?.status >= 500) setNotifServiceDown(true);
    }
  }, [notifServiceDown]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const openNotifications = async () => {
    setNotifOpen(true);
    setNotifLoading(true);
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data?.data ?? []);
    } catch { setNotifications([]); }
    finally { setNotifLoading(false); }
  };

  const markAllRead = async () => {
    await api.post('/notifications/read-all').catch(() => {});
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const adminItems = [
    { key: '/dashboard',          icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { key: '/admin/users',        icon: <Users size={18} />,           label: 'User Management' },
    { key: '/admin/reports',      icon: <FileText size={18} />,        label: 'MIS Reports' },
    { key: '/admin/documents',    icon: <Files size={18} />,           label: 'Document Library' },
    { key: '/admin/analytics',    icon: <BarChart3 size={18} />,       label: 'Analytics' },
    { key: '/admin/policies',     icon: <BookOpen size={18} />,        label: 'Policies' },
    { key: '/admin/team-meeting', icon: <UsersRound size={18} />,      label: 'Team Meeting' },
  ];

  const partnerManagerItems = [
    { key: '/dashboard',             icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { key: '/pm/partners',           icon: <Network size={18} />,         label: 'Partner Hub' },
    { key: '/pm/onboarding',         icon: <UserCheck size={18} />,       label: 'Onboarding' },
    { key: '/pm/payouts',            icon: <Wallet size={18} />,          label: 'Payout Tracker' },
    { key: '/pm/commissions',        icon: <BarChart3 size={18} />,       label: 'Commission Slabs' },
    { key: '/pm/policies',           icon: <BookOpen size={18} />,        label: 'Policies' },
    { key: '/pm/team-meeting',       icon: <UsersRound size={18} />,      label: 'Team Meeting' },
  ];

  const rmItems = [
    { key: '/rm/dashboard',     icon: <LayoutDashboard size={18} />, label: 'Regional Hub' },
    { key: '/rm/connectors',    icon: <Users size={18} />,           label: 'Connector Tracker' },
    { key: '/rm/workflow',      icon: <ClipboardList size={18} />,   label: 'Workflow Monitor' },
    { key: '/rm/policies',      icon: <BookOpen size={18} />,        label: 'Policies' },
    { key: '/rm/team-meeting',  icon: <UsersRound size={18} />,      label: 'Team Meeting' },
  ];

  const opsItems = [
    { key: '/ops/dashboard',    icon: <ClipboardList size={18} />, label: 'Ops Queue' },
    { key: '/ops/policies',     icon: <BookOpen size={18} />,       label: 'Policies' },
    { key: '/ops/team-meeting', icon: <UsersRound size={18} />,     label: 'Team Meeting' },
  ];

  const connectorItems = [
    { key: '/connector/dashboard',        icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { key: '/connector/cibil',            icon: <ShieldCheck size={18} />,     label: 'CIBIL Check' },
    { key: '/connector/bsa',              icon: <Files size={18} />,           label: 'Statement Analyzer' },
    { key: '/connector/foir',             icon: <BarChart3 size={18} />,       label: 'FOIR Calculator' },
    { key: '/connector/emi-calculator',   icon: <Calculator size={18} />,      label: 'EMI Calculator' },
    { key: '/connector/earnings',         icon: <Wallet size={18} />,          label: 'My Earnings' },
    { key: '/connector/policies',         icon: <BookOpen size={18} />,        label: 'Policies' },
    { key: '/connector/team-meeting',     icon: <UsersRound size={18} />,      label: 'Team Meeting' },
  ];

  const tlItems = [
    { key: '/tl/dashboard',    icon: <LayoutDashboard size={18} />, label: 'Team Leader Hub' },
    { key: '/tl/policies',     icon: <BookOpen size={18} />,        label: 'Policies' },
    { key: '/tl/team-meeting', icon: <UsersRound size={18} />,      label: 'Team Meeting' },
  ];

  const menuItems = [
    ...(user?.role === 'ADMIN'           ? adminItems          : []),
    ...(user?.role === 'PARTNER_MANAGER' ? partnerManagerItems : []),
    ...(user?.role === 'RM'              ? rmItems             : []),
    ...(user?.role === 'TEAM_LEADER'     ? tlItems             : []),
    ...(user?.role === 'OPERATIONS'      ? opsItems            : []),
    ...(user?.role === 'CONNECTOR'       ? connectorItems      : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userMenuItems = {
    items: [
      { key: 'profile', label: 'My Profile', icon: <Users size={14} /> },
      { key: 'settings', label: 'Preferences', icon: <Settings size={14} /> },
      { type: 'divider' as const },
      { key: 'logout', label: 'Sign Out', icon: <LogOut size={14} />, danger: true, onClick: handleLogout },
    ],
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD';
  const displayRole = user?.role || 'ADMIN';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{
        height: 80, display: 'flex', alignItems: 'center',
        padding: collapsed && !isMobile ? '0 22px' : '0 28px', gap: 14,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 8px 16px rgba(79,70,229,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <ShieldCheck size={22} color="white" strokeWidth={2.5} />
        </div>
        {(!collapsed || isMobile) && (
          <div className="animate-fade-in">
            <div style={{ color: 'white', fontWeight: 900, fontSize: 18, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Real <span style={{ color: '#818cf8' }}>Money</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
              Advisory Platform
            </div>
          </div>
        )}
        {isMobile && (
          <Button
            type="text"
            icon={<X size={18} color="rgba(255,255,255,0.5)" />}
            onClick={() => setMobileDrawerOpen(false)}
            style={{ marginLeft: 'auto', color: 'white', border: 'none' }}
          />
        )}
      </div>

      <div style={{ height: 20 }} />

      {(!collapsed || isMobile) && (
        <div style={{ padding: '0 28px 12px', color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Main Navigation
        </div>
      )}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="pro-sider-menu"
        style={{ background: 'transparent', border: 'none', padding: '0 14px' }}
      />

      {(!collapsed || isMobile) && (
        <div style={{
          position: 'absolute', bottom: 20, left: 28, right: 28,
          padding: '16px', borderRadius: 20, background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600 }}>System Secure</Text>
          </div>
        </div>
      )}
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--surface-1)' }}>

      {/* ── Desktop Sidebar ── */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="pro-sider"
          width={280}
          style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
        >
          <SidebarContent />
        </Sider>
      )}

      {/* ── Mobile Drawer Sidebar ── */}
      {isMobile && (
        <Drawer
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          placement="left"
          width={280}
          styles={{
            body: { padding: 0, background: '#0f172a' },
            header: { display: 'none' },
            mask: { background: 'rgba(0,0,0,0.6)' },
          }}
          style={{ position: 'fixed' }}
        >
          <div className="pro-sider" style={{ height: '100%', position: 'relative', background: '#0f172a' }}>
            <SidebarContent />
          </div>
        </Drawer>
      )}

      {/* ── Main Area ── */}
      <Layout style={{
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 280),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <Header
          className="pro-header glass"
          style={{
            padding: isMobile ? '0 16px' : '0 40px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16 }}>
            {isMobile ? (
              <Button
                type="text"
                icon={<MenuIcon size={22} />}
                onClick={() => setMobileDrawerOpen(true)}
                style={{ color: 'var(--text-secondary)', width: 40, height: 40, borderRadius: 12 }}
              />
            ) : (
              <Button
                type="text"
                icon={collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                onClick={() => setCollapsed(!collapsed)}
                className="hover-scale"
                style={{ color: 'var(--text-secondary)', width: 40, height: 40, borderRadius: 12 }}
              />
            )}
            {!isMobile && !collapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Platform
                </Text>
                <Title level={5} style={{ margin: 0, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Control Center
                </Title>
              </div>
            )}
            {isMobile && (
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Real <span style={{ color: '#6366f1' }}>Money</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12 }}>
            {!isMobile && (
              <Button
                type="text"
                icon={<Search size={19} />}
                style={{ color: 'var(--text-muted)', width: 40, height: 40, borderRadius: 12 }}
              />
            )}

            <Tooltip title="Notifications">
              <Badge count={unreadCount} size="small" offset={[-6, 6]} color="#4f46e5" overflowCount={99}>
                <Button
                  type="text"
                  icon={<Bell size={19} />}
                  onClick={openNotifications}
                  style={{ color: 'var(--text-muted)', width: 40, height: 40, borderRadius: 12 }}
                />
              </Badge>
            </Tooltip>

            <Drawer
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>Notifications</span>
                  {notifications.some(n => !n.read) && (
                    <Button type="text" icon={<CheckCheck size={14} />} onClick={markAllRead}
                      style={{ fontSize: 12, color: '#4f46e5', fontWeight: 700 }}>
                      Mark all read
                    </Button>
                  )}
                </div>
              }
              placement="right"
              width={380}
              open={notifOpen}
              onClose={() => setNotifOpen(false)}
              styles={{ body: { padding: 0 } }}
            >
              <Spin spinning={notifLoading}>
                {notifications.length === 0 && !notifLoading ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
                    <Bell size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                    <p style={{ margin: 0, fontWeight: 600 }}>No notifications yet</p>
                  </div>
                ) : (
                  <List
                    dataSource={notifications}
                    renderItem={(n: any) => (
                      <List.Item
                        key={n.id}
                        onClick={async () => {
                          if (!n.read) {
                            await api.post(`/notifications/${n.id}/read`).catch(() => {});
                            setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
                            setUnreadCount(prev => Math.max(0, prev - 1));
                          }
                        }}
                        style={{
                          padding: '14px 20px',
                          background: n.read ? 'transparent' : '#f5f3ff',
                          borderBottom: '1px solid #f1f5f9',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                      >
                        <div style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontWeight: n.read ? 600 : 800, fontSize: 13, color: '#1e293b' }}>
                              {n.title || n.type}
                            </span>
                            {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4f46e5', flexShrink: 0, marginTop: 4 }} />}
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{n.content}</p>
                          <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 6, display: 'block' }}>
                            {n.createdAt ? new Date(n.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                          </span>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </Spin>
            </Drawer>

            {!isMobile && (
              <div style={{ width: 1, height: 28, background: 'var(--surface-3)', margin: '0 8px' }} />
            )}

            <Dropdown menu={userMenuItems} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14,
                background: 'var(--surface-2)', border: '1px solid var(--surface-3)',
                cursor: 'pointer', padding: isMobile ? '6px 10px 6px 6px' : '6px 14px 6px 8px', borderRadius: 16,
                transition: 'all 0.2s',
              }}>
                <Avatar
                  size={36}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    fontWeight: 800, fontSize: 12,
                    boxShadow: '0 4px 10px rgba(79,70,229,0.2)',
                  }}
                >
                  {initials}
                </Avatar>
                {!isMobile && (
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {user?.email?.split('@')[0] || 'Admin'}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {displayRole}
                    </div>
                  </div>
                )}
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ padding: isMobile ? '20px 16px' : '40px', minHeight: 'calc(100vh - 72px)' }}>
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
