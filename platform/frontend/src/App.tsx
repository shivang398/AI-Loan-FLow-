import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import PartnerRegistration from './pages/PartnerRegistration';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './features/dashboard/components/DashboardOverview';
import UserManagement from './features/users/components/UserManagement';
import RegionalDashboard from './features/rm/components/RegionalDashboard';
import TeamLeaderDashboard from './features/team-leader/components/TeamLeaderDashboard';
import OperationsDashboard from './features/operations/components/OperationsDashboard';
import ConnectorDashboard from './features/connector/components/ConnectorDashboard';
import LeadOnboardingWizard from './features/connector/components/LeadOnboardingWizard';
import { CibilCheckPage, BankStatementAnalyzerPage, FoirCalculatorPage } from './features/connector/components/ConnectorTools';
import TeamMeeting from './features/team-meeting/components/TeamMeeting';
import OpsTeamMeetingPage from './features/team-meeting/components/OpsTeamMeetingPage';
import DocumentLibrary from './features/documents/components/DocumentLibrary';
import CommissionDashboard from './features/commissions/components/CommissionDashboard';
import BusinessAnalytics from './features/analytics/components/BusinessAnalytics';
import ReportingDashboard from './features/reporting/components/ReportingDashboard';
import ConnectorHub from './features/admin/components/ConnectorHub';
import PayoutTracker from './features/admin/components/PayoutTracker';
import './index.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              
              {/* Admin Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/users"         element={<UserManagement />} />
                <Route path="/admin/connectors"    element={<ConnectorHub />} />
                <Route path="/admin/documents"     element={<DocumentLibrary />} />
                <Route path="/admin/reports"       element={<ReportingDashboard />} />
                <Route path="/admin/payouts"       element={<PayoutTracker />} />
                <Route path="/admin/analytics"     element={<BusinessAnalytics />} />
                <Route path="/admin/team-meeting"  element={<TeamMeeting />} />
              </Route>

              {/* RM Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['RM']} />}>
                <Route path="/rm/dashboard"    element={<RegionalDashboard />} />
                <Route path="/rm/connectors"   element={<div>Connector Tracker Page</div>} />
                <Route path="/rm/workflow"     element={<div>Workflow Monitor Page</div>} />
                <Route path="/rm/team-meeting" element={<TeamMeeting />} />
              </Route>

              {/* Team Leader Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['TEAM_LEADER']} />}>
                <Route path="/tl/dashboard"    element={<TeamLeaderDashboard />} />
                <Route path="/tl/team-meeting" element={<TeamMeeting />} />
              </Route>

              {/* Operations Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['OPERATIONS']} />}>
                <Route path="/ops/dashboard"    element={<OperationsDashboard />} />
                <Route path="/ops/team-meeting" element={<OpsTeamMeetingPage />} />
              </Route>

              {/* Connector Specific Routes */}
              <Route element={<ProtectedRoute allowedRoles={['CONNECTOR']} />}>
                <Route path="/connector/dashboard"    element={<ConnectorDashboard />} />
                <Route path="/connector/onboard"      element={<LeadOnboardingWizard />} />
                <Route path="/connector/cibil"        element={<CibilCheckPage />} />
                <Route path="/connector/bsa"          element={<BankStatementAnalyzerPage />} />
                <Route path="/connector/foir"         element={<FoirCalculatorPage />} />
                <Route path="/connector/earnings"     element={<CommissionDashboard />} />
                <Route path="/connector/team-meeting" element={<TeamMeeting />} />
              </Route>
            </Route>
          </Route>

          {/* Public landing routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/partners/register" element={<PartnerRegistration />} />

          {/* Fallback to dashboard for authenticated users */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
