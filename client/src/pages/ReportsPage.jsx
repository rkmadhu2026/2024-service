import { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import './Dashboard.css';

function toCsv(rows) {
  const headers = ['number', 'title', 'priority', 'status', 'assignee', 'reporter', 'major', 'ci'];
  const lines = [headers.join(',')];
  rows.forEach((r) => {
    lines.push(headers.map((h) => {
      const s = String(r[h] ?? '').replace(/"/g, '""');
      return `"${s}"`;
    }).join(','));
  });
  return lines.join('\n');
}

export default function ReportsPage() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    apiGet('/incidents').then((r) => r.ok && r.json()).then(setIncidents);
  }, []);

  const download = () => {
    const flat = incidents.map((i) => ({
      number: i.number,
      title: i.title,
      priority: i.priorityLabel,
      status: i.statusLabel,
      assignee: i.assignee,
      reporter: i.reporter,
      major: i.majorIncident ? 'yes' : 'no',
      ci: i.ci,
    }));
    const blob = new Blob([toCsv(flat)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidents-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ops-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Reports</h1>
          <p>Export incident register for CAB, audits, or leadership reviews.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-primary" onClick={download}>⇩ Download CSV</button>
        </div>
      </header>

      <section className="card">
        <div className="table-wrap">
          <table className="incidents-table compact">
            <thead>
              <tr>
                <th>Incident</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Major</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.number}>
                  <td><span className="inc-number">{i.number}</span></td>
                  <td>{i.title}</td>
                  <td>{i.priorityLabel}</td>
                  <td>{i.statusLabel}</td>
                  <td>{i.majorIncident ? 'Yes' : '—'}</td>
                  <td>{i.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
