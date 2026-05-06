import { useState } from 'react';
import './Changes.css';

const ChangeList = () => {
    const [filter, setFilter] = useState('ALL');

    const changes = [
        { id: 'CHG-0012', title: 'Kubernetes Cluster Upgrade (v1.28)', risk: 'HIGH', status: 'PENDING', requester: 'Raj Madhu', scheduled: '2024-05-12' },
        { id: 'CHG-0011', title: 'Database Index Optimization', risk: 'MEDIUM', status: 'APPROVED', requester: 'Alex Rivera', scheduled: '2024-05-10' },
        { id: 'CHG-0010', title: 'Firewall Rule Update - port 443', risk: 'LOW', status: 'COMPLETED', requester: 'Sarah Chen', scheduled: '2024-05-08' },
        { id: 'CHG-0009', title: 'SSL Certificate Renewal', risk: 'LOW', status: 'COMPLETED', requester: 'System', scheduled: '2024-05-05' }
    ];

    return (
        <div className="change-page animate-fade-up">
            <header className="page-header">
                <div className="page-title-area">
                    <h1 className="page-title">Change Management</h1>
                    <p className="page-subtitle">Track and approve infrastructure modifications & deployments.</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-gold">New RFC</button>
                </div>
            </header>

            <div className="divider-gold" />

            <div className="glass-dark list-card">
                <div className="list-card__header">
                    <h3 className="list-card__title">Recent Changes</h3>
                </div>
                <div className="incidents-container">
                    <table className="inc-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Risk</th>
                                <th>Status</th>
                                <th>Requester</th>
                                <th>Scheduled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {changes.map((chg, i) => (
                                <tr key={chg.id} style={{ '--index': i }} className="animate-fade-in">
                                    <td className="td-id">{chg.id}</td>
                                    <td className="td-title">{chg.title}</td>
                                    <td>
                                        <span className={`badge badge-${chg.risk === 'HIGH' ? 'danger' : chg.risk === 'MEDIUM' ? 'warning' : 'info'}`}>
                                            {chg.risk}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${chg.status.toLowerCase()}`}>
                                            {chg.status}
                                        </span>
                                    </td>
                                    <td className="td-user">{chg.requester}</td>
                                    <td className="td-time">{chg.scheduled}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ChangeList;
