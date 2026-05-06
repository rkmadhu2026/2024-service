import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiPost } from '../services/api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Animate background orbs
        const orbs = document.querySelectorAll('.orb');
        let frame;
        let t = 0;
        const animate = () => {
            t += 0.003;
            orbs.forEach((orb, i) => {
                const x = Math.sin(t + i * 2.1) * 30;
                const y = Math.cos(t + i * 1.3) * 20;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
            frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiPost('/auth/login', { email, password });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                const raw = searchParams.get('next');
                const next =
                  raw && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/dashboard';
                navigate(next);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('Unable to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = () => {
        setEmail('admin@finspot.com');
        setPassword('Admin@123');
        setError('');
    };

    return (
        <div className="login-wrapper">
            {/* ── Ambient background ── */}
            <div className="login-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="grid-overlay" />
            </div>

            {/* ── Left: Branding panel ── */}
            <div className="l-brand">
                <div className="l-brand__inner animate-fade-up">
                    {/* Logo */}
                    <div className="l-logo">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="17" stroke="#C9A96E" strokeWidth="1.5"/>
                            <circle cx="18" cy="18" r="8" fill="#C9A96E" fillOpacity="0.15"/>
                            <path d="M12 18 Q18 10 24 18 Q18 26 12 18Z" fill="#C9A96E"/>
                        </svg>
                        <span className="l-logo__text">LinkedEye</span>
                    </div>

                    <div className="l-divider" />

                    <h1 className="l-headline">Enterprise<br/><em>Intelligence</em></h1>
                    <p className="l-sub">
                        The complete ITSM & infrastructure monitoring platform — built for teams that demand precision.
                    </p>

                    {/* Feature list */}
                    <div className="l-features">
                        {[
                            { icon: '◆', label: 'Incident Management', desc: 'Real-time alerts & escalation' },
                            { icon: '◆', label: 'Change Control', desc: 'CAB workflows & audit trails' },
                            { icon: '◆', label: 'Network Topology', desc: 'Live device health monitoring' },
                            { icon: '◆', label: 'Integrations', desc: 'Prometheus, Grafana & more' },
                        ].map((f, i) => (
                            <div key={i} className="l-feature animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                                <span className="l-feature__dot">{f.icon}</span>
                                <div>
                                    <div className="l-feature__name">{f.label}</div>
                                    <div className="l-feature__desc">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="l-stats">
                        {[
                            { value: '99.9%', label: 'SLA Uptime' },
                            { value: '142+', label: 'Services' },
                            { value: '<30s', label: 'Alert MTTR' },
                        ].map((s, i) => (
                            <div key={i} className="l-stat">
                                <div className="l-stat__value">{s.value}</div>
                                <div className="l-stat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Environment badge */}
                <div className="l-env-badge">
                    <span className="l-env-dot" />
                    Production · fs-mum-indmoney-prod-le
                </div>
            </div>

            {/* ── Right: Form panel ── */}
            <div className="l-form-panel">
                <div className="l-form-container animate-fade-up">
                    {/* Form header */}
                    <div className="l-form-header">
                        <p className="l-form-eyebrow">Secure Portal</p>
                        <h2 className="l-form-title">Welcome back</h2>
                        <p className="l-form-sub">Sign in to continue to your workspace</p>
                    </div>

                    {/* Demo hint */}
                    <button className="l-demo-hint" onClick={fillDemo} type="button">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>Double-click to fill demo credentials</span>
                        <span className="l-demo-cred">admin@finspot.com</span>
                    </button>

                    {/* Error */}
                    {error && (
                        <div className="l-error">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="l-form">
                        <div className="l-input-group">
                            <label className="l-label" htmlFor="email">Email Address</label>
                            <div className="l-input-wrap">
                                <svg className="l-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                <input
                                    className="input-field l-input"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="l-input-group">
                            <label className="l-label" htmlFor="password">Password</label>
                            <div className="l-input-wrap">
                                <svg className="l-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <input
                                    className="input-field l-input"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="l-eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword
                                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`l-submit-btn ${loading ? 'l-submit-btn--loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="l-spinner" />
                                    Authenticating…
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="l-footer-note">
                        Protected by enterprise-grade encryption. © 2024 LinkedEye-FinSpot.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
