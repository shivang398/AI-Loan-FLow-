import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Tooltip, Typography, Drawer, List, Spin } from 'antd';
import {
  LayoutDashboard, Users, ShieldCheck, ClipboardList, BarChart3,
  LogOut, PanelLeftClose, PanelLeft, Bell, Settings,
  Wallet, Files, FileText, ChevronDown, UsersRound, Network,
  BookOpen, Calculator, Menu as MenuIcon, X, CheckCheck,
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import api from '../shared/services/apiClient';
import { RealMoneyLogoWhite, RealMoneyMark } from '../shared/components/RealMoneyLogo';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const MOBILE_BREAKPOINT = 768;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed]             = useState(false);
  const [isMobile, setIsMobile]               = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen]             = useState(false);
  const [notifications, setNotifications]     = useState<any[]>([]);
  const [unreadCount, setUnreadCount]         = useState(0);
  const [notifLoading, setNotifLoading]       = useState(false);
  const [notifServiceDown, setNotifServiceDown] = useState(false);

  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();
  const { user }  = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMobileDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setMobileDrawerOpen(false); }, [location.pathname]);

  // Use a ref so the interval closure always reads the latest value of notifServiceDown
  // without recreating the interval every time the flag changes
  const notifServiceDownRef = useRef(notifServiceDown);
  useEffect(() => { notifServiceDownRef.current = notifServiceDown; }, [notifServiceDown]);

  const fetchUnreadCount = useCallback(async () => {
    if (notifServiceDownRef.current) return;
    try {
      // validateStatus prevents axios from throwing on 401/4xx so the global
      // refresh interceptor isn't triggered by a transient Redis blip
      const res = await api.get('/notifications/unread-count', {
        validateStatus: (s) => s < 500,
      });
      if (res.status === 200) setUnreadCount(res.data?.data?.count ?? 0);
    } catch (err: any) {
      if (err?.response?.status >= 500) setNotifServiceDown(true);
    }
  }, []); // stable — no deps that change

  useEffect(() => {
    fetchUnreadCount();
    // Poll every 2 minutes — notifications don't need sub-minute freshness
    const interval = setInterval(fetchUnreadCount, 120000);
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
    { key: '/dashboard',          icon: <LayoutDashboard size={16} />, label: 'Overview' },
    { key: '/admin/users',        icon: <Users size={16} />,           label: 'User Management' },
    { key: '/connector/cibil',    icon: <ShieldCheck size={16} />,     label: 'CIBIL Check' },
    { key: '/cibil/history',      icon: <ClipboardList size={16} />,   label: 'CIBIL History' },
    { key: '/admin/reports',      icon: <FileText size={16} />,        label: 'MIS Reports' },
    { key: '/admin/documents',    icon: <Files size={16} />,           label: 'Document Library' },
    { key: '/admin/analytics',    icon: <BarChart3 size={16} />,       label: 'Analytics' },
    { key: '/admin/policies',     icon: <BookOpen size={16} />,        label: 'Policies' },
    { key: '/admin/team-meeting', icon: <UsersRound size={16} />,      label: 'Team Meeting' },
  ];

  const partnerManagerItems = [
    { key: '/pm/partners',     icon: <Network size={16} />,        label: 'Partner Hub' },
    { key: '/pm/payouts',      icon: <Wallet size={16} />,         label: 'Payout Tracker' },
    { key: '/pm/commissions',  icon: <BarChart3 size={16} />,      label: 'Commission Slabs' },
    { key: '/connector/cibil', icon: <ShieldCheck size={16} />,    label: 'CIBIL Check' },
    { key: '/pm/policies',     icon: <BookOpen size={16} />,       label: 'Policies' },
    { key: '/pm/team-meeting', icon: <UsersRound size={16} />,     label: 'Team Meeting' },
  ];

  const rmItems = [
    { key: '/rm/dashboard',    icon: <LayoutDashboard size={16} />, label: 'Regional Hub' },
    { key: '/rm/connectors',   icon: <Users size={16} />,           label: 'Connector Tracker' },
    { key: '/rm/workflow',     icon: <ClipboardList size={16} />,   label: 'Workflow Monitor' },
    { key: '/connector/cibil', icon: <ShieldCheck size={16} />,     label: 'CIBIL Check' },
    { key: '/cibil/history',   icon: <FileText size={16} />,        label: 'CIBIL History' },
    { key: '/rm/policies',     icon: <BookOpen size={16} />,        label: 'Policies' },
    { key: '/rm/team-meeting', icon: <UsersRound size={16} />,      label: 'Team Meeting' },
  ];

  const opsItems = [
    { key: '/ops/dashboard',    icon: <ClipboardList size={16} />, label: 'Ops Queue' },
    { key: '/connector/cibil',  icon: <ShieldCheck size={16} />,   label: 'CIBIL Check' },
    { key: '/cibil/history',    icon: <FileText size={16} />,      label: 'CIBIL History' },
    { key: '/ops/policies',     icon: <BookOpen size={16} />,      label: 'Policies' },
    { key: '/ops/team-meeting', icon: <UsersRound size={16} />,    label: 'Team Meeting' },
  ];

  const connectorItems = [
    { key: '/connector/dashboard',      icon: <LayoutDashboard size={16} />, label: 'Overview' },
    { key: '/connector/cibil',          icon: <ShieldCheck size={16} />,     label: 'CIBIL Check' },
    { key: '/connector/bsa',            icon: <Files size={16} />,           label: 'Statement Analyser' },
    { key: '/connector/foir',           icon: <BarChart3 size={16} />,       label: 'Check Eligibility' },
    { key: '/connector/emi-calculator', icon: <Calculator size={16} />,      label: 'EMI Calculator' },
    { key: '/connector/earnings',       icon: <Wallet size={16} />,          label: 'My Earnings' },
    { key: '/connector/policies',       icon: <BookOpen size={16} />,        label: 'Policies' },
    { key: '/connector/team-meeting',   icon: <UsersRound size={16} />,      label: 'Team Meeting' },
  ];

  const tlItems = [
    { key: '/tl/dashboard',    icon: <LayoutDashboard size={16} />, label: 'Team Leader Hub' },
    { key: '/connector/cibil', icon: <ShieldCheck size={16} />,     label: 'CIBIL Check' },
    { key: '/tl/policies',     icon: <BookOpen size={16} />,        label: 'Policies' },
    { key: '/tl/team-meeting', icon: <UsersRound size={16} />,      label: 'Team Meeting' },
  ];

  const menuItems = [
    ...(user?.role === 'ADMIN'           ? adminItems          : []),
    ...(user?.role === 'PARTNER_MANAGER' ? partnerManagerItems : []),
    ...(user?.role === 'RM'              ? rmItems             : []),
    ...(user?.role === 'TEAM_LEADER'     ? tlItems             : []),
    ...(user?.role === 'OPERATIONS'      ? opsItems            : []),
    ...(user?.role === 'CONNECTOR'       ? connectorItems      : []),
  ];

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  const userMenuItems = {
    items: [
      { key: 'profile',  label: 'My Profile',  icon: <Users size={14} /> },
      { key: 'settings', label: 'Preferences', icon: <Settings size={14} /> },
      { type: 'divider' as const },
      { key: 'logout', label: 'Sign Out', icon: <LogOut size={14} />, danger: true, onClick: handleLogout },
    ],
  };

  const initials     = user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD';
  const displayRole  = user?.role || 'ADMIN';
  const displayName  = user?.email?.split('@')[0] || 'Admin';

  /* ── Sidebar content ─────────────────────────────────────────── */
  const SidebarContent = () => (
    <>
      {/* Logo / Brand */}
      <div style={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        padding: collapsed && !isMobile ? '0 20px' : '0 18px',
        gap: 0,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {collapsed && !isMobile ? (
          <RealMoneyMark size={38} id="sidebar-collapsed" />
        ) : (
          <div className="animate-fade-in" style={{ flex: 1, minWidth: 0 }}>
            <RealMoneyLogoWhite
              markSize={36}
              fontSize={14}
              subtitle="Advisory Platform"
              id="sidebar-logo"
            />
          </div>
        )}
        {isMobile && (
          <Button
            type="text"
            icon={<X size={17} color="rgba(255,255,255,0.45)" />}
            onClick={() => setMobileDrawerOpen(false)}
            style={{ marginLeft: 'auto', border: 'none', background: 'transparent', flexShrink: 0 }}
          />
        )}
      </div>

      {/* Nav label */}
      {(!collapsed || isMobile) && (
        <div style={{
          padding: '18px 24px 8px',
          color: 'rgba(255,255,255,0.20)',
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>
          Navigation
        </div>
      )}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="pro-sider-menu"
        style={{ background: 'transparent', border: 'none', padding: 0 }}
      />

      {/* Role + user chip at bottom */}
      {(!collapsed || isMobile) && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(0,0,0,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              background: 'rgba(196,153,58,0.10)',
              border: '1px solid rgba(196,153,58,0.30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, borderRadius: 2,
            }}>
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700, fontSize: 12, color: '#E8C870',
              }}>
                {initials}
              </span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
              }}>
                {displayName}
              </div>
              <div style={{
                fontSize: 9, fontWeight: 700, color: '#C4993A',
                textTransform: 'uppercase', letterSpacing: '0.10em',
                fontFamily: 'Inter, sans-serif',
              }}>
                {displayRole}
              </div>
            </div>
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
          width={260}
          style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
        >
          <SidebarContent />
        </Sider>
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      {isMobile && (
        <Drawer
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          placement="left"
          width={260}
          styles={{
            body: { padding: 0, background: 'var(--navy)' },
            header: { display: 'none' },
            mask: { background: 'rgba(0,0,0,0.55)' },
          }}
        >
          <div className="pro-sider" style={{ height: '100%', position: 'relative', background: 'var(--navy)' }}>
            <SidebarContent />
          </div>
        </Drawer>
      )}

      {/* ── Main Area ── */}
      <Layout style={{
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 260),
        transition: 'margin-left 0.25s ease',
      }}>

        {/* ── Top Header ── */}
        <Header
          className="pro-header"
          style={{
            padding: isMobile ? '0 16px' : '0 36px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          {/* Left: collapse + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14 }}>
            {isMobile ? (
              <Button
                type="text"
                icon={<MenuIcon size={20} />}
                onClick={() => setMobileDrawerOpen(true)}
                style={{ color: 'var(--text-secondary)', width: 36, height: 36 }}
              />
            ) : (
              <Button
                type="text"
                icon={collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ color: 'var(--text-muted)', width: 36, height: 36 }}
              />
            )}

            {!isMobile && !collapsed && (
              <div style={{
                borderLeft: '1px solid var(--surface-3)',
                paddingLeft: 14,
                marginLeft: 4,
              }}>
                <Text style={{
                  color: 'var(--text-muted)',
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.10em',
                  display: 'block',
                  lineHeight: 1.2,
                }}>
                  Platform
                </Text>
                <Title level={5} style={{
                  margin: 0,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  fontSize: 15,
                }}>
                  Control Centre
                </Title>
              </div>
            )}

            {isMobile && (
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700, fontSize: 16,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}>
                Real Money
              </div>
            )}
          </div>

          {/* Right: notifications + user */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10 }}>
            <Tooltip title="Notifications">
              <Badge count={unreadCount} size="small" offset={[-4, 4]} color="var(--gold)">
                <Button
                  type="text"
                  icon={<Bell size={18} />}
                  onClick={openNotifications}
                  style={{ color: 'var(--text-muted)', width: 36, height: 36 }}
                />
              </Badge>
            </Tooltip>

            {/* Notifications drawer */}
            <Drawer
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 700, fontSize: 14,
                    color: 'var(--text-primary)',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    letterSpacing: '-0.01em',
                  }}>
                    Notifications
                  </span>
                  {notifications.some(n => !n.read) && (
                    <Button
                      type="text"
                      icon={<CheckCheck size={13} />}
                      onClick={markAllRead}
                      style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
              }
              placement="right"
              width={360}
              open={notifOpen}
              onClose={() => setNotifOpen(false)}
              styles={{
                body: { padding: 0 },
                header: { borderBottom: '1px solid var(--surface-3)', padding: '14px 20px' },
              }}
            >
              <Spin spinning={notifLoading}>
                {notifications.length === 0 && !notifLoading ? (
                  <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Bell size={28} style={{ marginBottom: 12, opacity: 0.25 }} />
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>No notifications yet</p>
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
                          background: n.read ? 'transparent' : 'var(--gold-pale)',
                          borderBottom: '1px solid var(--surface-2)',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: n.read ? 500 : 700, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                              {n.title || n.type}
                            </span>
                            {!n.read && (
                              <span style={{
                                width: 6, height: 6,
                                borderRadius: '50%',
                                background: 'var(--gold)',
                                flexShrink: 0, marginTop: 5,
                              }} />
                            )}
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{n.content}</p>
                          <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, display: 'block', letterSpacing: '0.02em' }}>
                            {n.createdAt ? new Date(n.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                          </span>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </Spin>
            </Drawer>

            {/* Divider */}
            {!isMobile && (
              <div style={{ width: 1, height: 24, background: 'var(--surface-3)', margin: '0 4px' }} />
            )}

            {/* User menu */}
            <Dropdown menu={userMenuItems} placement="bottomRight" arrow={false}>
              <button style={{
                display: 'flex', alignItems: 'center',
                gap: isMobile ? 6 : 10,
                background: 'var(--surface-1)',
                border: '1px solid var(--surface-3)',
                cursor: 'pointer',
                padding: isMobile ? '5px 8px 5px 6px' : '5px 12px 5px 6px',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)')}
              >
                <Avatar
                  size={32}
                  style={{
                    background: '#0B1E3D',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: 12,
                    color: '#E8C870',
                  }}
                >
                  {initials}
                </Avatar>
                {!isMobile && (
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontWeight: 600, fontSize: 13,
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {displayName}
                    </div>
                    <div style={{
                      fontSize: 9, color: 'var(--text-muted)',
                      fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.09em',
                    }}>
                      {displayRole}
                    </div>
                  </div>
                )}
                <ChevronDown size={13} color="var(--text-muted)" />
              </button>
            </Dropdown>
          </div>
        </Header>

        {/* ── Content ── */}
        <Content style={{
          padding: isMobile ? '20px 16px' : '36px 40px',
          minHeight: 'calc(100vh - 64px)',
        }}>
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
