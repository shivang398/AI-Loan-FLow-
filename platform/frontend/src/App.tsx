import React from 'react';
import { App as AntApp, ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import CareersPage from './pages/CareersPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './features/dashboard/components/DashboardOverview';
import UserManagement from './features/users/components/UserManagement';
import RegionalDashboard from './features/rm/components/RegionalDashboard';
import ConnectorTracker from './features/rm/components/ConnectorTracker';
import WorkflowMonitor from './features/rm/components/WorkflowMonitor';
import OperationsDashboard from './features/operations/components/OperationsDashboard';
import ConnectorDashboard from './features/connector/components/ConnectorDashboard';
import EmiCalculator from './features/connector/components/EmiCalculator';
import { BankStatementAnalyzerPage } from './features/connector/components/ConnectorTools';
import CheckEligibility from './features/connector/components/CheckEligibility';
import TeamMeeting from './features/team-meeting/components/TeamMeeting';
import DocumentLibrary from './features/documents/components/DocumentLibrary';
import CommissionDashboard from './features/commissions/components/CommissionDashboard';
import BusinessAnalytics from './features/analytics/components/BusinessAnalytics';
import ReportingDashboard from './features/reporting/components/ReportingDashboard';
import ConnectorHub from './features/admin/components/ConnectorHub';
import PayoutTracker from './features/admin/components/PayoutTracker';
import CareerApplications from './features/admin/components/CareerApplications';
import PoliciesPage from './features/policies/components/PoliciesPage';
import TelecallerDashboard from './features/telecaller/components/TelecallerDashboard';
import WhatsAppPage from './features/operations/components/WhatsAppPage';
import WhatsAppCampaigns from './features/operations/components/WhatsAppCampaigns';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import FeatureErrorBoundary from './shared/components/FeatureErrorBoundary';
import TabbedPage from './shared/components/TabbedPage';
import { ROLE_HOME } from './store/slices/authSlice';
import './index.css';

const queryClient = new QueryClient();

// ── Combined pages: one sidebar entry each, related tools as tabs ──────────────
const WhatsAppHub: React.FC = () => (
  <TabbedPage tabs={[
    { key: 'chats',      label: 'Chats',      element: <WhatsAppPage /> },
    { key: 'broadcasts', label: 'Broadcasts', element: <WhatsAppCampaigns view="campaigns" /> },
    { key: 'templates',  label: 'Templates',  element: <WhatsAppCampaigns view="templates" /> },
  ]} />
);

const ReportsHub: React.FC = () => (
  <TabbedPage tabs={[
    { key: 'mis',       label: 'MIS Reports', element: <ReportingDashboard /> },
    { key: 'analytics', label: 'Analytics',   element: <BusinessAnalytics /> },
  ]} />
);

const PartnersHub: React.FC = () => (
  <TabbedPage tabs={[
    { key: 'partners',    label: 'Partner Hub',      element: <ConnectorHub /> },
    { key: 'payouts',     label: 'Payouts',          element: <PayoutTracker /> },
  ]} />
);

const LoanToolsHub: React.FC = () => (
  <TabbedPage tabs={[
    { key: 'eligibility', label: 'Check Eligibility',  element: <CheckEligibility /> },
    { key: 'statement',   label: 'Statement Analyser', element: <BankStatementAnalyzerPage /> },
    { key: 'emi',         label: 'EMI Calculator',     element: <EmiCalculator /> },
  ]} />
);

const LEGACY_REDIRECTS: Record<string, string> = {
  '/whatsapp/inbox':           '/whatsapp?tab=chats',
  '/whatsapp/campaigns':       '/whatsapp?tab=broadcasts',
  '/admin/reports':            '/reports?tab=mis',
  '/admin/analytics':          '/reports?tab=analytics',
  '/connector/foir':           '/tools?tab=eligibility',
  '/connector/bsa':            '/tools?tab=statement',
  '/connector/emi-calculator': '/tools?tab=emi',
  '/pm/partners':              '/partners?tab=partners',
  '/pm/payouts':               '/partners?tab=payouts',
  '/pm/commissions':           '/partners?tab=partners',   // slab settings live in Partner Hub → Bank Payout Slabs
  '/tl/dashboard':             '/rm/dashboard',
  '/telecaller/queue':         '/calls',
  ...Object.fromEntries(['admin', 'pm', 'rm', 'tl', 'ops', 'connector'].flatMap(p => [
    [`/${p}/policies`, '/policies'],
    [`/${p}/team-meeting`, '/team-meeting'],
  ])),
};

// Smart 404 — authenticated users go to their role home, others go to login
const SmartRedirect: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[user.role] ?? '/dashboard'} replace />;
};

