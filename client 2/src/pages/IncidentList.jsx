import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IncidentList.css';

const IncidentList = () => {
    const navigate = useNavigate();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetch('http://localhost:5001/api/incidents')
            .then(res => res.json())
            .then(data => {
                setIncidents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Fallback dummy data
                setIncidents([
                    { id: 'INC-00192', title: 'Core database latency spike', category: 'Database', priority: 'CRITICAL', status: 'OPEN', assignee: 'Raj Madhu', ci: 'db-prod-01', created_at: new Date().toISOString() },
                    { id: 'INC-00191', title: 'Payment gateway API timeouts', category: 'Integration', priority: 'HIGH', status: 'IN_PROGRESS', assignee: 'Sarah Chen', ci: 'api-gateway-02', created_at: new Date(Date.now() - 3600000).toISOString() },
                    { id: 'INC-00190', title: 'K8s node memory exhaustion', category: 'Infrastructure', priority: 'HIGH', status: 'OPEN', assignee: 'Alex Rivera', ci: 'node-pool-alpha', created_at: new Date(Date.now() - 7200000).toISOString() },
                    { id: 'INC-00189', title: 'Background job processing delayed', category: 'Application', priority: 'MEDIUM', status: 'RESOLVED', assignee: 'Raj Madhu', ci: 'worker-node-05', created_at: new Date(Date.now() - 86400000).toISOString() }
                ]);
                setLoading(false);
            });
    }, []);

    const filteredIncidents = incidents.filter(inc => {
        if (filter === 'ALL') return true;
        return inc.status === filter;
    });

    if (loading) {
        return (
            <div className="dash-loading animate-fade-in">
                <div className="l-spinner" />
                <span>Synchronizing tickets...</span>
            </div>
        );
    }

    return (
        <div className="incident-page animate-fade-up">
            <header className="page-header">
                <div className="page-title-area">
                    <h1 className="page-title">Incident Management</h1>
                    <p className="page-subtitle">Real-time tracking of infrastructure and service interruptions.</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-outline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Export
                    </button>
                    <button className="btn btn-gold">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        New Incident
                    </button>
                </div>
            </header>

            <div className="divider-gold" />

            <div className="toolbar glass-dark">
                <div className="toolbar-left">
                    <div className="view-tabs">
                        {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(f => (
                            <button 
                                key={f}
                                className={`view-tab ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="toolbar-right">
                    <div className="search-bar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input type="text" placeholder="Search incidents..." className="ghost-input" />
                    </div>
                </div>
            </div>

            <div className="incidents-container glass-dark">
                <table className="inc-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Incident Title</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Assignee</th>
                            <th>CI / Asset</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.map((inc, i) => (
                            <tr 
                                key={inc.id} 
                                style={{ '--index': i, cursor: 'pointer' }} 
                                className="animate-fade-in"
                                onClick={() => navigate(`/incidents/${inc.id}`)}
                            >
                                <td className="td-id">{inc.id}</td>
                                <td className="td-title">
                                    <div className="inc-title-bold">{inc.title}</div>
                                    <div className="inc-category">{inc.category}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-${getPriorityClass(inc.priority)}`}>
                                        {inc.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-pill ${inc.status.toLowerCase()}`}>
                                        {inc.status}
                                    </span>
                                </td>
                                <td className="td-user">
                                    <div className="user-mini-avatar">{(inc.assignee[0] || 'U')}</div>
                                    {inc.assignee}
                                </td>
                                <td><code className="ci-code">{inc.ci}</code></td>
                                <td className="td-time">{new Date(inc.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const getPriorityClass = (p) => {
    switch(p) {
        case 'CRITICAL': return 'danger';
        case 'HIGH': return 'warning';
        case 'MEDIUM': return 'info';
        default: return 'gold';
    }
}

export default IncidentList;
