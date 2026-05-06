import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiGet, apiPatch } from '../services/api';
import './Dashboard.css';
import './IncidentBoard.css';

const COLUMNS = [
  ['OPEN', 'Open'],
  ['IN_PROGRESS', 'In Progress'],
  ['ON_HOLD', 'On Hold'],
  ['RESOLVED', 'Resolved'],
];

const statusClass = (status) => String(status || '').toLowerCase().replace('_', '-');
const priorityClass = (p) => String(p || '').toLowerCase();

export default function IncidentBoard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = useCallback(() => {
    apiGet('/incidents')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setIncidents)
      .catch(() => setIncidents([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const byStatus = useMemo(() => {
    const map = { OPEN: [], IN_PROGRESS: [], ON_HOLD: [], RESOLVED: [], CLOSED: [] };
    incidents.forEach((i) => {
      const k = i.status === 'CLOSED' ? 'CLOSED' : i.status;
      if (map[k]) map[k].push(i);
      else map.OPEN.push(i);
    });
    return map;
  }, [incidents]);

  const moveCard = (incident, newStatus) => {
    const label = newStatus === 'CLOSED' ? 'Closed' : (COLUMNS.find(([s]) => s === newStatus)?.[1] || newStatus);
    apiPatch(`/incidents/${incident.number}`, { status: newStatus, statusLabel: label }).then((r) => {
      if (r.ok) load();
    });
  };

  if (loading) {
    return <div className="dash-loading"><div className="l-spinner" /> Loading board…</div>;
  }

  return (
    <div className="ops-page incident-board-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Incident task board</h1>
          <p>Kanban-style triage — drag-free: move cards across states like ServiceNow visual boards.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-secondary" to="/incidents">List view</Link>
          <Link className="btn btn-primary" to="/incidents/new">＋ New Incident</Link>
        </div>
      </header>

      <div className="kanban-grid">
        {COLUMNS.map(([code, label]) => (
          <section className="kanban-column" key={code}>
            <header className="kanban-column-head">
              <h2>{label}</h2>
              <span className="kanban-count">{(byStatus[code] || []).length}</span>
            </header>
            <div className="kanban-cards">
              {(byStatus[code] || []).map((inc) => (
                <article
                  className={`kanban-card priority-${priorityClass(inc.priority)}`}
                  key={inc.number}
                  onClick={() => navigate(`/incidents/${inc.number}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/incidents/${inc.number}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="kanban-card-top">
                    <span className="inc-number">{inc.number}</span>
                    {inc.majorIncident && <span className="major-pill">Major</span>}
                  </div>
                  <strong className="kanban-card-title">{inc.title}</strong>
                  <div className="kanban-card-meta">
                    <span className={`priority-badge ${priorityClass(inc.priority)}`}>{inc.priorityLabel}</span>
                    <span className="kanban-assignee">{inc.assigneeInitials || 'UA'}</span>
                  </div>
                  <label className="kanban-move" onClick={(e) => e.stopPropagation()}>
                    <span>Move to</span>
                    <select
                      value={code}
                      onChange={(e) => {
                        moveCard(inc, e.target.value);
                      }}
                    >
                      {COLUMNS.map(([c, lbl]) => (
                        <option key={c} value={c}>{lbl}</option>
                      ))}
                      <option value="CLOSED">Closed</option>
                    </select>
                  </label>
                </article>
              ))}
            </div>
          </section>
        ))}
        <section className="kanban-column kanban-column--muted">
          <header className="kanban-column-head">
            <h2>Closed</h2>
            <span className="kanban-count">{(byStatus.CLOSED || []).length}</span>
          </header>
          <div className="kanban-cards">
            {(byStatus.CLOSED || []).map((inc) => (
              <article
                className="kanban-card kanban-card--done"
                key={inc.number}
                onClick={() => navigate(`/incidents/${inc.number}`)}
                role="button"
                tabIndex={0}
              >
                <span className="inc-number">{inc.number}</span>
                <strong className="kanban-card-title">{inc.title}</strong>
                <span className={`status-badge ${statusClass(inc.status)}`}>{inc.statusLabel}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
