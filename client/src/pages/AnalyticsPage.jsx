import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiGet } from '../services/api';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiGet('/incidents').then((r) => r.ok && r.json()).then(setIncidents);
    apiGet('/dashboard/stats').then((r) => r.ok && r.json()).then(setStats);
  }, []);

  const byPriority = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => incidents.filter((i) => i.priority === p).length);
  const byState = ['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED'].map((s) => incidents.filter((i) => i.status === s).length);

  const barData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{ label: 'Incidents', data: byPriority, backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#94a3b8'] }],
  };

  const doughnutData = {
    labels: ['Open', 'In progress', 'On hold', 'Resolved', 'Closed'],
    datasets: [{
      data: byState,
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e', '#64748b'],
    }],
  };

  return (
    <div className="ops-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Analytics</h1>
          <p>Operational insight derived from live incident data in this environment.</p>
        </div>
      </header>

      {stats && (
        <section className="stats-grid">
          <article className="stat-card critical"><div className="stat-value">{stats.incidents?.total}</div><div className="stat-label">Open incidents</div></article>
          <article className="stat-card warning"><div className="stat-value">{stats.incidents?.majorOpen}</div><div className="stat-label">Major (open)</div></article>
          <article className="stat-card info"><div className="stat-value">{stats.problems?.open}</div><div className="stat-label">Open problems</div></article>
          <article className="stat-card success"><div className="stat-value">{stats.services?.uptime}</div><div className="stat-label">Service uptime</div></article>
        </section>
      )}

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header"><div className="card-title">By priority</div></div>
          <div className="card-body chart-panel" style={{ height: 280 }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">By state</div></div>
          <div className="card-body chart-panel" style={{ height: 280 }}>
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}
