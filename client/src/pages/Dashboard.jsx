import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiGet } from '../services/api';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const fallbackStats = {
  workspace: {
    tagline: 'Restore normal service operation — prioritize by impact & urgency, resolve fast.',
  },
  incidents: {
    critical: 2,
    high: 2,
    total: 6,
    unassigned: 1,
    myOpen: 2,
    slaAtRisk: 1,
    majorOpen: 1,
    resolved30d: 156,
    mttr: '24m',
    sla: '98.7%',
  },
  problems: { open: 2, total: 3 },
  recent: [
    { number: 'INC0015847', title: 'Database Connection Pool Exhaustion', ci: 'prod-db-01.fs-mum-indmoney-prod-le', priority: 'critical', priorityLabel: '1 - Critical', status: 'in-progress', statusLabel: 'In Progress', assignee: 'Rajkumar M.', initials: 'RM', age: '12m', majorIncident: true, reporter: 'Prometheus' },
    { number: 'INC0015846', title: 'High CPU Alert - Trading Engine', ci: 'trading-engine-01.neo-prod-le', priority: 'critical', priorityLabel: '1 - Critical', status: 'open', statusLabel: 'Open', assignee: 'Siva K.', initials: 'SK', age: '18m', majorIncident: false, reporter: 'Alertmanager' },
    { number: 'INC0015845', title: 'Network Latency Spike - Core Switch', ci: 'sw-core-01.fs-dx-le', priority: 'high', priorityLabel: '2 - High', status: 'in-progress', statusLabel: 'In Progress', assignee: 'Edukondalu P.', initials: 'EP', age: '45m', majorIncident: false, reporter: 'NOC' },
    { number: 'INC0015844', title: 'Disk Space Warning - Log Volume', ci: 'app-server-03.lemonn-mum-le', priority: 'medium', priorityLabel: '3 - Medium', status: 'open', statusLabel: 'Open', assignee: 'Devendrareddy P.', initials: 'DP', age: '1h 23m', majorIncident: false, reporter: 'Prometheus' },
  ],
  trend: {
    labels: ['Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24'],
    critical: [2, 4, 3, 5, 2, 4, 3],
    high: [6, 8, 7, 9, 6, 8, 5],
  },
};

