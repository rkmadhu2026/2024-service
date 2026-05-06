import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPatch } from '../services/api';
import './Dashboard.css';
import './IncidentDetail.css';

const STATE_OPTIONS = [
  ['OPEN', 'Open'],
  ['IN_PROGRESS', 'In Progress'],
  ['ON_HOLD', 'On Hold'],
  ['RESOLVED', 'Resolved'],
  ['CLOSED', 'Closed'],
];

const IU = [
  ['HIGH', '1 - High'],
  ['MEDIUM', '2 - Medium'],
  ['LOW', '3 - Low'],
];

const priorityClass = (priority) => String(priority || '').toLowerCase() === 'critical' ? 'critical' : String(priority || '').toLowerCase();
const statusClass = (status) => String(status || '').toLowerCase().replace('_', '-');

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [prob, setProb] = useState('');
  const [chg, setChg] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    apiGet(`/incidents/${id}`)
      .then((res) => {
        if (!res.ok) {
          const requestError = new Error(res.status === 404 ? 'Incident not found' : 'Unable to load incident');
          requestError.status = res.status;
          throw requestError;
        }
        return res.json();
      })
      .then((data) => {
        setIncident(data);
        setProb(data.problemId || '');
        setChg(data.changeId || '');
      })
      .catch((err) => {
        setIncident(null);
        setError(err.status === 401 ? 'Please sign in to view this incident.' : err.message || 'Unable to load incident');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const currentUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  };

  const patchIncident = async (body) => {
    setSaving(true);
    try {
      const res = await apiPatch(`/incidents/${id}`, body);
      if (res.ok) {
        const data = await res.json();
        setIncident(data);
      }
    } finally {
      setSaving(false);
    }
  };

  const addNote = (event) => {
    event.preventDefault();
    if (!note.trim()) return;
    const u = currentUser();
    patchIncident({ workNote: { text: note.trim(), author: u.name || 'Agent' } });
    setNote('');
  };

  const resolveIncident = () => {
    patchIncident({ status: 'RESOLVED', statusLabel: 'Resolved' });
  };

  const reassignToMe = () => {
    const u = currentUser();
    const name = u.name === 'Rajkumar Madhu' ? 'Rajkumar M.' : (u.name || 'Rajkumar M.');
    patchIncident({ assignee: name });
  };

  if (loading || !incident) {
    if (!loading && error) {
      return (
        <div className="card empty-state">
          <div className="card-body">
            <h2>{error}</h2>
            <p>The app will not show a different incident as fallback.</p>
            <div className="page-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/incidents')}>Back to incidents</button>
              <Link className="btn btn-primary" to={`/login?next=${encodeURIComponent(location.pathname)}`}>Sign in</Link>
            </div>
          </div>
        </div>
      );
    }
    return <div className="dash-loading"><div className="l-spinner" /> Fetching incident record...</div>;
  }

  const createdAt = new Date(incident.created_at || 0).toLocaleString();
  const showAutoBanner = incident.sourceType === 'auto' && incident.source && incident.source !== 'Manual';
  const il = incident.impactLevel || 'MEDIUM';
  const ul = incident.urgencyLevel || 'MEDIUM';
  const impactLevelLabel = IU.find(([value]) => value === il)?.[1] || il;
  const urgencyLevelLabel = IU.find(([value]) => value === ul)?.[1] || ul;

  return (
    <div className="incident-detail-page">
      <div className="detail-layout">
        <main className="detail-main">
          <header className="incident-record-header">
            <div>
              <div className="record-badges">
                <span className={`priority-badge ${priorityClass(incident.priority)}`}>{incident.priorityLabel}</span>
                <span className={`status-badge ${statusClass(incident.status)}`}>{incident.statusLabel}</span>
                {incident.majorIncident && <span className="major-badge-header">Major incident</span>}
              </div>
              <h1>{incident.number}</h1>
              <p>{incident.title}</p>
              <div className="level-strip">
                <span><strong>Priority level</strong>{incident.priorityLabel}</span>
                <span><strong>Impact level</strong>{impactLevelLabel}</span>
                <span><strong>Urgency level</strong>{urgencyLevelLabel}</span>
              </div>
            </div>
            <div className="page-actions">
              <button type="button" className="btn btn-secondary btn-icon" title="Print">⎙</button>
              <button type="button" className="btn btn-secondary btn-icon" title="Clone">⧉</button>
              <button type="button" className="btn btn-secondary" onClick={reassignToMe} disabled={saving}>＋ Assign to me</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => patchIncident({ majorIncident: !incident.majorIncident })}
                disabled={saving}
              >
                {incident.majorIncident ? 'Clear major' : 'Mark major'}
              </button>
              <button type="button" className="btn btn-success" onClick={resolveIncident} disabled={saving || incident.status === 'RESOLVED'}>✓ Resolve</button>
            </div>
          </header>

          {showAutoBanner && (
            <section className="auto-created-banner">
              <div className="banner-icon">↻</div>
              <div className="banner-content">
                <h4>Auto-created from {incident.source}</h4>
                <p>Correlation to monitoring / automation — CI: {incident.ci}</p>
              </div>
              <div className="banner-metrics">
                {(incident.metrics || []).map((metric) => (
                  <span key={metric.label}><strong>{metric.value}</strong><small>{metric.label}</small></span>
                ))}
              </div>
            </section>
          )}

          <section className="card">
            <div className="card-header"><span className="card-title">ⓘ Incident Details (agent workspace)</span></div>
            <div className="card-body details-grid sn-agent-fields">
              <Detail label="Number" value={incident.number} />
              <div className="detail-item detail-item--control">
                <span>State</span>
                <select
                  className="sn-select"
                  value={incident.status}
                  onChange={(e) => {
                    const st = e.target.value;
                    const label = STATE_OPTIONS.find(([v]) => v === st)?.[1] || st;
                    patchIncident({ status: st, statusLabel: label });
                  }}
                  disabled={saving}
                >
                  {STATE_OPTIONS.map(([v, lbl]) => (
                    <option key={v} value={v}>{lbl}</option>
                  ))}
                </select>
              </div>
              <Detail label="Priority" value={incident.priorityLabel} />
              <div className="detail-item detail-item--control">
                <span>Impact Level</span>
                <select
                  className="sn-select"
                  value={il}
                  onChange={(e) => patchIncident({ impactLevel: e.target.value, urgencyLevel: ul })}
                  disabled={saving}
                >
                  {IU.map(([v, lbl]) => (
                    <option key={v} value={v}>{lbl}</option>
                  ))}
                </select>
              </div>
              <div className="detail-item detail-item--control">
                <span>Urgency Level</span>
                <select
                  className="sn-select"
                  value={ul}
                  onChange={(e) => patchIncident({ impactLevel: il, urgencyLevel: e.target.value })}
                  disabled={saving}
                >
                  {IU.map(([v, lbl]) => (
                    <option key={v} value={v}>{lbl}</option>
                  ))}
                </select>
              </div>
              <Detail label="Caller" value={incident.reporter || '—'} />
              <Detail label="Business impact (notes)" value={incident.impact} />
              <Detail label="Assigned To" value={incident.assignee} link />
              <Detail label="Assignment Group" value={incident.assignmentGroup} />
              <Detail label="Category" value={incident.category} />
              <Detail label="Environment" value={incident.environment} />
              <Detail label="Configuration Item" value={incident.ci} link />
              <Detail label="Created" value={createdAt} />
              <div className="detail-item detail-item--control detail-item--wide">
                <span>Problem ID</span>
                <div className="inline-links">
                  <input className="sn-select" value={prob} onChange={(e) => setProb(e.target.value)} placeholder="PRB…" />
                  <button type="button" className="btn btn-secondary small-btn" onClick={() => patchIncident({ problemId: prob })} disabled={saving}>Save</button>
                  <Link to="/problems">Problems →</Link>
                </div>
              </div>
              <div className="detail-item detail-item--control detail-item--wide">
                <span>Change ID</span>
                <div className="inline-links">
                  <input className="sn-select" value={chg} onChange={(e) => setChg(e.target.value)} placeholder="CHG…" />
                  <button type="button" className="btn btn-secondary small-btn" onClick={() => patchIncident({ changeId: chg })} disabled={saving}>Save</button>
                  <Link to="/changes">Changes →</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header"><span className="card-title">📋 Resolution playbook</span></div>
            <ul className="playbook-list">
              {(incident.playbookTasks || []).map((t) => (
                <li key={t.id}>
                  <label className="playbook-task">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => patchIncident({ togglePlaybookTaskId: t.id })}
                      disabled={saving}
                    />
                    <span>{t.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <div className="card-header">
              <span className="card-title">↗ Grafana Metrics - Live</span>
              <button className="btn btn-secondary small-btn">Open in Grafana ↗</button>
            </div>
            <div className="card-body">
              <div className="metric-visual">
                <div className="metric-bars">
                  {[38, 52, 76, 91, 86, 72, 64, 81, 91].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                </div>
              </div>
              <div className="loki-logs">
                <div className="loki-header"><strong>Live Logs (Loki)</strong><span>Filter: ERROR</span></div>
                {(incident.logs || []).map(([time, level, message]) => (
                  <div className="log-line" key={`${time}-${message}`}>
                    <span>{time}</span>
                    <strong className={level.toLowerCase()}>{level}</strong>
                    <p>{message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header"><span className="card-title">↻ StackStorm Auto-Remediation</span><span className="workflow-running">Workflow Running</span></div>
            <div className="workflow-timeline">
              {(incident.remediation || []).map(([state, title, detail, duration]) => (
                <div className="workflow-step" key={title}>
                  <span className={`step-icon ${state}`}>{state === 'completed' ? '✓' : state === 'running' ? '↻' : '◷'}</span>
                  <span><strong>{title}</strong><small>{detail}</small></span>
                  <em>{duration}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="card-header"><span className="card-title">☰ Notes & Activity</span></div>
            <div className="tabs"><button className="active">Work Notes</button><button>Customer Comments</button><button>Activity Log</button></div>
            <div className="notes-panel">
              {(incident.workNotes || []).map((item) => (
                <article className="note-item" key={item.id}>
                  <span className="note-avatar">{item.initials}</span>
                  <div>
                    <header>
                      <strong>{item.author}</strong>
                      <small>
                        {typeof item.time === 'string' && item.time.includes('T')
                          ? new Date(item.time).toLocaleString()
                          : item.time}
                      </small>
                    </header>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
              <form className="note-form" onSubmit={addNote}>
                <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a work note (saved to server)..." />
                <button className="btn btn-primary" type="submit" disabled={saving}>Post</button>
              </form>
            </div>
          </section>
        </main>

        <aside className="right-sidebar">
          <section className="sidebar-section">
            <h3>SLA Status</h3>
            <div className="sla-widget">
              <strong>{incident.slaRemaining}</strong>
              <span>Time to Resolution Remaining</span>
              <div><i style={{ width: `${incident.slaPercent}%` }} /></div>
            </div>
          </section>
          <section className="sidebar-section">
            <h3>Response Metrics</h3>
            <div className="response-grid"><span><strong>45s</strong><small>First Response</small></span><span><strong>{incident.age}</strong><small>Age</small></span></div>
          </section>
          <section className="sidebar-section">
            <h3>Quick Actions</h3>
            {['SSH to Server', 'Restart PgBouncer', 'Terminate Idle Connections', 'Open Runbook'].map((action) => <button className="quick-action" key={action}>{action}<small>{incident.ci}</small></button>)}
          </section>
          <button className="btn btn-secondary" onClick={() => navigate('/incidents')}>← Back to Incidents</button>
          <Link className="btn btn-primary" to="/incidents/new">＋ New Incident</Link>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value, link }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong className={link ? 'link' : ''}>{value}</strong>
    </div>
  );
}
