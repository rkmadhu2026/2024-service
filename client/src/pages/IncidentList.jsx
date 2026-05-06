import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiGet } from '../services/api';
import './Dashboard.css';
import './IncidentList.css';

function assigneeIsCurrentUser(assignee) {
  try {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    const name = (u.name || '').trim();
    if (!name || !assignee) return false;
    const first = name.split(/\s+/)[0];
    return assignee.includes(first);
  } catch {
    return false;
  }
}

const fallbackIncidents = [
  { id: 'INC0015847', number: 'INC0015847', title: 'Database Connection Pool Exhaustion - Critical Impact on Trading', priority: 'CRITICAL', priorityLabel: '1 - Critical', status: 'IN_PROGRESS', statusLabel: 'In Progress', assignee: 'Rajkumar M.', assigneeInitials: 'RM', assignmentGroup: 'Infrastructure Ops', ci: 'prod-db-01.fs-mum-indmoney-prod-le', source: 'Prometheus', sourceType: 'auto', age: '12m', slaRemaining: '1h 48m', slaPercent: 25, slaState: 'good' },
  { id: 'INC0015846', number: 'INC0015846', title: 'High CPU Alert - Trading Engine Overloaded', priority: 'CRITICAL', priorityLabel: '1 - Critical', status: 'OPEN', statusLabel: 'Open', assignee: 'Siva K.', assigneeInitials: 'SK', assignmentGroup: 'Network Ops', ci: 'trading-engine-01.neo-prod-le', source: 'Alertmanager', sourceType: 'auto', age: '18m', slaRemaining: '48m', slaPercent: 60, slaState: 'warning' },
];

