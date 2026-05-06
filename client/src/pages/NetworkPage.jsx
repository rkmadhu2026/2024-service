import './Dashboard.css';
import './Workspace.css';

export default function NetworkPage() {
  return (
    <div className="ops-page workspace-page">
      <header className="page-header">
        <div className="page-title">
          <h1>Network Topology</h1>
          <p>Logical view of core aggregation, trading DMZ, and monitoring path (illustrative).</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-secondary">Refresh topology</button>
        </div>
      </header>

      <div className="network-canvas">
        <div className="network-node core">
          <h3>Core · sw-core-01.fs-dx-le</h3>
          <p className="node-meta">Role: aggregation · Latency watch</p>
        </div>
        <div className="network-edge">10G ↓</div>
        <div className="network-node">
          <h3>Trading DMZ</h3>
          <p className="node-meta">trading-engine-01.neo-prod-le</p>
        </div>
        <div className="network-node">
          <h3>Database tier</h3>
          <p className="node-meta">prod-db-01.fs-mum-indmoney-prod-le</p>
        </div>
        <div className="network-node">
          <h3>Edge / CDN</h3>
          <p className="node-meta">trading.finspot.com</p>
        </div>
        <div className="network-node">
          <h3>Observability</h3>
          <p className="node-meta">Prometheus · Grafana · Loki</p>
        </div>
      </div>
    </div>
  );
}
