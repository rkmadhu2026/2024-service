import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import './Dashboard.css';
import './Workspace.css';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/assets')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setAssets)
      .catch(() => setAssets([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading"><div className="l-spinner" /> Loading CMDB…</div>;

  return (
    <div className="ops-page workspace-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Assets / CMDB</h1>
          <p>Configuration items linked to incidents and changes.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-primary">＋ New CI</button>
        </div>
      </header>

      <section className="card">
        <div className="table-wrap">
          <table className="incidents-table compact">
            <thead>
              <tr>
                <th>CI ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Environment</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id}>
                  <td><span className="inc-number">{a.id}</span></td>
                  <td><strong>{a.name}</strong></td>
                  <td>{a.ciClass}</td>
                  <td>{a.environment}</td>
                  <td>{a.owner}</td>
                  <td><span className={`status-badge ${a.status === 'Degraded' ? 'open' : 'resolved'}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
