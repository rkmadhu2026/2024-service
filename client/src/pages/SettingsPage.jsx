import { useState } from 'react';
import './Dashboard.css';
import './Workspace.css';

export default function SettingsPage() {
  const [slaWarn, setSlaWarn] = useState(() => localStorage.getItem('settings_sla_warn') !== '0');
  const [majorNotify, setMajorNotify] = useState(() => localStorage.getItem('settings_major_notify') !== '0');
  const [aiAssist, setAiAssist] = useState(() => localStorage.getItem('settings_ai') !== '0');

  const persist = (key, val) => localStorage.setItem(key, val ? '1' : '0');

  return (
    <div className="ops-page workspace-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Admin settings</h1>
          <p>Workspace preferences (stored in this browser for demo purposes).</p>
        </div>
      </header>

      <div className="settings-grid">
        <div className="settings-row">
          <span>SLA warning banners</span>
          <input type="checkbox" checked={slaWarn} onChange={(e) => { setSlaWarn(e.target.checked); persist('settings_sla_warn', e.target.checked); }} />
        </div>
        <div className="settings-row">
          <span>Major incident notifications</span>
          <input type="checkbox" checked={majorNotify} onChange={(e) => { setMajorNotify(e.target.checked); persist('settings_major_notify', e.target.checked); }} />
        </div>
        <div className="settings-row">
          <span>AI routing suggestions (UI)</span>
          <input type="checkbox" checked={aiAssist} onChange={(e) => { setAiAssist(e.target.checked); persist('settings_ai', e.target.checked); }} />
        </div>
      </div>
    </div>
  );
}
