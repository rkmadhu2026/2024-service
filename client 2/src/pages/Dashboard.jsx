import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stats
        fetch('http://localhost:5001/api/dashboard/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Fallback dummy data if server isn't running
                setStats({
                    incidents: { total: 24, critical: 3, trend: 'up' },
                    changes: { pending: 8, approved: 2, total: 12, trend: 'stable' },
                    services: { uptime: '99.92%', up: 142, down: 1, maintenance: 3 }
                });
                setLoading(false);
            });
    }, []);

    if (loading || !stats) {
        return (
            <div className="dash-loading animate-fade-in">
                <div className="l-spinner" />
                <span>Loading insights...</span>
            </div>
        );
    }

    return (
        <div className="dash-overview animate-fade-up">
            {/* Header section */}
            <header className="dash-header">
                <div>
                    <h1 className="dash-title">Operations Intelligence</h1>
                    <p className="dash-subtitle">Enterprise infrastructure live monitoring & insights.</p>
                </div>
                <div className="dash-header-actions">
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
                        Filter View
                    </button>
                    <button className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                        New Ticket
                    </button>
                </div>
            </header>

            <div className="divider-gold" style={{ marginBottom: '32px' }} />

            {/* Top Stats Grid */}
            <section className="stats-grid delay-100">
                <div className="stat-card glass-dark">
                    <div className="stat-card__head">
                        <h3 className="stat-card__title">Open Incidents</h3>
                        <span className="badge badge-danger">Critical: {stats.incidents.critical}</span>
                    </div>
                    <div className="stat-card__body">
                        <div className="stat-card__value">{stats.incidents.total}</div>
                        <div className="stat-card__trend color-danger">
                            <span className="trend-arrow">↗</span> +12% vs last week
                        </div>
                    </div>
                    <div className="stat-card__foot">4 require immediate attention</div>
                </div>

                <div className="stat-card glass-dark delay-100">
                    <div className="stat-card__head">
                        <h3 className="stat-card__title">Pending Changes</h3>
                        <span className="badge badge-warning">Review: {stats.changes.pending}</span>
                    </div>
                    <div className="stat-card__body">
                        <div className="stat-card__value">{stats.changes.total}</div>
                        <div className="stat-card__trend color-warning">
                            <span className="trend-arrow">→</span> Stable volume
                        </div>
                    </div>
                    <div className="stat-card__foot">CAB meeting scheduled in 2h</div>
                </div>

                <div className="stat-card glass-dark delay-200">
                    <div className="stat-card__head">
                        <h3 className="stat-card__title">Service Uptime</h3>
                        <span className="badge badge-success">SLA: 99.9%</span>
                    </div>
                    <div className="stat-card__body">
                        <div className="stat-card__value color-gold">{stats.services.uptime}</div>
                        <div className="stat-card__trend color-success">
                            <span className="trend-arrow">↗</span> Normal ops
                        </div>
                    </div>
                    <div className="stat-card__foot">
                        <span style={{color: '#52c07a'}}>{stats.services.up} Up</span> · <span style={{color: '#e05252'}}>{stats.services.down} Down</span> · <span style={{color: '#e0a352'}}>{stats.services.maintenance} Maint</span>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="main-grid delay-300">
                {/* Left Column - Recent Activity */}
                <div className="glass-dark list-card">
                    <div className="list-card__header">
                        <h3 className="list-card__title">Priority Incidents</h3>
                        <button className="btn-ghost" style={{fontSize: '12px'}}>View All</button>
                    </div>
                    <div className="list-card__content">
                        {[
                            { id: 'INC-00192', severity: 'critical', msg: 'Core database latency spike detected in EU region', time: '12 mins ago' },
                            { id: 'INC-00191', severity: 'high', msg: 'Payment gateway API timeouts', time: '45 mins ago' },
                            { id: 'INC-00190', severity: 'high', msg: 'Kubernetes cluster node exhausted memory', time: '2 hours ago' },
                            { id: 'INC-00189', severity: 'medium', msg: 'Background job processing delayed', time: '4 hours ago' }
                        ].map((inc, i) => (
                            <div key={i} className="list-item">
                                <div className={`list-item__indicator indicator-${inc.severity}`} />
                                <div className="list-item__details">
                                    <div className="list-item__id">{inc.id}</div>
                                    <div className="list-item__msg">{inc.msg}</div>
                                </div>
                                <div className="list-item__time">{inc.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Infrastructure Map / Status summary */}
                <div className="glass-dark infra-card">
                    <div className="list-card__header">
                        <h3 className="list-card__title">System Health Pulse</h3>
                    </div>
                    <div className="infra-content">
                        <div className="system-orb">
                            <div className="system-orb__inner pulse-gold" />
                            <div className="system-orb__label">Core Systems</div>
                        </div>
                        <ul className="health-metrics">
                            <li className="health-metric">
                                <span className="hm-label">CPU Average</span>
                                <div className="hm-bar-track"><div className="hm-bar-fill bg-success" style={{width: '35%'}}/></div>
                                <span className="hm-val">35%</span>
                            </li>
                            <li className="health-metric">
                                <span className="hm-label">Memory Usage</span>
                                <div className="hm-bar-track"><div className="hm-bar-fill bg-warning" style={{width: '78%'}}/></div>
                                <span className="hm-val">78%</span>
                            </li>
                            <li className="health-metric">
                                <span className="hm-label">Network Tx/Rx</span>
                                <div className="hm-bar-track"><div className="hm-bar-fill bg-info" style={{width: '42%'}}/></div>
                                <span className="hm-val">1.2GB/s</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
