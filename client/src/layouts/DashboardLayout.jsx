import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const NAV_SECTIONS = [
  {
    title: 'Operations',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: '▦' },
      { to: '/incidents', label: 'Incidents', icon: '△', badge: '23' },
      { to: '/incidents/board', label: 'Incident board', icon: '▣' },
      { to: '/changes', label: 'Changes', icon: '⑂', badge: '8', badgeClass: 'warning' },
      { to: '/problems', label: 'Problems', icon: '!' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { to: '/network', label: 'Network Topology', icon: '⌁' },
      { to: '/assets', label: 'Assets / CMDB', icon: '□' },
      { to: '/integrations', label: 'Integrations', icon: '⌘' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { to: '/analytics', label: 'Analytics', icon: '↗' },
      { to: '/reports', label: 'Reports', icon: '▤' },
      { to: '/settings', label: 'Admin Settings', icon: '⚙' },
    ],
  },
];

const pageTitles = {
  '/dashboard': 'Operations Dashboard',
  '/incidents': 'Incident Management',
  '/incidents/board': 'Incident Task Board',
  '/incidents/new': 'Create Incident',
  '/changes': 'Change Management',
  '/problems': 'Problem Management',
  '/network': 'Network Topology',
  '/assets': 'Assets / CMDB',
  '/integrations': 'Integrations',
  '/analytics': 'Analytics',
  '/reports': 'Reports',
  '/settings': 'Admin Settings',
  '/notifications': 'Notifications',
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentTitle = pageTitles[location.pathname]
    || (location.pathname.startsWith('/incidents/') && location.pathname !== '/incidents/board' ? 'Incident Detail' : 'Workspace');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      const next = `${location.pathname}${location.search || ''}`;
      navigate(`/login?next=${encodeURIComponent(next)}`, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dash-shell">
      {mobileOpen && <button className="dash-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <aside className={`dash-sidebar ${mobileOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">LE</div>
          <div className="sidebar-brand">
            <h1>LinkedEye</h1>
            <span>FinSpot ITSM</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_SECTIONS.map((section) => (
            <div className="nav-section" key={section.title}>
              <div className="nav-section-title">{section.title}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className={`nav-badge ${item.badgeClass || ''}`}>{item.badge}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="env-selector">
            <span className="env-dot" />
            <div className="env-info">
              <div className="env-name">Production</div>
              <div className="env-label">fs-mum-indmoney-prod-le</div>
            </div>
            <span className="env-chevron">⌄</span>
          </div>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <button className="mobile-menu-btn" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>☰</button>
          <div className="search-box">
            <span>⌕</span>
            <input placeholder="Search incidents, changes, CIs..." />
            <kbd>⌘K</kbd>
          </div>
          <div className="breadcrumb-line">
            <span>LinkedEye</span>
            <span>/</span>
            <strong>{currentTitle}</strong>
          </div>
          <div className="topbar-actions">
            <button type="button" className="header-btn" title="Notifications" onClick={() => navigate('/notifications')}>
              ◌
              <span className="header-badge">3</span>
            </button>
            <button className="header-btn" title="Help">?</button>
            <button className="user-menu" onClick={logout} title="Sign out">
              <span className="user-avatar">{(user.avatar || user.name || 'RM').slice(0, 2).toUpperCase()}</span>
              <span className="user-info">
                <strong>{user.name || 'Rajkumar Madhu'}</strong>
                <small>{user.role || 'Administrator'}</small>
              </span>
            </button>
          </div>
        </header>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
