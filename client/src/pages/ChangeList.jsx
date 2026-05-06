import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from '../services/api';
import './Dashboard.css';
import './Changes.css';
import './IncidentList.css';

const fallbackChanges = [
  { id: 'CHG-0012', title: 'Kubernetes cluster upgrade (v1.31)', risk: 'HIGH', status: 'PENDING', changeType: 'Normal', requester: 'Rajkumar Madhu', environment: 'Production', scheduled: '2026-05-18T02:00:00.000Z', description: '' },
];

function riskBadgeClass(risk) {
  const r = String(risk || '').toUpperCase();
  if (r === 'HIGH') return 'badge-danger';
  if (r === 'MEDIUM') return 'badge-warning';
  return 'badge-gold';
}

function statusPillClass(status) {
  return String(status || '').toLowerCase().replace(/_/g, '-');
}

function formatSchedule(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function ChangeList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({
    title: '',
    risk: 'MEDIUM',
    changeType: 'Normal',
    environment: 'Production',
    scheduled: '',
    description: '',
    cabRequired: true,
  });

  const load = () => {
    setLoading(true);
    apiGet('/changes')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setRows)
      .catch(() => setRows(fallbackChanges))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const pending = rows.filter((c) => c.status === 'PENDING' || c.status === 'SCHEDULED').length;
    const inFlight = rows.filter((c) => c.status === 'APPROVED' || c.status === 'IN_PROGRESS').length;
    const done = rows.filter((c) => c.status === 'COMPLETED').length;
    const high = rows.filter((c) => c.risk === 'HIGH' && c.status !== 'COMPLETED' && c.status !== 'REJECTED').length;
    return { pending, inFlight, done, high, total: rows.length };
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((c) => {
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
      if (riskFilter !== 'ALL' && c.risk !== riskFilter) return false;
      if (!q) return true;
      const blob = `${c.id} ${c.title} ${c.requester} ${c.environment} ${c.changeType}`.toLowerCase();
      return blob.includes(q);
    });
  }, [rows, search, statusFilter, riskFilter]);

  const openNewRfc = () => {
    setFormError('');
    const t = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const local = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({
      title: '',
      risk: 'MEDIUM',
      changeType: 'Normal',
      environment: 'Production',
      scheduled: local,
      description: '',
      cabRequired: true,
    });
    setModalOpen(true);
  };

  const submitRfc = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const res = await apiPost('/changes', {
        title: form.title,
        risk: form.risk,
        changeType: form.changeType,
        environment: form.environment,
        scheduled: form.scheduled ? new Date(form.scheduled).toISOString() : undefined,
        description: form.description,
        cabRequired: form.cabRequired,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.message || 'Could not create change');
        return;
      }
      setModalOpen(false);
      load();
    } catch {
      setFormError('Network error — try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="l-spinner" /> Loading change calendar…
      </div>
    );
  }

  return (
    <div className="change-page ops-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Change Management</h1>
          <p>RFCs, CAB approval, and scheduled implementations — aligned with ITIL change enablement.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-gold" onClick={openNewRfc}>
            New RFC
          </button>
        </div>
      </header>

      <div className="divider-gold" />

      <div className="stats-row change-stats">
        <div className="stat-mini critical">
          <div className="stat-mini-icon">⏳</div>
          <div>
            <strong>{stats.pending}</strong>
            <small>Awaiting approval</small>
          </div>
        </div>
        <div className="stat-mini high">
          <div className="stat-mini-icon">▶</div>
          <div>
            <strong>{stats.inFlight}</strong>
            <small>Approved / in progress</small>
          </div>
        </div>
        <div className="stat-mini resolved">
          <div className="stat-mini-icon">✓</div>
          <div>
            <strong>{stats.done}</strong>
            <small>Completed</small>
          </div>
        </div>
        <div className="stat-mini medium">
          <div className="stat-mini-icon">⚠</div>
          <div>
            <strong>{stats.high}</strong>
            <small>Open high-risk</small>
          </div>
        </div>
        <div className="stat-mini low">
          <div className="stat-mini-icon">#</div>
          <div>
            <strong>{stats.total}</strong>
            <small>Total records</small>
          </div>
        </div>
      </div>

      <div className="incident-toolbar change-toolbar">
        <div className="toolbar-left">
          <input
            type="search"
            className="change-search"
            placeholder="Search ID, title, requester, environment…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search changes"
          />
        </div>
        <div className="toolbar-right">
          <select
            className="filter-btn"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            className="filter-btn"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            aria-label="Filter by risk"
          >
            <option value="ALL">All risks</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      <div className="glass-dark list-card change-list-card">
        <div className="list-card__header">
          <h3 className="list-card__title">Change register</h3>
          <span className="change-count">{filtered.length} shown</span>
        </div>
        <div className="incidents-container change-table-wrap">
          <table className="inc-table change-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Requester</th>
                <th>Environment</th>
                <th>Scheduled</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="change-empty">
                    No changes match your filters. Clear search or choose &quot;All statuses&quot;.
                  </td>
                </tr>
              ) : (
                filtered.map((chg) => (
                  <tr key={chg.id}>
                    <td className="td-id">
                      <Link to={`/changes/${encodeURIComponent(chg.id)}`} className="change-id-link">
                        {chg.id}
                      </Link>
                    </td>
                    <td className="td-title">{chg.title}</td>
                    <td>
                      <span className="change-type-pill">{chg.changeType || 'Normal'}</span>
                    </td>
                    <td>
                      <span className={`badge ${riskBadgeClass(chg.risk)}`}>{chg.risk}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${statusPillClass(chg.status)}`}>
                        {String(chg.status || '').replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="td-user">{chg.requester}</td>
                    <td className="td-time">{chg.environment || '—'}</td>
                    <td className="td-time">{formatSchedule(chg.scheduled)}</td>
                    <td className="td-actions">
                      <Link to={`/changes/${encodeURIComponent(chg.id)}`} className="btn btn-outline btn-sm">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="change-modal-overlay" role="presentation" onClick={() => !submitting && setModalOpen(false)}>
          <div
            className="change-modal"
            role="dialog"
            aria-labelledby="rfc-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="change-modal__head">
              <h2 id="rfc-title">New request for change (RFC)</h2>
              <button type="button" className="change-modal__close" onClick={() => setModalOpen(false)} aria-label="Close">
                ×
              </button>
            </div>
            <form className="change-modal__form" onSubmit={submitRfc}>
              {formError && <div className="change-modal__error">{formError}</div>}
              <label className="change-field">
                <span>Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Short description of the change"
                />
              </label>
              <div className="change-field-row">
                <label className="change-field">
                  <span>Risk</span>
                  <select
                    value={form.risk}
                    onChange={(e) => setForm((f) => ({ ...f, risk: e.target.value }))}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </label>
                <label className="change-field">
                  <span>Change type</span>
                  <select
                    value={form.changeType}
                    onChange={(e) => setForm((f) => ({ ...f, changeType: e.target.value }))}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Standard">Standard</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </label>
                <label className="change-field">
                  <span>Environment</span>
                  <select
                    value={form.environment}
                    onChange={(e) => setForm((f) => ({ ...f, environment: e.target.value }))}
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Edge">Edge</option>
                    <option value="Development">Development</option>
                  </select>
                </label>
              </div>
              <label className="change-field">
                <span>Planned start</span>
                <input
                  type="datetime-local"
                  value={form.scheduled}
                  onChange={(e) => setForm((f) => ({ ...f, scheduled: e.target.value }))}
                />
              </label>
              <label className="change-field">
                <span>Description / implementation plan</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Scope, back-out plan, validation steps…"
                />
              </label>
              <label className="change-check">
                <input
                  type="checkbox"
                  checked={form.cabRequired}
                  onChange={(e) => setForm((f) => ({ ...f, cabRequired: e.target.checked }))}
                />
                CAB review required
              </label>
              <div className="change-modal__actions">
                <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit RFC'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
