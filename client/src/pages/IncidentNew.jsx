import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import { calcPriorityFromLevels } from '../utils/incidentPriority';
import './Dashboard.css';
import './IncidentNew.css';

const cis = [
  ['prod-db-01.fs-mum-indmoney-prod-le', 'PostgreSQL Database'],
  ['trading-engine-01.neo-prod-le', 'Application Server'],
  ['sw-core-01.fs-dx-le', 'Network Switch'],
];

export default function IncidentNew() {
  const navigate = useNavigate();
  const [impactLevel, setImpactLevel] = useState('MEDIUM');
  const [urgencyLevel, setUrgencyLevel] = useState('MEDIUM');
  const [caller, setCaller] = useState('');
  const [majorIncident, setMajorIncident] = useState(false);
  const [problemId, setProblemId] = useState('');
  const [changeId, setChangeId] = useState('');
  const [ciQuery, setCiQuery] = useState('');
  const [form, setForm] = useState({
    title: '',
    category: 'Database',
    subcategory: 'PostgreSQL',
    item: 'Connection Pool',
    assignmentGroup: 'Infrastructure Ops',
    assignee: 'Auto (Smart Routing)',
    description: '',
  });

  const computed = useMemo(() => calcPriorityFromLevels(impactLevel, urgencyLevel), [impactLevel, urgencyLevel]);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    let reporter = caller.trim();
    if (!reporter) {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        reporter = u.name || u.email || 'Self-service';
      } catch {
        reporter = 'Self-service';
      }
    }

    apiPost('/incidents', {
      title: form.title,
      shortDescription: form.title,
      description: form.description,
      impactLevel,
      urgencyLevel,
      reporter,
      majorIncident,
      problemId: problemId.trim(),
      changeId: changeId.trim(),
      category: `${form.category} → ${form.subcategory} → ${form.item}`,
      assignmentGroup: form.assignmentGroup,
      assignee: form.assignee === 'Auto (Smart Routing)' ? 'Unassigned' : form.assignee,
      ci: ciQuery,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((created) => navigate(`/incidents/${created.number || created.id}`))
      .catch(() => navigate('/incidents'));
  };

  const matches = cis.filter(([name]) => ciQuery && name.toLowerCase().includes(ciQuery.toLowerCase()));

  return (
    <div className="incident-new-page">
      <div className="new-layout">
        <main className="form-panel">
          <header className="page-header">
            <div className="page-title">
              <h1>Create New Incident</h1>
              <p>Log caller, impact, and urgency — priority is calculated automatically (ServiceNow-style).</p>
            </div>
          </header>

          <div className="form-tabs">
            <button className="active">Quick Create</button>
            <button>Detailed Form</button>
            <button>From Template</button>
          </div>

          <form className="card incident-form" onSubmit={submit}>
            <div className="card-header"><span className="card-title">✎ Incident Information</span></div>
            <div className="card-body">
              <label className="form-group">
                <span>Short Description <strong>*</strong></span>
                <input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Brief description of the incident" required />
              </label>

              <label className="form-group">
                <span>Caller</span>
                <input value={caller} onChange={(event) => setCaller(event.target.value)} placeholder="Who reported it? (defaults to you if empty)" />
              </label>

              <label className="form-group form-checkbox">
                <input type="checkbox" checked={majorIncident} onChange={(e) => setMajorIncident(e.target.checked)} />
                <span>Major incident (executive / war-room visibility)</span>
              </label>

              <div className="form-row-2">
                <label className="form-group">
                  <span>Problem ID (optional)</span>
                  <input value={problemId} onChange={(e) => setProblemId(e.target.value)} placeholder="PRB001002" />
                </label>
                <label className="form-group">
                  <span>Change ID (optional)</span>
                  <input value={changeId} onChange={(e) => setChangeId(e.target.value)} placeholder="CHG-0012" />
                </label>
              </div>

              <div className="form-row-2 im-iu-row">
                <label className="form-group">
                  <span>Impact <strong>*</strong></span>
                  <select value={impactLevel} onChange={(event) => setImpactLevel(event.target.value)}>
                    <option value="HIGH">1 - High</option>
                    <option value="MEDIUM">2 - Medium</option>
                    <option value="LOW">3 - Low</option>
                  </select>
                </label>
                <label className="form-group">
                  <span>Urgency <strong>*</strong></span>
                  <select value={urgencyLevel} onChange={(event) => setUrgencyLevel(event.target.value)}>
                    <option value="HIGH">1 - High</option>
                    <option value="MEDIUM">2 - Medium</option>
                    <option value="LOW">3 - Low</option>
                  </select>
                </label>
              </div>

              <div className="form-group im-calculated-priority">
                <span>Calculated priority</span>
                <div className={`priority-readout priority-readout--${computed.priority.toLowerCase()}`}>
                  <strong>{computed.priorityLabel}</strong>
                  <small>From impact × urgency matrix</small>
                </div>
              </div>

              <label className="form-group ci-field">
                <span>Configuration Item</span>
                <input value={ciQuery} onChange={(event) => setCiQuery(event.target.value)} placeholder="Search servers, devices, applications..." />
                {matches.length > 0 && (
                  <div className="ci-results">
                    {matches.map(([name, type]) => (
                      <button type="button" key={name} onClick={() => setCiQuery(name)}>
                        <strong>{name}</strong>
                        <small>{type}</small>
                      </button>
                    ))}
                  </div>
                )}
              </label>

              <div className="category-path">
                <label><span>Category</span><select value={form.category} onChange={(event) => update('category', event.target.value)}><option>Database</option><option>Network</option><option>Hardware</option><option>Security</option></select></label>
                <label><span>Subcategory</span><select value={form.subcategory} onChange={(event) => update('subcategory', event.target.value)}><option>PostgreSQL</option><option>Switch</option><option>Server</option><option>Certificate</option></select></label>
                <label><span>Item</span><select value={form.item} onChange={(event) => update('item', event.target.value)}><option>Connection Pool</option><option>Performance</option><option>Replication</option><option>Expiry</option></select></label>
              </div>

              <div className="form-row-2">
                <label className="form-group"><span>Assignment Group</span><select value={form.assignmentGroup} onChange={(event) => update('assignmentGroup', event.target.value)}><option>Infrastructure Ops</option><option>Network Ops</option><option>Database Administration</option><option>Security Team</option></select></label>
                <label className="form-group"><span>Assigned To</span><select value={form.assignee} onChange={(event) => update('assignee', event.target.value)}><option>Auto (Smart Routing)</option><option>Rajkumar M.</option><option>Siva K.</option><option>Hoysala B.</option></select></label>
              </div>

              <label className="form-group">
                <span>Description</span>
                <textarea value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Detailed description of the incident..." />
              </label>

              <div className="file-upload">
                <strong>⇧</strong>
                <p>Drag files here or <span>click to browse</span></p>
                <small>Screenshots, logs, config files (max 25MB)</small>
              </div>
            </div>
            <footer className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/incidents')}>Cancel</button>
              <button type="button" className="btn btn-secondary">Save as Draft</button>
              <button type="submit" className="btn btn-primary">Submit Incident</button>
            </footer>
          </form>
        </main>

        <aside className="new-sidebar">
          <SideCard title="AI Suggestions">
            <div className="ai-box">
              <strong>Based on incident context</strong>
              <p>Assign to Infrastructure Ops</p>
              <p>Related runbook: CPU_High_Remediation</p>
              <p>Similar: INC0012456, INC0013789</p>
            </div>
          </SideCard>
          <SideCard title="Templates">
            {['Database Issue', 'Server Alert', 'Network Issue', 'Security Incident'].map((item) => <button className="template-card" key={item}>{item}<small>Apply template</small></button>)}
          </SideCard>
          <SideCard title="Impact & urgency">
            <p className="guidelines">Same idea as ServiceNow: set how big the effect is (impact) and how soon it matters (urgency). The app derives P1–P4 automatically.</p>
          </SideCard>
        </aside>
      </div>
    </div>
  );
}

function SideCard({ title, children }) {
  return (
    <section className="card">
      <div className="card-header"><span className="card-title">{title}</span></div>
      <div className="card-body">{children}</div>
    </section>
  );
}
