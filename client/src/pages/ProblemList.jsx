import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../services/api';
import './Dashboard.css';
import './Workspace.css';

const fallback = [
  { id: 'PRB001002', title: 'Intermittent PostgreSQL connection pool saturation', state: 'Root Cause Analysis', priority: 'HIGH', owner: 'Rajkumar M.', relatedIncidents: ['INC0015847'], opened: '2026-05-01' },
];

export default function ProblemList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/problems')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setRows)
      .catch(() => setRows(fallback))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading"><div className="l-spinner" /> Loading problems…</div>;

  return (
    <div className="ops-page workspace-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Problem Management</h1>
          <p>Known errors, root cause analysis, and linked incidents (ITIL problem process).</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-secondary">⇩ Export</button>
          <button type="button" className="btn btn-primary">＋ New Problem</button>
        </div>
      </header>

      <section className="card">
        <div className="table-wrap">
          <table className="incidents-table compact">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Title</th>
                <th>State</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Related incidents</th>
                <th>Opened</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td><span className="inc-number">{p.id}</span></td>
                  <td className="inc-title"><strong>{p.title}</strong></td>
                  <td><span className="status-badge open">{p.state}</span></td>
                  <td><span className={`priority-badge ${String(p.priority).toLowerCase()}`}>{p.priority}</span></td>
                  <td>{p.owner}</td>
                  <td>
                    {(p.relatedIncidents || []).map((num) => (
                      <Link key={num} to={`/incidents/${num}`} className="inc-link">{num}</Link>
                    ))}
                  </td>
                  <td>{p.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
