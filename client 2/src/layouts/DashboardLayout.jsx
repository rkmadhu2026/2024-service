import { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const NAV_ITEMS = [
    {
        section: 'Operations',
        items: [
            { to: '/dashboard',   label: 'Overview',   icon: <GridIcon /> },
            { to: '/incidents',   label: 'Incidents',   icon: <AlertIcon /> },
            { to: '/changes',     label: 'Changes',     icon: <GitIcon /> },
            { to: '/problems',    label: 'Problems',    icon: <TriangleIcon /> },
        ]
    },
    {
        section: 'Infrastructure',
        items: [
            { to: '/network',     label: 'Network',     icon: <NetworkIcon /> },
            { to: '/integrations',label: 'Integrations',icon: <LinkIcon /> },
            { to: '/analytics',   label: 'Analytics',   icon: <ChartIcon /> },
            { to: '/reports',     label: 'Reports',     icon: <FileIcon /> },
        ]
    },
    {
        section: 'Management',
        items: [
            { to: '/assets',      label: 'Assets',      icon: <BoxIcon /> },
            { to: '/users',       label: 'Users',       icon: <UsersIcon /> },
            { to: '/settings',    label: 'Settings',    icon: <SettingsIcon /> },
        ]
    },
];

export default function DashboardLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Get current page label
    const currentLabel = NAV_ITEMS.flatMap(s => s.items).find(i => i.to === location.pathname)?.label || 'Dashboard';

    return (
        <div className={`dash-shell ${collapsed ? 'dash-shell--collapsed' : ''}`}>
            {/* ── Overlay for mobile ── */}
            {mobileOpen && (
                <div className="dash-overlay" onClick={() => setMobileOpen(false)} />
            )}

            {/* ══════════════════════════════════
                Sidebar
            ══════════════════════════════════ */}
            <aside className={`dash-sidebar ${mobileOpen ? 'dash-sidebar--open' : ''}`}>
                {/* Logo */}
                <div className="dash-logo">
                    <div className="dash-logo__icon">
                        <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="17" stroke="#C9A96E" strokeWidth="1.5"/>
                            <path d="M12 18 Q18 10 24 18 Q18 26 12 18Z" fill="#C9A96E"/>
                        </svg>
                    </div>
                    {!collapsed && <span className="dash-logo__text">LinkedEye</span>}
                    <button
                        className="dash-collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? 'Expand' : 'Collapse'}
                    >
                        <ChevronIcon collapsed={collapsed} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="dash-nav">
                    {NAV_ITEMS.map(section => (
                        <div key={section.section} className="dash-nav__section">
                            {!collapsed && (
                                <p className="dash-nav__label">{section.section}</p>
                            )}
                            {section.items.map(item => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `dash-nav__item ${isActive ? 'dash-nav__item--active' : ''}`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className="dash-nav__icon">{item.icon}</span>
                                    {!collapsed && <span className="dash-nav__text">{item.label}</span>}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User foot */}
                <div className="dash-user">
                    <div className="dash-user__avatar">
                        {(user.name || user.email || 'A')[0].toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="dash-user__info">
                            <span className="dash-user__name">{user.name || 'Admin'}</span>
                            <span className="dash-user__role">{user.role || 'Administrator'}</span>
                        </div>
                    )}
                    <button
                        className="dash-logout-btn"
                        onClick={logout}
                        title="Sign out"
                    >
                        <LogoutIcon />
                    </button>
                </div>
            </aside>

            {/* ══════════════════════════════════
                Main area
            ══════════════════════════════════ */}
            <div className="dash-main">
                {/* Topbar */}
                <header className="dash-topbar">
                    <button
                        className="dash-menu-btn"
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </button>
                    <div className="dash-topbar__breadcrumb">
                        <span className="dash-topbar__brand">LinkedEye</span>
                        <span className="dash-topbar__sep">/</span>
                        <span className="dash-topbar__page">{currentLabel}</span>
                    </div>
                    <div className="dash-topbar__right">
                        {/* Live status */}
                        <div className="dash-status-pill">
                            <span className="dash-status-dot" />
                            All Systems Operational
                        </div>
                        {/* Notification bell */}
                        <button className="dash-icon-btn" title="Notifications">
                            <BellIcon />
                            <span className="dash-notif-badge">3</span>
                        </button>
                        {/* User avatar */}
                        <div className="dash-topbar-avatar" title={user.name}>
                            {(user.name || 'A')[0]}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="dash-content">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
}

// ─── Icon components ──────────────────────────
function GridIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function AlertIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function GitIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>; }
function TriangleIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>; }
function NetworkIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M12 8v3M5 15l4-4M19 15l-4-4"/></svg>; }
function LinkIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>; }
function ChartIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function FileIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function BoxIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>; }
function UsersIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function SettingsIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function LogoutIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }
function BellIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function MenuIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }

function ChevronIcon({ collapsed }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <polyline points="15 18 9 12 15 6"/>
        </svg>
    );
}
