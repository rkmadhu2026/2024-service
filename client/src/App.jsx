import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import LoginGate from './pages/LoginGate';
import Dashboard from './pages/Dashboard';
import IncidentList from './pages/IncidentList';
import IncidentBoard from './pages/IncidentBoard';
import IncidentDetail from './pages/IncidentDetail';
import DashboardLayout from './layouts/DashboardLayout';
import UVCollection from './pages/UVCollection';

import ChangeList from './pages/ChangeList';
import ChangeDetail from './pages/ChangeDetail';
import IncidentNew from './pages/IncidentNew';
import ProblemList from './pages/ProblemList';
import NetworkPage from './pages/NetworkPage';
import AssetList from './pages/AssetList';
import IntegrationsPage from './pages/IntegrationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginGate />} />

        <Route path="/uv-collection" element={<UVCollection />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="incidents" element={<IncidentList />} />
            <Route path="incidents/board" element={<IncidentBoard />} />
            <Route path="incidents/new" element={<IncidentNew />} />
            <Route path="incidents/:id" element={<IncidentDetail />} />
            <Route path="changes/:id" element={<ChangeDetail />} />
            <Route path="changes" element={<ChangeList />} />
            <Route path="problems" element={<ProblemList />} />
            <Route path="network" element={<NetworkPage />} />
            <Route path="assets" element={<AssetList />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="*" element={<div style={{ padding: '24px' }}>Page Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
