import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './IncidentDetail.css';

const IncidentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Fetch incident details
        fetch(`http://localhost:5001/api/incidents/${id}`)
            .then(res => res.json())
            .then(data => {
                setIncident(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Fallback dummy data for the specific ID
                setIncident({
                    id: id || 'INC-00192',
                    title: 'Core database latency spike detected in EU region',
                    description: 'The production database (db-prod-01) is experiencing intermittent latency spikes reaching up to 2.5s. This is affecting order processing and user profile lookups. Initial investigation suggests a locking issue on the transactions table during heavy writes.',
                    category: 'Database',
                    priority: 'CRITICAL',
                    status: 'IN_PROGRESS',
                    assignee: 'Raj Madhu',
                    ci: 'db-prod-01',
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    updated_at: new Date().toISOString(),
                    comments: [
                        { id: 1, user: 'System monitor', text: 'Alert triggered: Latency > 2000ms', time: '1 day ago' },
                        { id: 2, user: 'Alex Rivera', text: 'Confirmed. Scaling up the read replica to see if it offloads some pressure.', time: '22 hours ago' },
                        { id: 3, user: 'Raj Madhu', text: 'Assigned to self. Analyzing transaction logs now.', time: '20 hours ago' }
                    ]
                });
                setLoading(false);
            });
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        
        const newComment = {
            id: Date.now(),
            user: 'Admin',
            text: comment,
            time: 'Just now'
        };
        
        setIncident(prev => ({
            ...prev,
            comments: [newComment, ...prev.comments]
        }));
        setComment('');
    };

    if (loading) {
        return (
            <div className="dash-loading animate-fade-in">
                <div className="l-spinner" />
                <span>Fetching ticket data...</span>
            </div>
        );
    }

    if (!incident) return <div>Incident not found.</div>;

    return (
        <div className="inc-detail-page animate-fade-up">
            <header className="page-header">
                <div className="page-title-area">
                    <div className="breadcrumb">
                        <span onClick={() => navigate('/incidents')}>Incidents</span>
                        <span className="sep">/</span>
                        <span className="active">{incident.id}</span>
                    </div>
                    <h1 className="page-title">{incident.title}</h1>
                </div>
                <div className="page-actions">
                    <button className="btn btn-outline" onClick={() => navigate('/incidents')}>Back</button>
                    <button className="btn btn-gold">Update Status</button>
                </div>
            </header>

            <div className="divider-gold" />

            <div className="detail-grid">
                {/* Left: Info & Comments */}
                <div className="detail-main">
                    <section className="glass-dark detail-card">
                        <div className="detail-card__head">
                            <h3 className="detail-card__title">Description</h3>
                        </div>
                        <div className="detail-card__body">
                            <p className="description-text">{incident.description}</p>
                        </div>
                    </section>

                    <section className="glass-dark detail-card comments-section">
                        <div className="detail-card__head">
                            <h3 className="detail-card__title">Activity & Discussion</h3>
                        </div>
                        <div className="detail-card__body">
                            <form className="comment-form" onSubmit={handleAddComment}>
                                <textarea 
                                    className="input-field comment-input" 
                                    placeholder="Add a note or update..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button type="submit" className="btn btn-gold btn-sm">Post Comment</button>
                            </form>

                            <div className="comments-list">
                                {incident.comments.map(c => (
                                    <div key={c.id} className="comment-item">
                                        <div className="comment-meta">
                                            <span className="comment-user">{c.user}</span>
                                            <span className="comment-time">{c.time}</span>
                                        </div>
                                        <div className="comment-text">{c.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right: Attributes */}
                <aside className="detail-sidebar">
                    <section className="glass-dark detail-card">
                        <div className="detail-card__head">
                            <h3 className="detail-card__title">Ticket Attributes</h3>
                        </div>
                        <div className="detail-card__body attributes-list">
                            <div className="attr-item">
                                <label>Status</label>
                                <span className={`status-pill ${incident.status.toLowerCase()}`}>{incident.status}</span>
                            </div>
                            <div className="attr-item">
                                <label>Priority</label>
                                <span className={`badge badge-${getPriorityClass(incident.priority)}`}>{incident.priority}</span>
                            </div>
                            <div className="attr-item">
                                <label>Assignee</label>
                                <div className="user-mini-row">
                                    <div className="user-mini-avatar">{(incident.assignee[0] || 'U')}</div>
                                    <span>{incident.assignee}</span>
                                </div>
                            </div>
                            <div className="attr-item">
                                <label>Asset / CI</label>
                                <code className="ci-code">{incident.ci}</code>
                            </div>
                            <div className="attr-item">
                                <label>Category</label>
                                <span>{incident.category}</span>
                            </div>
                            <div className="attr-item">
                                <label>Created</label>
                                <span>{new Date(incident.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </section>

                    <section className="glass-dark detail-card">
                        <div className="detail-card__head">
                            <h3 className="detail-card__title">Automated Insights</h3>
                        </div>
                        <div className="detail-card__body">
                            <div className="ai-insight">
                                <div className="ai-insight__icon">✦</div>
                                <div className="ai-insight__text">
                                    Similar to <strong>INC-00142</strong> which was resolved by database index optimization.
                                </div>
                            </div>
                        </div>
                    </section>
                </aside>
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

export default IncidentDetail;
