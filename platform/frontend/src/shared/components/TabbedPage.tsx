import React from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserRole } from '../../store/slices/authSlice';
import FeatureErrorBoundary from './FeatureErrorBoundary';

export interface PageTab {
  key: string;
  label: string;
  element: React.ReactNode;
  roles?: UserRole[];   // omit = every role that can open the page
}

/**
 * One sidebar entry, several related tools. The active tab lives in ?tab= so links and
 * the browser back button work; only the active tab is mounted.
 */
const TabbedPage: React.FC<{ tabs: PageTab[] }> = ({ tabs }) => {
  const role = useSelector((s: RootState) => s.auth.user?.role);
  const [params, setParams] = useSearchParams();
  const visible = tabs.filter(t => !t.roles || (role && t.roles.includes(role)));
  const active = visible.find(t => t.key === params.get('tab')) ?? visible[0];
  if (!active) return null;

  return (
    <div>
      {visible.length > 1 && (
        <Tabs
          activeKey={active.key}
          onChange={key => setParams({ tab: key })}
          items={visible.map(t => ({ key: t.key, label: t.label }))}
          style={{ marginBottom: 8 }}
        />
      )}
      <FeatureErrorBoundary key={active.key} feature={active.label}>{active.element}</FeatureErrorBoundary>
    </div>
  );
};

export default TabbedPage;
