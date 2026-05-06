import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import './Dashboard.css';
import './Workspace.css';

export default function IntegrationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/integrations')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading"><div className="l-spinner" /> Loading integrations…</div>;

  return (
    <div className="ops-page workspace-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Integrations</h1>
          <p>Monitoring, automation, notifications, and self-service channels.</p>
        </div>
      </header>

      <div className="integrations-grid">
        {items.map((x) => (
          <article className="integration-card" key={x.id}>
            <p className="int-type">{x.type}</p>
            <h3>{x.name}</h3>
            <p className="node-meta">{x.direction}</p>
            <p className="node-meta">Last sync: {x.lastSync}</p>
            <span className={`badge-connected ${x.status === 'Pilot' ? 'badge-pilot' : ''}`}>{x.status}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
