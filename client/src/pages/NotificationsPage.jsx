import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../services/api';
import './Dashboard.css';

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet('/notifications').then((r) => r.ok && r.json()).then(setItems);
  }, []);

  return (
    <div className="ops-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Notifications</h1>
          <p>SLA, major incident, and change alerts (demo feed).</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-secondary" to="/dashboard">← Dashboard</Link>
        </div>
      </header>

      <section className="card">
        <div className="activity-timeline" style={{ padding: 16 }}>
          {items.map((n) => (
            <div className="activity-item" key={n.id}>
              <span className={`activity-icon ${n.type}`}>{n.read ? '○' : '●'}</span>
              <span><strong>{n.title}</strong><small>{n.time}</small></span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