const priorityClass = (priority) => String(priority || '').toLowerCase() === 'critical' ? 'critical' : String(priority || '').toLowerCase();
const statusClass = (status) => String(status || '').toLowerCase().replace('_', '-');

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('MY');
  const [priority, setPriority] = useState('ALL');
  const [slaFilter, setSlaFilter] = useState(false);
  const [majorOnly, setMajorOnly] = useState(false);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    apiGet('/incidents')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setIncidents(data))
      .catch(() => setIncidents(fallbackIncidents))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = searchParams.get('queue');
      const maj = searchParams.get('major') === '1';
      setSlaFilter(false);
      setMajorOnly(maj);
      if (maj) {
        setView('ALL');
        setPriority('ALL');
      }
      if (q === 'unassigned') {
        setView('UNASSIGNED');
        setPriority('ALL');
      } else if (q === 'mine') {
        setView('MY');
        setPriority('ALL');
      } else if (q === 'critical') {
        setView('ALL');
        setPriority('CRITICAL_HIGH');
      } else if (q === 'sla') {
        setView('ALL');
        setPriority('ALL');
        setSlaFilter(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return incidents.filter((incident) => {
      const closed = incident.status === 'RESOLVED' || incident.status === 'CLOSED';
      if (view === 'UNASSIGNED' || view === 'MY') {
        if (closed) return false;
      }
      if (slaFilter || priority === 'CRITICAL_HIGH') {
        if (closed) return false;
      }
      if (majorOnly && !incident.majorIncident) return false;

      if (slaFilter) {
        const atRisk = incident.slaState === 'warning' || (incident.slaPercent != null && incident.slaPercent >= 60);
        if (!atRisk) return false;
      }
      if (priority === 'CRITICAL_HIGH') {
        if (incident.priority !== 'CRITICAL' && incident.priority !== 'HIGH') return false;
      } else if (priority !== 'ALL' && incident.priority !== priority) {
        return false;
      }
      if (view === 'UNASSIGNED') return incident.assignee === 'Unassigned';
      if (view === 'MY') return assigneeIsCurrentUser(incident.assignee);
      return true;
    });
  }, [incidents, priority, view, slaFilter, majorOnly]);

  const summary = useMemo(() => ({
    CRITICAL: incidents.filter((i) => i.priority === 'CRITICAL').length,
    HIGH: incidents.filter((i) => i.priority === 'HIGH').length,
    MEDIUM: incidents.filter((i) => i.priority === 'MEDIUM').length,
    LOW: incidents.filter((i) => i.priority === 'LOW').length,
    RESOLVED: incidents.filter((i) => i.status === 'RESOLVED').length + 156,
  }), [incidents]);

  const toggleSelected = (number) => {
    setSelected((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  };

  if (loading) {
    return <div className="dash-loading"><div className="l-spinner" /> Synchronizing incidents...</div>;
  }

  return (
    <div className="incident-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Incident Management</h1>
          <p>ITIL-style lifecycle — impact & urgency drive priority; triage, assign, resolve.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-secondary" to="/incidents/board">⌁ Board</Link>
          <button type="button" className="btn btn-secondary">⇩ Export</button>
          <Link className="btn btn-primary" to="/incidents/new">＋ New Incident</Link>
        </div>
      </header>

      <section className="stats-row">
        <MiniStat tone="critical" label="Critical" value={summary.CRITICAL} icon="▲" />
        <MiniStat tone="high" label="High" value={summary.HIGH} icon="!" />
        <MiniStat tone="medium" label="Medium" value={summary.MEDIUM} icon="●" />
        <MiniStat tone="low" label="Low" value={summary.LOW} icon="i" />
        <MiniStat tone="resolved" label="Resolved (30d)" value={summary.RESOLVED} icon="✓" />
      </section>

      <section className="incident-toolbar">
        <div className="toolbar-left">
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="ALL">Priority: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <button className="filter-btn">Status ▾</button>
          <button className="filter-btn">Assignee ▾</button>
          <button className="filter-btn">Environment ▾</button>
          <button className="filter-btn">Last 7 Days ▾</button>
        </div>
        <div className="toolbar-right">
          {selected.length > 0 && (
            <div className="bulk-actions">
              <strong>{selected.length}</strong> selected
              <button className="btn btn-secondary small-btn">Assign</button>
              <button className="btn btn-secondary small-btn">Resolve</button>
            </div>
          )}
          <div className="view-tabs">
            {[
              ['MY', 'My Incidents'],
              ['UNASSIGNED', 'Unassigned'],
              ['ALL', 'All'],
            ].map(([value, label]) => (
              <button key={value} className={`view-tab ${view === value ? 'active' : ''}`} onClick={() => setView(value)}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="table-wrap">
          <table className="incidents-table queue-table">
            <thead>
              <tr>
                <th className="checkbox-cell"><input type="checkbox" aria-label="Select all incidents" /></th>
                <th>Incident ↑</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Age</th>
                <th>SLA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((incident) => (
                <tr key={incident.number} className={selected.includes(incident.number) ? 'selected' : ''} onClick={() => navigate(`/incidents/${incident.number}`)}>
                  <td className="checkbox-cell" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Select ${incident.number}`}
                      checked={selected.includes(incident.number)}
                      onChange={() => toggleSelected(incident.number)}
                    />
                  </td>
                  <td>
                    <span className="inc-number">{incident.number}</span>
                    <span className={`inc-source ${incident.sourceType}`}>{incident.sourceType === 'auto' ? '↻' : '○'} {incident.source}</span>
                  </td>
                  <td className="inc-title">
                    <strong>{incident.title}</strong>
                    <small>{incident.ci}</small>
                  </td>
                  <td><span className={`priority-badge ${priorityClass(incident.priority)}`}>{incident.priorityLabel}</span></td>
                  <td><span className={`status-badge ${statusClass(incident.status)}`}>{incident.statusLabel}</span></td>
                  <td>
                    {incident.assignee === 'Unassigned' ? <span className="unassigned">Unassigned</span> : <Assignee incident={incident} />}
                  </td>
                  <td><span className={`age ${incident.priority === 'CRITICAL' ? 'critical' : ''}`}>{incident.age}</span></td>
                  <td><Sla incident={incident} /></td>
                  <td onClick={(event) => event.stopPropagation()}>
                    <div className="row-actions">
                      <button title="View">◌</button>
                      <button title="Assign">＋</button>
                      <button title="More">⋮</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing <strong>1-{filtered.length}</strong> of <strong>{incidents.length}</strong> incidents</div>
      </section>
    </div>
  );
}

function MiniStat({ tone, label, value, icon }) {
  return (
    <article className={`stat-mini ${tone}`}>
      <span className="stat-mini-icon">{icon}</span>
      <span>
        <strong>{value}</strong>
        <small>{label}</small>
      </span>
    </article>
  );
}

function Assignee({ incident }) {
  return (
    <div className="assignee rich">
      <span className="assignee-avatar">{incident.assigneeInitials}</span>
      <span>
        <strong>{incident.assignee}</strong>
        <small>{incident.assignmentGroup}</small>
      </span>
    </div>
  );
}

function Sla({ incident }) {
  return (
    <div className="sla-indicator">
      <div className="sla-bar">
        <span className={`sla-fill ${incident.slaState}`} style={{ width: `${incident.slaPercent}%` }} />
      </div>
      <span>{incident.slaRemaining}</span>
    </div>
  );
}