const timeline = [
  ['alert', 'Alert triggered: High CPU on prod-db-01', 'Prometheus • 2 minutes ago'],
  ['automation', 'Auto-remediation started for INC0015847', 'StackStorm • 5 minutes ago'],
  ['incident', 'INC0015846 assigned to Siva K.', 'Smart Routing • 8 minutes ago'],
  ['change', 'CHG0012456 approved by CAB', 'Change Advisory Board • 15 minutes ago'],
  ['resolved', 'INC0015843 resolved by Rajkumar A.', 'MTTR: 45 minutes • 20 minutes ago'],
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiGet('/dashboard/stats')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setStats(data))
      .catch(() => setStats(fallbackStats))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return <div className="dash-loading"><div className="l-spinner" /> Loading dashboard...</div>;
  }

  const recentRows = stats.recent && stats.recent.length > 0 ? stats.recent : fallbackStats.recent;
  const inc = stats.incidents || {};

  const chartData = {
    labels: stats.trend.labels,
    datasets: [
      {
        label: 'Critical',
        data: stats.trend.critical,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.38,
      },
      {
        label: 'High',
        data: stats.trend.high,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.38,
      },
    ],
  };

  return (
    <div className="ops-page im-agent-workspace">
      <section className="im-workspace-hero">
        <div>
          <p className="im-workspace-eyebrow">Incident Management · Agent workspace</p>
          <h1 className="im-workspace-title">Operations Dashboard</h1>
          <p className="im-workspace-tagline">{stats.workspace?.tagline || fallbackStats.workspace.tagline}</p>
        </div>
        <div className="im-queue-chips">
          <Link className="im-queue-chip" to="/incidents/board"><strong>⌁</strong><span>Task board</span></Link>
          <Link className="im-queue-chip" to="/incidents?queue=mine"><strong>{inc.myOpen ?? '—'}</strong><span>My open</span></Link>
          <Link className="im-queue-chip im-queue-chip--warn" to="/incidents?queue=unassigned"><strong>{inc.unassigned ?? '—'}</strong><span>Unassigned</span></Link>
          <Link className="im-queue-chip" to="/incidents?queue=critical"><strong>{inc.critical ?? '—'}</strong><span>Critical</span></Link>
          <Link className="im-queue-chip im-queue-chip--danger" to="/incidents?queue=sla"><strong>{inc.slaAtRisk ?? '—'}</strong><span>SLA at risk</span></Link>
          <Link className="im-queue-chip im-queue-chip--major" to="/incidents?major=1"><strong>{inc.majorOpen ?? '—'}</strong><span>Major</span></Link>
        </div>
      </section>

      <header className="page-header">
        <div className="page-title">
          <h2 className="im-section-heading">Overview</h2>
          <p><span className="live-indicator">Live queue</span><span>• Open incidents by priority & SLA signals</span></p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-secondary">⇩ Export</button>
          <Link className="btn btn-primary" to="/incidents/new">＋ New Incident</Link>
        </div>
      </header>

      <section className="stats-grid">
        <StatCard tone="critical" icon="▲" value={inc.critical} label="Critical (open)" trend="Queue" />
        <StatCard tone="warning" icon="!" value={inc.total} label="All open" trend="Active" />
        <StatCard tone="success" icon="◷" value={inc.mttr} label="Avg. MTTR" trend="Target" />
        <StatCard tone="info" icon="✓" value={inc.sla} label="SLA compliance" trend="30d" />
      </section>

      <div className="filter-tabs">
        <Link className="filter-tab active" to="/dashboard">Overview</Link>
        <Link className="filter-tab" to="/incidents">All open</Link>
        <Link className="filter-tab" to="/incidents/board">Board</Link>
        <Link className="filter-tab" to="/incidents?queue=critical">Critical / High</Link>
        <Link className="filter-tab" to="/incidents?queue=mine">Assigned to me</Link>
        <Link className="filter-tab" to="/incidents?queue=unassigned">Unassigned</Link>
        <Link className="filter-tab" to="/incidents?major=1">Major</Link>
      </div>

      <section className="card">
        <div className="card-header">
          <div className="card-title">△ Open incidents (priority order)</div>
          <Link className="btn btn-secondary small-btn" to="/incidents">View All →</Link>
        </div>
        <div className="table-wrap">
          <table className="incidents-table compact">
            <thead>
              <tr>
                <th>Incident #</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Caller</th>
                <th>Major</th>
                <th>Assignee</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {recentRows.map((row) => (
                <tr key={row.number} onClick={() => navigate(`/incidents/${row.number}`)}>
                  <td><span className="inc-number">{row.number}</span></td>
                  <td className="inc-title"><strong>{row.title}</strong><small>CI: {row.ci}</small></td>
                  <td><span className={`priority-badge ${row.priority}`}>{row.priorityLabel}</span></td>
                  <td><span className={`status-badge ${row.status}`}>{row.statusLabel}</span></td>
                  <td><span className="caller-cell">{row.reporter || '—'}</span></td>
                  <td>{row.majorIncident ? <span className="major-table-pill">Major</span> : '—'}</td>
                  <td><Assignee initials={row.initials} name={row.assignee} /></td>
                  <td><span className={`age ${row.priority === 'critical' ? 'critical' : ''}`}>{row.age}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <div className="card-header"><div className="card-title">↗ Incident Trend (Last 7 Days)</div></div>
          <div className="card-body chart-panel">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, grid: { color: '#edf1f5' } }, x: { grid: { display: false } } } }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">≡ Activity Timeline</div></div>
          <div className="activity-timeline">
            {timeline.map(([tone, title, meta]) => (
              <div className="activity-item" key={title}>
                <span className={`activity-icon ${tone}`}>{tone === 'resolved' ? '✓' : tone === 'automation' ? '↻' : '!'}</span>
                <span><strong>{title}</strong><small>{meta}</small></span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ tone, icon, value, label, trend }) {
  const trendDir = trend.includes('↑') ? 'up' : trend.includes('↓') ? 'down' : 'neutral';
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className={`stat-trend ${trendDir}`}>{trend}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </article>
  );
}

function Assignee({ initials, name }) {
  return (
    <div className="assignee">
      <span className="assignee-avatar">{initials}</span>
      <span>{name}</span>
    </div>
  );
}
