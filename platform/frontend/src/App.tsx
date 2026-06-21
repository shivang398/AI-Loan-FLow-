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
import TeamLeaderDashboard from './features/team-leader/components/TeamLeaderDashboard';
import OperationsDashboard from './features/operations/components/OperationsDashboard';
import ConnectorDashboard from './features/connector/components/ConnectorDashboard';
import EmiCalculator from './features/connector/components/EmiCalculator';
import { CibilCheckPage, BankStatementAnalyzerPage } from './features/connector/components/ConnectorTools';
import CibilHistoryPage from './features/eligibility/components/CibilHistoryPage';
import CheckEligibility from './features/connector/components/CheckEligibility';
import TeamMeeting from './features/team-meeting/components/TeamMeeting';
import OpsTeamMeetingPage from './features/team-meeting/components/OpsTeamMeetingPage';
import DocumentLibrary from './features/documents/components/DocumentLibrary';
import CommissionDashboard from './features/commissions/components/CommissionDashboard';
import BusinessAnalytics from './features/analytics/components/BusinessAnalytics';
import ReportingDashboard from './features/reporting/components/ReportingDashboard';
import ConnectorHub from './features/admin/components/ConnectorHub';
import PayoutTracker from './features/admin/components/PayoutTracker';
import PoliciesPage from './features/policies/components/PoliciesPage';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import './index.css';

const queryClient = new QueryClient();

// Smart 404 — authenticated users go to their role home, others go to login
const SmartRedirect: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  const roleHome: Record<string, string> = {
    ADMIN:           '/dashboard',
    RM:              '/rm/dashboard',
    TEAM_LEADER:     '/tl/dashboard',
    OPERATIONS:      '/ops/dashboard',
    CONNECTOR:       '/connector/dashboard',
    PARTNER_MANAGER: '/pm/partners',
  };
  return <Navigate to={roleHome[user.role] ?? '/dashboard'} replace />;
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
              <Route path="/dashboard" element={<DashboardOverview />} />

              {/* CIBIL Check — all authenticated roles */}
              <Route path="/connector/cibil" element={<CibilCheckPage />} />
              
              {/* CIBIL History — ADMIN, RM, OPERATIONS */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'RM', 'OPERATIONS']} />}>
                <Route path="/cibil/history" element={<CibilHistoryPage />} />
              </Route>

              {/* Admin Specific Routes — platform config only, no partner access */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/users"         element={<UserManagement />} />
                <Route path="/admin/documents"     element={<DocumentLibrary />} />
                <Route path="/admin/reports"       element={<ReportingDashboard />} />
                <Route path="/admin/analytics"     element={<BusinessAnalytics />} />
                <Route path="/admin/policies"      element={<PoliciesPage />} />
                <Route path="/admin/team-meeting"  element={<TeamMeeting />} />
              </Route>

              {/* Partner Manager Routes — full ownership of partner lifecycle */}
              <Route element={<ProtectedRoute allowedRoles={['PARTNER_MANAGER']} />}>
                <Route path="/pm/partners"     element={<ConnectorHub />} />
                <Route path="/pm/payouts"      element={<PayoutTracker />} />
                <Route path="/pm/commissions"  element={<CommissionDashboard />} />
                <Route path="/pm/policies"     element={<PoliciesPage />} />
                <Route path="/pm/team-meeting" element={<TeamMeeting />} />
              </Route>

              {/* RM Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['RM']} />}>
                <Route path="/rm/dashboard"    element={<RegionalDashboard />} />
                <Route path="/rm/connectors"   element={<ConnectorTracker />} />
                <Route path="/rm/workflow"     element={<WorkflowMonitor />} />
                <Route path="/rm/policies"     element={<PoliciesPage />} />
                <Route path="/rm/team-meeting" element={<TeamMeeting />} />
              </Route>

              {/* Team Leader Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['TEAM_LEADER']} />}>
                <Route path="/tl/dashboard"    element={<TeamLeaderDashboard />} />
                <Route path="/tl/policies"     element={<PoliciesPage />} />
                <Route path="/tl/team-meeting" element={<TeamMeeting />} />
              </Route>

              {/* Operations Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['OPERATIONS']} />}>
                <Route path="/ops/dashboard"    element={<OperationsDashboard />} />
                <Route path="/ops/policies"     element={<PoliciesPage />} />
                <Route path="/ops/team-meeting" element={<OpsTeamMeetingPage />} />
              </Route>

              {/* Connector Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['CONNECTOR']} />}>
                <Route path="/connector/dashboard"          element={<ConnectorDashboard />} />
                <Route path="/connector/bsa"                element={<BankStatementAnalyzerPage />} />
                <Route path="/connector/foir"               element={<CheckEligibility />} />
                <Route path="/connector/emi-calculator"     element={<EmiCalculator />} />
                <Route path="/connector/earnings"           element={<CommissionDashboard />} />
                <Route path="/connector/policies"           element={<PoliciesPage />} />
                <Route path="/connector/team-meeting"       element={<TeamMeeting />} />
              </Route>
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
