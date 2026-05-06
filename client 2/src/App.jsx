import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import DashboardLayout from './layouts/DashboardLayout';
import UVCollection from './pages/UVCollection';

import ChangeList from './pages/ChangeList';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* UV Collection E-commerce Route */}
        <Route path="/uv-collection" element={<UVCollection />} />
        
        {/* Protected Dashboard Routes wrapped in DashboardLayout */}
        <Route 
          path="/" 
          element={<DashboardLayout />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="incidents" element={<IncidentList />} />
          <Route path="incidents/:id" element={<IncidentDetail />} />
          <Route path="changes" element={<ChangeList />} />
          <Route path="*" element={<div style={{padding: '24px'}}>Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Needed because routing nesting uses Outlet
import { Outlet } from 'react-router-dom';

export default App;
