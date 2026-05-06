import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPatch } from '../services/api';
import './Dashboard.css';
import './Changes.css';

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
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function ChangeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acting, setActing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      setLoading(true);
      apiGet(`/changes/${encodeURIComponent(id)}`)
        .then((res) => {
          if (res.status === 404) throw new Error('notfound');
          return res.ok ? res.json() : Promise.reject();
        })
        .then(setRow)
        .catch(() => setError('Change not found or could not be loaded.'))
        .finally(() => setLoading(false));
    }, 0);
    return () => clearTimeout(timer);
  }, [id]);

  const patchStatus = async (status) => {
    if (!id) return;
    setActing(true);
    try {
      const res = await apiPatch(`/changes/${encodeURIComponent(id)}`, { status });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Update failed');
        return;
      }
      setRow(data);
      setError('');
    } catch {
      setError('Network error');
    } finally {
      setActing(false);
    }
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="l-spinner" /> Loading change…
      </div>
    );
  }

  if (error || !row) {
    return (
      <div className="change-detail-page ops-page">
        <p className="change-detail-error">{error || 'Not found'}</p>
        <Link to="/changes" className="btn btn-outline">
          Back to changes
        </Link>
      </div>
    );
  }

  const canApprove = row.status === 'PENDING' || row.status === 'SCHEDULED';
  const canStart = row.status === 'APPROVED';
  const canComplete = row.status === 'IN_PROGRESS';

  return (
    <div className="change-detail-page ops-page">
      <header className="page-header">
        <div className="page-title">
          <p className="change-back">
            <Link to="/changes">← Change register</Link>
          </p>
          <h1>{row.title}</h1>
          <p>
            <span className="mono">{row.id}</span>
            <span className="change-detail-meta-sep">·</span>
            <span>{row.changeType || 'Normal'} change</span>
            <span className="change-detail-meta-sep">·</span>
            <span>{row.environment || '—'}</span>
          </p>
        </div>
        <div className="page-actions change-detail-actions">
          {canApprove && (
            <>
              <button type="button" className="btn btn-outline" disabled={acting} onClick={() => patchStatus('REJECTED')}>
                Reject
              </button>
              <button type="button" className="btn btn-gold" disabled={acting} onClick={() => patchStatus('APPROVED')}>
                Approve
              </button>
            </>
          )}
          {canStart && (
            <button type="button" className="btn btn-gold" disabled={acting} onClick={() => patchStatus('IN_PROGRESS')}>
              Mark in progress
            </button>
          )}
          {canComplete && (
            <button type="button" className="btn btn-gold" disabled={acting} onClick={() => patchStatus('COMPLETED')}>
              Mark completed
            </button>
          )}
        </div>
      </header>

      <div className="change-detail-grid">
        <div className="card change-detail-main">
          <div className="card-header">
            <span className="card-title">Summary</span>
          </div>
          <div className="card-body change-detail-summary">
            <div>
              <small>Risk</small>
              <span className={`badge ${riskBadgeClass(row.risk)}`}>{row.risk}</span>
            </div>
            <div>
              <small>Status</small>
              <span className={`status-pill ${statusPillClass(row.status)}`}>
                {String(row.status || '').replace(/_/g, ' ')}
              </span>
            </div>
            <div>
              <small>Requester</small>
              <strong>{row.requester}</strong>
            </div>
            <div>
              <small>Assignee</small>
              <strong>{row.assignee || '—'}</strong>
            </div>
            <div>
              <small>CAB</small>
              <strong>{row.cabRequired ? 'Required' : 'Not required'}</strong>
            </div>
            <div>
              <small>Scheduled</small>
              <strong>{formatSchedule(row.scheduled)}</strong>
            </div>
          </div>
          <div className="card-body change-detail-desc">
            <h3 className="change-section-title">Description</h3>
            <p>{row.description || 'No description provided.'}</p>
          </div>
        </div>

        <div className="card change-detail-side">
          <div className="card-header">
            <span className="card-title">CAB & lifecycle</span>
          </div>
          <div className="card-body">
            <ul className="cab-timeline">
              {(row.cabTimeline || []).map((step, i) => (
                <li key={i} className={`cab-step cab-step--${step.state || 'pending'}`}>
                  <div className="cab-step__dot" />
                  <div>
                    <strong>{step.step}</strong>
                    <div className="cab-step__meta">
                      {step.actor}
                      {step.time ? ` · ${formatSchedule(step.time)}` : ''}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="change-detail-footer">
        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
