const express = require('express');
const router = express.Router();

const now = Date.now();
const DEMO_JWT = 'mock-jwt-token-12345';

const MOCK_INCIDENTS = [
  {
    id: 'INC0015847',
    number: 'INC0015847',
    title: 'Database Connection Pool Exhaustion - Critical Impact on Trading',
    shortDescription: 'Database Connection Pool Exhaustion',
    description: 'Connection pool usage on prod-db-01 is above 91% and trading API requests are timing out. Diagnostics show idle connections from trading-api and three long-running queries.',
    priority: 'CRITICAL',
    priorityLabel: '1 - Critical',
    status: 'IN_PROGRESS',
    statusLabel: 'In Progress',
    impact: 'High - Trading Operations',
    urgency: 'High',
    category: 'Database → PostgreSQL → Connection Pool',
    environment: 'fs-mum-indmoney-prod-le',
    source: 'Prometheus',
    sourceType: 'auto',
    reporter: 'Prometheus',
    assignee: 'Rajkumar M.',
    assigneeInitials: 'RM',
    assignmentGroup: 'Infrastructure Ops',
    ci: 'prod-db-01.fs-mum-indmoney-prod-le',
    age: '12m',
    slaRemaining: '1h 48m',
    slaPercent: 25,
    slaState: 'good',
    created_at: new Date(now - 12 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015846',
    number: 'INC0015846',
    title: 'High CPU Alert - Trading Engine Overloaded',
    shortDescription: 'High CPU Alert - Trading Engine',
    description: 'CPU saturation on trading-engine-01 is causing order routing delays.',
    priority: 'CRITICAL',
    priorityLabel: '1 - Critical',
    status: 'OPEN',
    statusLabel: 'Open',
    impact: 'High - Order Routing',
    urgency: 'High',
    category: 'Application → Trading Engine',
    environment: 'neo-prod-le',
    source: 'Alertmanager',
    sourceType: 'auto',
    reporter: 'Alertmanager',
    assignee: 'Siva K.',
    assigneeInitials: 'SK',
    assignmentGroup: 'Network Ops',
    ci: 'trading-engine-01.neo-prod-le',
    age: '18m',
    slaRemaining: '48m',
    slaPercent: 60,
    slaState: 'warning',
    created_at: new Date(now - 18 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 7 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015845',
    number: 'INC0015845',
    title: 'Network Latency Spike - Core Switch Performance',
    shortDescription: 'Network Latency Spike - Core Switch',
    description: 'Core switch latency increased across FS-DX aggregation links.',
    priority: 'HIGH',
    priorityLabel: '2 - High',
    status: 'IN_PROGRESS',
    statusLabel: 'In Progress',
    impact: 'Medium - Internal Services',
    urgency: 'High',
    category: 'Network → Switch',
    environment: 'fs-dx-le',
    source: 'Manual',
    sourceType: 'manual',
    reporter: 'NOC Analyst',
    assignee: 'Edukondalu P.',
    assigneeInitials: 'EP',
    assignmentGroup: 'Network Ops',
    ci: 'sw-core-01.fs-dx-le',
    age: '45m',
    slaRemaining: '3h 15m',
    slaPercent: 20,
    slaState: 'good',
    created_at: new Date(now - 45 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 16 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015844',
    number: 'INC0015844',
    title: 'Disk Space Warning - Log Volume Approaching Threshold',
    shortDescription: 'Disk Space Warning - Log Volume',
    description: 'Application log volume has crossed 82% usage.',
    priority: 'MEDIUM',
    priorityLabel: '3 - Medium',
    status: 'OPEN',
    statusLabel: 'Open',
    impact: 'Low',
    urgency: 'Medium',
    category: 'Infrastructure → Storage',
    environment: 'lemonn-mum-le',
    source: 'Prometheus',
    sourceType: 'auto',
    reporter: 'Prometheus',
    assignee: 'Devendrareddy P.',
    assigneeInitials: 'DP',
    assignmentGroup: 'Infrastructure',
    ci: 'app-server-03.lemonn-mum-le',
    age: '1h 23m',
    slaRemaining: '6h 37m',
    slaPercent: 15,
    slaState: 'good',
    created_at: new Date(now - 83 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 38 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015843',
    number: 'INC0015843',
    title: 'API Response Time Degradation - Gateway Slowdown',
    shortDescription: 'API Response Time Degradation',
    description: 'Gateway p95 response time exceeded threshold and recovered after cache scaling.',
    priority: 'MEDIUM',
    priorityLabel: '3 - Medium',
    status: 'RESOLVED',
    statusLabel: 'Resolved',
    impact: 'Medium',
    urgency: 'Medium',
    category: 'Application → API Gateway',
    environment: 'pl-prod-le',
    source: 'Manual',
    sourceType: 'manual',
    reporter: 'Rajkumar A.',
    assignee: 'Rajkumar A.',
    assigneeInitials: 'RA',
    assignmentGroup: 'DBA Team',
    ci: 'api-gateway.pl-prod-le',
    age: '2h 15m',
    slaRemaining: 'Met',
    slaPercent: 100,
    slaState: 'good',
    created_at: new Date(now - 135 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015842',
    number: 'INC0015842',
    title: 'SSL Certificate Expiry Warning - 7 Days Remaining',
    shortDescription: 'SSL Certificate Expiry Warning',
    description: 'Certificate for trading.finspot.com expires in 7 days.',
    priority: 'MEDIUM',
    priorityLabel: '3 - Medium',
    status: 'PENDING',
    statusLabel: 'Pending',
    impact: 'Low',
    urgency: 'Medium',
    category: 'Security → Certificate',
    environment: 'edge-prod',
    source: 'StackStorm',
    sourceType: 'auto',
    reporter: 'StackStorm',
    assignee: 'Unassigned',
    assigneeInitials: 'UA',
    assignmentGroup: 'Security Team',
    ci: 'trading.finspot.com',
    age: '3h 45m',
    slaRemaining: '4h 15m',
    slaPercent: 40,
    slaState: 'good',
    created_at: new Date(now - 225 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'INC0015841',
    number: 'INC0015841',
    title: 'Printer Queue Delayed - Finance Floor',
    shortDescription: 'Printer Queue Delayed',
    description: 'Finance floor print queue is delayed for non-critical reports.',
    priority: 'LOW',
    priorityLabel: '4 - Low',
    status: 'IN_PROGRESS',
    statusLabel: 'In Progress',
    impact: 'Low',
    urgency: 'Low',
    category: 'Workplace → Printer',
    environment: 'corp-office',
    source: 'Manual',
    sourceType: 'manual',
    reporter: 'Finance Ops',
    assignee: 'Hoysala B.',
    assigneeInitials: 'HB',
    assignmentGroup: 'Workplace Support',
    ci: 'print-fin-02',
    age: '5h 12m',
    slaRemaining: '18h 48m',
    slaPercent: 25,
    slaState: 'good',
    created_at: new Date(now - 312 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 92 * 60 * 1000).toISOString(),
  },
];

/** ITIL-style priority from Impact × Urgency (ServiceNow-style matrix) */
const PRIORITY_MATRIX = [
  ['CRITICAL', 'HIGH', 'MEDIUM'],
  ['HIGH', 'MEDIUM', 'LOW'],
  ['MEDIUM', 'LOW', 'LOW'],
];
const PRIORITY_LABELS = {
  CRITICAL: '1 - Critical',
  HIGH: '2 - High',
  MEDIUM: '3 - Medium',
  LOW: '4 - Low',
};
const STATUS_LABELS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

function calcPriorityFromLevels(impactLevel, urgencyLevel) {
  const i = { HIGH: 0, MEDIUM: 1, LOW: 2 }[String(impactLevel || 'MEDIUM').toUpperCase()] ?? 1;
  const u = { HIGH: 0, MEDIUM: 1, LOW: 2 }[String(urgencyLevel || 'MEDIUM').toUpperCase()] ?? 1;
  const priority = PRIORITY_MATRIX[i][u];
  return { priority, priorityLabel: PRIORITY_LABELS[priority] };
}

function defaultPlaybook() {
  return [
    { id: 'pb1', label: 'Acknowledge & verify business impact', completed: false },
    { id: 'pb2', label: 'Identify affected CIs and users', completed: false },
    { id: 'pb3', label: 'Implement workaround or permanent fix', completed: false },
    { id: 'pb4', label: 'Validate restoration & close communication', completed: false },
  ].map((t) => ({ ...t }));
}

function normalizeSeedIncident(row) {
  let il = 'MEDIUM';
  let ul = 'MEDIUM';
  if (row.priority === 'CRITICAL') {
    il = 'HIGH';
    ul = 'HIGH';
  } else if (row.priority === 'HIGH') {
    il = 'HIGH';
    ul = 'MEDIUM';
  } else if (row.priority === 'LOW') {
    il = 'LOW';
    ul = 'LOW';
  }
  let playbookTasks = defaultPlaybook();
  if (row.number === 'INC0015847') {
    playbookTasks = defaultPlaybook().map((t, i) => ({ ...t, completed: i < 2 }));
  }
  const isMajorDemo = row.number === 'INC0015847';
  return {
    ...row,
    impactLevel: row.impactLevel || il,
    urgencyLevel: row.urgencyLevel || ul,
    storedWorkNotes: row.storedWorkNotes || [],
    majorIncident: row.majorIncident != null ? row.majorIncident : isMajorDemo,
    playbookTasks: row.playbookTasks || playbookTasks,
    problemId: row.problemId != null ? row.problemId : (isMajorDemo ? 'PRB001002' : ''),
    changeId: row.changeId != null ? row.changeId : '',
  };
}

const MOCK_PROBLEMS = [
  { id: 'PRB001002', title: 'Intermittent PostgreSQL connection pool saturation', state: 'Root Cause Analysis', priority: 'HIGH', owner: 'Rajkumar M.', relatedIncidents: ['INC0015847'], opened: '2026-05-01' },
  { id: 'PRB001001', title: 'WAN latency bursts on aggregation switches', state: 'Known Error', priority: 'MEDIUM', owner: 'Edukondalu P.', relatedIncidents: ['INC0015845'], opened: '2026-04-18' },
  { id: 'PRB001000', title: 'Certificate renewal process gaps', state: 'Resolved', priority: 'LOW', owner: 'Security Team', relatedIncidents: ['INC0015842'], opened: '2026-03-02' },
];

const MOCK_ASSETS = [
  { id: 'CI-DB-PROD-01', name: 'prod-db-01.fs-mum-indmoney-prod-le', ciClass: 'Database', environment: 'Production', owner: 'DBA Team', status: 'Operational' },
  { id: 'CI-APP-NEO-01', name: 'trading-engine-01.neo-prod-le', ciClass: 'Application Server', environment: 'Production', owner: 'App Platform', status: 'Operational' },
  { id: 'CI-NET-CORE-01', name: 'sw-core-01.fs-dx-le', ciClass: 'Network Switch', environment: 'Production', owner: 'Network Ops', status: 'Degraded' },
  { id: 'CI-WEB-EDGE-01', name: 'trading.finspot.com', ciClass: 'Web Endpoint', environment: 'Edge', owner: 'Security Team', status: 'Operational' },
];

const MOCK_INTEGRATIONS = [
  { id: 'int-prom', name: 'Prometheus', type: 'Monitoring', status: 'Connected', direction: 'Inbound alerts', lastSync: '30s ago' },
  { id: 'int-graf', name: 'Grafana', type: 'Dashboards', status: 'Connected', direction: 'Deep links', lastSync: '1m ago' },
  { id: 'int-st2', name: 'StackStorm', type: 'Automation', status: 'Connected', direction: 'Outbound remediation', lastSync: '12s ago' },
  { id: 'int-email', name: 'SMTP / MS365', type: 'Notifications', status: 'Connected', direction: 'Bi-directional', lastSync: '2m ago' },
  { id: 'int-va', name: 'Virtual Agent', type: 'Self-service', status: 'Pilot', direction: 'Portal + chat', lastSync: '—' },
];

const MOCK_CHANGES = [
  {
    id: 'CHG-0012',
    title: 'Kubernetes cluster upgrade (v1.31)',
    risk: 'HIGH',
    status: 'PENDING',
    changeType: 'Normal',
    requester: 'Rajkumar Madhu',
    assignee: 'Platform SRE',
    environment: 'Production',
    cabRequired: true,
    scheduled: '2026-05-18T02:00:00.000Z',
    description: 'Control plane and worker node rollout to v1.31 with PDB-aware drain and rollback hooks.',
    created_at: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'CHG-0011',
    title: 'Database index optimization — trading read replicas',
    risk: 'MEDIUM',
    status: 'APPROVED',
    changeType: 'Standard',
    requester: 'Alex Rivera',
    assignee: 'DBA Team',
    environment: 'Production',
    cabRequired: true,
    scheduled: '2026-05-14T22:30:00.000Z',
    description: 'Add covering indexes for order history queries; validated in staging with query planner review.',
    created_at: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'CHG-0010',
    title: 'Firewall rule update — HTTPS edge (443)',
    risk: 'LOW',
    status: 'COMPLETED',
    changeType: 'Standard',
    requester: 'Sarah Chen',
    assignee: 'Security Ops',
    environment: 'Edge',
    cabRequired: false,
    scheduled: '2026-05-09T18:00:00.000Z',
    description: 'Tighten source allowlists on WAF → origin path; post-change validation with synthetic checks.',
    created_at: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'CHG-0009',
    title: 'SSL / TLS certificate renewal — trading.finspot.com',
    risk: 'LOW',
    status: 'COMPLETED',
    changeType: 'Standard',
    requester: 'System',
    assignee: 'Security Automation',
    environment: 'Edge',
    cabRequired: false,
    scheduled: '2026-05-04T12:00:00.000Z',
    description: 'Automated ACME renewal with 30-day overlap; no listener reload required.',
    created_at: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'CHG-0008',
    title: 'Emergency — rollback trading API canary',
    risk: 'HIGH',
    status: 'IN_PROGRESS',
    changeType: 'Emergency',
    requester: 'NOC',
    assignee: 'App Platform',
    environment: 'Production',
    cabRequired: false,
    scheduled: new Date(now - 20 * 60 * 1000).toISOString(),
    description: 'Revert canary deployment after elevated 5xx rate; traffic shift to stable revision.',
    created_at: new Date(now - 25 * 60 * 1000).toISOString(),
    updated_at: new Date(now - 5 * 60 * 1000).toISOString(),
  },
];

const CHANGE_STATUS = ['PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED', 'SCHEDULED'];

/** Mutable store — POST/PATCH apply until server restart */
let incidents = MOCK_INCIDENTS.map(normalizeSeedIncident);
let changes = MOCK_CHANGES.map((c) => ({ ...c }));

function nextIncidentNumber() {
  const nums = incidents
    .map((i) => {
      const m = String(i.number || i.id || '').match(/(\d+)/);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter((n) => n > 0);
  const max = nums.length ? Math.max(...nums) : 15847;
  const n = max + 1;
  return `INC${String(n).padStart(7, '0')}`;
}

function nextChangeId() {
  const nums = changes
    .map((c) => {
      const m = String(c.id || '').match(/CHG-(\d+)/i);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter((n) => n > 0);
  const max = nums.length ? Math.max(...nums) : 8;
  const n = max + 1;
  return `CHG-${String(n).padStart(4, '0')}`;
}

function changeStats() {
  const openish = (c) => c.status === 'PENDING' || c.status === 'SCHEDULED';
  const inFlight = (c) => c.status === 'APPROVED' || c.status === 'IN_PROGRESS';
  return {
    pending: changes.filter(openish).length,
    approved: changes.filter(inFlight).length,
    completed: changes.filter((c) => c.status === 'COMPLETED').length,
    total: changes.length,
    trend: 'stable',
  };
}

function mergeChangeDetail(row) {
  const cab = [
    { step: 'Submitted', actor: row.requester, time: row.created_at, state: 'done' },
    { step: 'Technical review', actor: row.assignee || 'CAB', time: row.updated_at, state: row.status === 'PENDING' ? 'current' : 'done' },
    { step: 'CAB approval', actor: 'Change Advisory Board', time: null, state: ['APPROVED', 'IN_PROGRESS', 'COMPLETED'].includes(row.status) ? 'done' : 'pending' },
    { step: 'Implementation', actor: row.assignee, time: row.status === 'COMPLETED' ? row.updated_at : null, state: row.status === 'COMPLETED' ? 'done' : row.status === 'IN_PROGRESS' ? 'current' : 'pending' },
    { step: 'Post-implementation review', actor: row.requester, time: row.status === 'COMPLETED' ? row.updated_at : null, state: row.status === 'COMPLETED' ? 'done' : 'pending' },
  ];
  return { ...row, cabTimeline: cab };
}

function initialsFor(name) {
  if (!name || name === 'Unassigned') return 'UA';
  const parts = String(name).split(/[\s.]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return String(name).slice(0, 2).toUpperCase();
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(/\s+/);
  if (type !== 'Bearer' || !token || token !== DEMO_JWT) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

function mergeIncidentDetail(incident) {
  const rich = incident.id === 'INC0015847' || incident.number === 'INC0015847';
  const extras = rich ? detailExtras : defaultDetailExtras;
  const baseNotes = extras.workNotes || [];
  const stored = [...(incident.storedWorkNotes || [])].sort((a, b) => b.id - a.id);
  const workNotes = [...stored, ...baseNotes];
  const { storedWorkNotes: _s, ...rest } = incident;
  return { ...rest, ...extras, workNotes };
}

const detailExtras = {
  metrics: [
    { label: 'Pool Usage', value: '91%' },
    { label: 'Active Conn', value: '248' },
    { label: 'Duration', value: '12m' },
  ],
  logs: [
    ['14:32:15', 'ERROR', 'Connection pool exhausted - unable to acquire connection within 30000ms'],
    ['14:32:10', 'ERROR', 'PostgreSQL connection timeout - pool size: 250/256'],
    ['14:32:05', 'WARN', 'Connection pool usage exceeds 90% threshold - current: 91.4%'],
    ['14:31:58', 'WARN', 'High number of pending connection requests: 45'],
    ['14:31:52', 'INFO', 'Trading API request queue depth: 234'],
  ],
  remediation: [
    ['completed', 'Alert Received', 'Prometheus alert PostgreSQLConnectionPoolExhausted triggered', '2s'],
    ['completed', 'Incident Created', 'Auto-created incident with priority 1-Critical', '2s'],
    ['completed', 'Smart Assignment', 'Assigned to Rajkumar Madhu (On-Call DBA)', '2s'],
    ['running', 'Running Diagnostics', 'Collecting slow queries, connection stats, lock analysis...', '8s...'],
    ['pending', 'Execute Remediation', 'Terminate idle connections, restart connection pooler', 'Pending'],
  ],
  workNotes: [
    { id: 1, author: 'Rajkumar Madhu', initials: 'RM', time: '2 min ago', text: 'Running pg_stat_activity to identify long-running queries. Found 3 queries running for more than 5 minutes.' },
    { id: 2, author: 'StackStorm', initials: 'ST', time: '5 min ago', text: '[AUTO] Diagnostic scan completed. Identified 45 idle connections from trading-api service.' },
    { id: 3, author: 'Prometheus', initials: 'PR', time: '12 min ago', text: '[AUTO] Alert fired: PostgreSQLConnectionPoolExhausted. Current usage: 91.4%. Threshold: 85%.' },
  ],
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@finspot.com' && password === 'Admin@123') {
    return res.json({
      token: 'mock-jwt-token-12345',
      user: {
        id: 'usr-1',
        name: 'Rajkumar Madhu',
        email,
        role: 'Admin',
        department: 'Infrastructure Operations',
        avatar: 'RM',
      },
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

const getDashboardStats = (req, res) => {
  const open = (i) => i.status !== 'RESOLVED' && i.status !== 'CLOSED';
  const myAssignees = new Set(['Rajkumar M.', 'Rajkumar Madhu']);
  const list = incidents.filter(open);
  const recent = list.slice(0, 10).map((i) => ({
    number: i.number,
    title: i.title,
    ci: i.ci,
    priority: String(i.priority || '').toLowerCase(),
    priorityLabel: i.priorityLabel,
    status: String(i.status || '').toLowerCase().replace('_', '-'),
    statusLabel: i.statusLabel,
    assignee: i.assignee,
    initials: i.assigneeInitials,
    age: i.age,
    reporter: i.reporter,
    impactLevel: i.impactLevel,
    urgencyLevel: i.urgencyLevel,
    majorIncident: !!i.majorIncident,
  }));
  res.json({
    workspace: {
      tagline: 'Restore normal service operation — prioritize by impact & urgency, resolve fast.',
    },
    incidents: {
      critical: incidents.filter((i) => i.priority === 'CRITICAL' && open(i)).length,
      high: incidents.filter((i) => i.priority === 'HIGH' && open(i)).length,
      total: list.length,
      unassigned: list.filter((i) => i.assignee === 'Unassigned').length,
      myOpen: list.filter((i) => myAssignees.has(i.assignee)).length,
      slaAtRisk: list.filter((i) => i.slaState === 'warning' || (i.slaPercent != null && i.slaPercent >= 60)).length,
      majorOpen: list.filter((i) => i.majorIncident).length,
      resolved30d: 156,
      mttr: '24m',
      sla: '98.7%',
    },
    problems: { open: MOCK_PROBLEMS.filter((p) => p.state !== 'Resolved').length, total: MOCK_PROBLEMS.length },
    recent,
    changes: changeStats(),
    services: { up: 142, down: 1, maintenance: 3, uptime: '99.92%' },
    trend: {
      labels: ['Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24'],
      critical: [2, 4, 3, 5, 2, 4, 3],
      high: [6, 8, 7, 9, 6, 8, 5],
    },
  });
};

const defaultDetailExtras = {
  metrics: [{ label: 'Status', value: 'New' }],
  logs: [],
  remediation: [['pending', 'Triage', 'Incident logged — awaiting assignment', '—']],
  workNotes: [],
};

router.post('/auth/login', login);
router.use(requireAuth);

router.get('/dashboard/stats', getDashboardStats);
router.get('/incidents', (req, res) => res.json(incidents));
router.get('/incidents/:id', (req, res) => {
  const incident = incidents.find((item) => item.id === req.params.id || item.number === req.params.id);
  if (!incident) return res.status(404).json({ message: 'Incident not found' });
  return res.json(mergeIncidentDetail(incident));
});

router.patch('/incidents/:id', (req, res) => {
  const incident = incidents.find((item) => item.id === req.params.id || item.number === req.params.id);
  if (!incident) return res.status(404).json({ message: 'Incident not found' });
  const body = req.body || {};

  if (body.impactLevel && body.urgencyLevel) {
    const il = String(body.impactLevel).toUpperCase();
    const ul = String(body.urgencyLevel).toUpperCase();
    const { priority, priorityLabel } = calcPriorityFromLevels(il, ul);
    incident.impactLevel = il;
    incident.urgencyLevel = ul;
    incident.priority = priority;
    incident.priorityLabel = priorityLabel;
  }

  if (body.status) {
    const st = String(body.status).toUpperCase();
    if (!STATUS_LABELS[st]) return res.status(400).json({ message: 'Invalid status' });
    incident.status = st;
    incident.statusLabel = body.statusLabel || STATUS_LABELS[st];
  }

  if (body.assignee != null) {
    incident.assignee = body.assignee || 'Unassigned';
    incident.assigneeInitials = initialsFor(incident.assignee);
  }
  if (body.assignmentGroup != null) incident.assignmentGroup = body.assignmentGroup;

  if (body.workNote && body.workNote.text) {
    const author = body.workNote.author || 'Agent';
    const idNote = Date.now();
    incident.storedWorkNotes = incident.storedWorkNotes || [];
    incident.storedWorkNotes.unshift({
      id: idNote,
      author,
      initials: initialsFor(author),
      time: new Date().toISOString(),
      text: String(body.workNote.text).trim(),
    });
  }

  if (body.majorIncident !== undefined) incident.majorIncident = !!body.majorIncident;

  if (body.togglePlaybookTaskId) {
    incident.playbookTasks = incident.playbookTasks || defaultPlaybook();
    const task = incident.playbookTasks.find((t) => t.id === body.togglePlaybookTaskId);
    if (task) task.completed = !task.completed;
  }

  if (body.problemId !== undefined) incident.problemId = body.problemId;
  if (body.changeId !== undefined) incident.changeId = body.changeId;

  incident.updated_at = new Date().toISOString();
  return res.json(mergeIncidentDetail(incident));
});

router.post('/incidents', (req, res) => {
  const body = req.body || {};
  const id = nextIncidentNumber();
  const assignee = body.assignee || 'Unassigned';
  const il = String(body.impactLevel || 'MEDIUM').toUpperCase();
  const ul = String(body.urgencyLevel || 'MEDIUM').toUpperCase();
  const { priority, priorityLabel } = calcPriorityFromLevels(il, ul);
  const reporter = body.reporter || body.caller || 'Self-service';

  const created = {
    id,
    number: id,
    title: body.title || 'Untitled incident',
    shortDescription: body.shortDescription || body.title || 'Untitled incident',
    description: body.description || '',
    priority,
    priorityLabel,
    status: 'OPEN',
    statusLabel: 'Open',
    impact: body.impact || `${il} impact to business`,
    urgency: body.urgency || `${ul} urgency`,
    impactLevel: il,
    urgencyLevel: ul,
    category: body.category || 'General',
    environment: body.environment || 'fs-mum-indmoney-prod-le',
    source: 'Manual',
    sourceType: 'manual',
    reporter,
    assignee,
    assigneeInitials: initialsFor(assignee),
    assignmentGroup: body.assignmentGroup || 'Infrastructure Ops',
    ci: body.ci || '',
    age: 'Just now',
    slaRemaining: '8h 00m',
    slaPercent: 5,
    slaState: 'good',
    storedWorkNotes: [],
    majorIncident: !!body.majorIncident,
    playbookTasks: defaultPlaybook(),
    problemId: body.problemId || '',
    changeId: body.changeId || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  incidents.unshift(created);
  return res.status(201).json(created);
});

router.get('/changes', (req, res) => res.json(changes));

router.get('/changes/:id', (req, res) => {
  const row = changes.find((c) => c.id === req.params.id);
  if (!row) return res.status(404).json({ message: 'Change not found' });
  return res.json(mergeChangeDetail(row));
});

router.post('/changes', (req, res) => {
  const body = req.body || {};
  const id = nextChangeId();
  const scheduledRaw = body.scheduled || body.scheduledDate;
  let scheduled = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  if (scheduledRaw) {
    const d = new Date(scheduledRaw);
    if (!Number.isNaN(d.getTime())) scheduled = d.toISOString();
  }
  const risk = String(body.risk || 'MEDIUM').toUpperCase();
  const riskOk = ['HIGH', 'MEDIUM', 'LOW'].includes(risk) ? risk : 'MEDIUM';
  const changeType = String(body.changeType || 'Normal').replace(/^./, (s) => s.toUpperCase());
  const created = {
    id,
    title: (body.title && String(body.title).trim()) || 'Untitled change',
    risk: riskOk,
    status: 'PENDING',
    changeType: ['Normal', 'Standard', 'Emergency'].includes(changeType) ? changeType : 'Normal',
    requester: (body.requester && String(body.requester).trim()) || 'Rajkumar Madhu',
    assignee: (body.assignee && String(body.assignee).trim()) || 'Infrastructure Ops',
    environment: (body.environment && String(body.environment).trim()) || 'Production',
    cabRequired: body.cabRequired !== false,
    scheduled,
    description: (body.description && String(body.description).trim()) || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  changes.unshift(created);
  return res.status(201).json(created);
});

router.patch('/changes/:id', (req, res) => {
  const row = changes.find((c) => c.id === req.params.id);
  if (!row) return res.status(404).json({ message: 'Change not found' });
  const body = req.body || {};
  if (body.status) {
    const st = String(body.status).toUpperCase();
    if (!CHANGE_STATUS.includes(st)) return res.status(400).json({ message: 'Invalid status' });
    row.status = st;
  }
  if (body.title != null) row.title = String(body.title).trim() || row.title;
  if (body.description != null) row.description = String(body.description);
  if (body.assignee != null) row.assignee = String(body.assignee);
  row.updated_at = new Date().toISOString();
  return res.json(mergeChangeDetail(row));
});

router.get('/problems', (req, res) => res.json(MOCK_PROBLEMS));
router.get('/assets', (req, res) => res.json(MOCK_ASSETS));
router.get('/integrations', (req, res) => res.json(MOCK_INTEGRATIONS));
router.get('/notifications', (req, res) => res.json([
  { id: 'n1', type: 'sla', title: 'SLA warning: INC0015846 approaching breach', time: '3m ago', read: false },
  { id: 'n2', type: 'major', title: 'Major incident review: INC0015847', time: '18m ago', read: false },
  { id: 'n3', type: 'change', title: 'CAB approved CHG-0011', time: '1h ago', read: true },
]));

module.exports = router;