/* Formal Ant Design theme — navy primary, minimal radius */
const formalTheme = {
  token: {
    colorPrimary:    '#0B1E3D',
    colorLink:       '#0B1E3D',
    colorSuccess:    '#1A7A4A',
    colorWarning:    '#A87C3A',
    colorError:      '#8B1A1A',
    borderRadius:    2,
    borderRadiusSM:  2,
    borderRadiusLG:  3,
    fontFamily:      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    colorBgBase:     '#FFFFFF',
    colorTextBase:   '#0B1E3D',
    colorBorder:     '#D3DCE8',
    colorBgContainer:'#FFFFFF',
    colorBgLayout:   '#F5F4F1',
    colorFillAlter:  '#F5F4F1',
  },
  components: {
    Button:    { borderRadius: 2, borderRadiusSM: 2, borderRadiusLG: 3 },
    Input:     { borderRadius: 2, borderRadiusSM: 2, borderRadiusLG: 3 },
    Select:    { borderRadius: 2, borderRadiusSM: 2, borderRadiusLG: 3 },
    Modal:     { borderRadiusLG: 3 },
    Card:      { borderRadiusLG: 4 },
    Table:     { borderRadiusLG: 4, borderRadius: 4 },
    Tag:       { borderRadiusSM: 2 },
    Drawer:    { borderRadiusOuter: 0 },
  },
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={formalTheme}>
      <AntApp>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password"  element={<ResetPasswordPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<FeatureErrorBoundary feature="Dashboard"><DashboardOverview /></FeatureErrorBoundary>} />

              {/* ── Shared by every role ── */}
              <Route path="/policies"     element={<FeatureErrorBoundary feature="Policies"><PoliciesPage /></FeatureErrorBoundary>} />
              <Route path="/team-meeting" element={<FeatureErrorBoundary feature="Team Meeting"><TeamMeeting /></FeatureErrorBoundary>} />

              <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS']} />}>
                <Route path="/whatsapp" element={<WhatsAppHub />} />
              </Route>

              {/* ── Admin ── */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/users"     element={<FeatureErrorBoundary feature="User Management"><UserManagement /></FeatureErrorBoundary>} />
                <Route path="/admin/documents" element={<FeatureErrorBoundary feature="Document Library"><DocumentLibrary /></FeatureErrorBoundary>} />
                <Route path="/reports"         element={<ReportsHub />} />
                <Route path="/partners"        element={<PartnersHub />} />
                <Route path="/admin/careers"   element={<FeatureErrorBoundary feature="Career Applications"><CareerApplications /></FeatureErrorBoundary>} />
              </Route>

              {/* ── RM ── */}
              <Route element={<ProtectedRoute allowedRoles={['RM']} />}>
                <Route path="/rm/dashboard"  element={<FeatureErrorBoundary feature="RM Dashboard"><RegionalDashboard /></FeatureErrorBoundary>} />
                <Route path="/rm/connectors" element={<FeatureErrorBoundary feature="Connector Tracker"><ConnectorTracker /></FeatureErrorBoundary>} />
                <Route path="/rm/workflow"   element={<FeatureErrorBoundary feature="Workflow Monitor"><WorkflowMonitor /></FeatureErrorBoundary>} />
              </Route>

              {/* ── Operations ── */}
              <Route element={<ProtectedRoute allowedRoles={['OPERATIONS']} />}>
                <Route path="/ops/dashboard" element={<FeatureErrorBoundary feature="Operations Dashboard"><OperationsDashboard /></FeatureErrorBoundary>} />
                <Route path="/calls"         element={<FeatureErrorBoundary feature="Call Queue"><TelecallerDashboard /></FeatureErrorBoundary>} />
              </Route>

              {/* ── Connector ── */}
              <Route element={<ProtectedRoute allowedRoles={['CONNECTOR']} />}>
                <Route path="/connector/dashboard" element={<FeatureErrorBoundary feature="Connector Dashboard"><ConnectorDashboard /></FeatureErrorBoundary>} />
                <Route path="/tools"               element={<LoanToolsHub />} />
                <Route path="/connector/earnings"  element={<FeatureErrorBoundary feature="Earnings"><CommissionDashboard /></FeatureErrorBoundary>} />
              </Route>

              {/* Old addresses → new pages, so bookmarks and shared links keep working */}
              {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
            </Route>
          </Route>

          {/* Public landing routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/partners/register" element={<Navigate to="/careers" replace />} />

          {/* Fallback to dashboard for authenticated users */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
          <Route path="*" element={<SmartRedirect />} />
        </Routes>
      </BrowserRouter>
      </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
