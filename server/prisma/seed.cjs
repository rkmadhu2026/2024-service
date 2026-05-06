/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.serviceRequest.deleteMany();
  await prisma.knowledgeArticle.deleteMany();
  await prisma.catalogItem.deleteMany();
  await prisma.catalogCategory.deleteMany();
  await prisma.cmdbCi.deleteMany();
  await prisma.location.deleteMany();
  await prisma.slaPolicy.deleteMany();
  await prisma.partyUser.deleteMany();
  await prisma.assignmentGroup.deleteMany();

  const slaP1 = await prisma.slaPolicy.create({
    data: {
      id: 'sla-p1',
      name: 'P1 — Business critical',
      responseTargetMinutes: 15,
      resolveTargetMinutes: 240,
      calendar: '24x7',
    },
  });

  const slaP3 = await prisma.slaPolicy.create({
    data: {
      id: 'sla-p3',
      name: 'P3 — Standard',
      responseTargetMinutes: 480,
      resolveTargetMinutes: 2880,
      calendar: 'business_hours',
    },
  });

  const slaP4 = await prisma.slaPolicy.create({
    data: {
      id: 'sla-p4',
      name: 'P4 — Low touch',
      responseTargetMinutes: 1440,
      resolveTargetMinutes: 7200,
      calendar: 'business_hours',
    },
  });

  await prisma.location.createMany({
    data: [
      { id: 'loc-mum', name: 'Mumbai DC — FS-MUM', region: 'APAC', country: 'IN' },
      { id: 'loc-edge', name: 'Cloudflare Edge — BOM', region: 'Edge', country: '—' },
    ],
  });

  await prisma.assignmentGroup.createMany({
    data: [
      { id: 'grp-infra', name: 'Infrastructure Ops', email: 'infra-ops@finspot.com' },
      { id: 'grp-app', name: 'Application Platform', email: 'app-plat@finspot.com' },
      { id: 'grp-sec', name: 'Security Operations', email: 'secops@finspot.com' },
    ],
  });

  const admin = await prisma.partyUser.create({
    data: {
      id: 'usr-admin',
      email: 'admin@finspot.com',
      displayName: 'Rajkumar Madhu',
      role: 'ADMIN',
      department: 'Infrastructure Operations',
      active: true,
    },
  });

  await prisma.partyUser.createMany({
    data: [
      {
        id: 'usr-agent1',
        email: 'agent@finspot.com',
        displayName: 'Alex Rivera',
        role: 'AGENT',
        department: 'Application Support',
        active: true,
      },
      {
        id: 'usr-req1',
        email: 'requester@finspot.com',
        displayName: 'Sarah Chen',
        role: 'REQUESTER',
        department: 'Trading Desk',
        active: true,
      },
    ],
  });

  const catInfra = await prisma.catalogCategory.create({
    data: { id: 'cat-infra', name: 'Infrastructure', active: true },
  });
  const catAccess = await prisma.catalogCategory.create({
    data: { id: 'cat-access', name: 'Access & Identity', active: true },
  });
  const catApp = await prisma.catalogCategory.create({
    data: { id: 'cat-app', name: 'Applications', parentId: null, active: true },
  });

  await prisma.catalogItem.createMany({
    data: [
      {
        id: 'ci-vm-resize',
        categoryId: catInfra.id,
        name: 'Resize VM / CPU-RAM change',
        shortDescription: 'Scheduled capacity change with approval for production VMs.',
        fulfillmentGroup: 'Infrastructure Ops',
        operationalStatus: 'Operational',
        slaPolicyId: slaP3.id,
      },
      {
        id: 'ci-db-maint',
        categoryId: catInfra.id,
        name: 'Database maintenance window',
        shortDescription: 'Planned index rebuild / stats update with CAB slot.',
        fulfillmentGroup: 'Infrastructure Ops',
        operationalStatus: 'Operational',
        slaPolicyId: slaP3.id,
      },
      {
        id: 'ci-access-ad',
        categoryId: catAccess.id,
        name: 'AD group / role request',
        shortDescription: 'Grant or revoke AD groups per IAM policy.',
        fulfillmentGroup: 'Security Operations',
        operationalStatus: 'Operational',
        slaPolicyId: slaP4.id,
      },
      {
        id: 'ci-app-deploy',
        categoryId: catApp.id,
        name: 'Application deployment (standard)',
        shortDescription: 'Blue/green or canary deploy via pipeline.',
        fulfillmentGroup: 'Application Platform',
        operationalStatus: 'Operational',
        slaPolicyId: slaP1.id,
      },
      {
        id: 'ci-cert',
        categoryId: catInfra.id,
        name: 'TLS certificate install / renew',
        shortDescription: 'Edge or origin certificate lifecycle.',
        fulfillmentGroup: 'Security Operations',
        operationalStatus: 'Operational',
        slaPolicyId: slaP4.id,
      },
    ],
  });

  await prisma.knowledgeArticle.createMany({
    data: [
      {
        number: 'KB001001',
        title: 'PostgreSQL connection pool tuning checklist',
        body: 'Verify max_connections, pool size per service, idle timeout, and statement_timeout before peak hours.',
        state: 'Published',
        visibility: 'Internal',
        authorName: 'Rajkumar Madhu',
        topic: 'Database',
      },
      {
        number: 'KB001002',
        title: 'Kubernetes rollout rollback procedure',
        body: 'Use kubectl rollout undo; verify PDBs; shift traffic via service mesh weighted routes.',
        state: 'Published',
        visibility: 'Internal',
        authorName: 'Platform SRE',
        topic: 'Kubernetes',
      },
      {
        number: 'KB001003',
        title: 'Firewall change validation — HTTPS edge',
        body: 'Synthetic checks from three regions; confirm TLS chain and WAF rule hit counts.',
        state: 'Published',
        visibility: 'Internal',
        authorName: 'Security Ops',
        topic: 'Network',
      },
      {
        number: 'KB001004',
        title: 'Draft: CRM integration OAuth renewal',
        body: 'Placeholder for next quarterly OAuth credential rotation.',
        state: 'Draft',
        visibility: 'Internal',
        authorName: 'App Platform',
        topic: 'Applications',
      },
    ],
  });

  await prisma.cmdbCi.createMany({
    data: [
      {
        assetTag: 'ASSET-DB-PROD-01',
        name: 'prod-db-01.fs-mum-indmoney-prod-le',
        ciClass: 'Database',
        environment: 'Production',
        owner: 'DBA Team',
        status: 'Operational',
        ipAddress: '10.40.2.11',
        serialNumber: 'SN-DB-88421',
        businessCriticality: 'High',
        locationId: 'loc-mum',
      },
      {
        assetTag: 'ASSET-APP-NEO-01',
        name: 'trading-engine-01.neo-prod-le',
        ciClass: 'Application Server',
        environment: 'Production',
        owner: 'App Platform',
        status: 'Operational',
        ipAddress: '10.40.8.22',
        businessCriticality: 'High',
        locationId: 'loc-mum',
      },
      {
        assetTag: 'ASSET-NET-CORE',
        name: 'sw-core-01.fs-dx-le',
        ciClass: 'Network Switch',
        environment: 'Production',
        owner: 'Network Ops',
        status: 'Degraded',
        ipAddress: '10.30.1.1',
        businessCriticality: 'Medium',
        locationId: 'loc-mum',
      },
      {
        assetTag: 'ASSET-EDGE-WAF',
        name: 'trading.finspot.com',
        ciClass: 'Web Endpoint',
        environment: 'Edge',
        owner: 'Security Team',
        status: 'Operational',
        locationId: 'loc-edge',
      },
    ],
  });

  await prisma.serviceRequest.createMany({
    data: [
      {
        id: 'sr-1',
        number: 'REQ000501',
        catalogItemId: 'ci-vm-resize',
        shortDescription: 'Increase RAM on reporting worker nodes for month-end batch',
        state: 'Open',
        priority: '3 - Moderate',
        requesterName: 'Sarah Chen',
        requestedFor: 'Finance Ops',
        requesterUserId: admin.id,
      },
      {
        id: 'sr-2',
        number: 'REQ000502',
        catalogItemId: 'ci-access-ad',
        shortDescription: 'Grant trading_floor_rw AD group for contractor T-9021',
        state: 'In Progress',
        priority: '4 - Low',
        requesterName: 'Alex Rivera',
        requesterUserId: 'usr-agent1',
      },
      {
        id: 'sr-3',
        number: 'REQ000503',
        catalogItemId: null,
        shortDescription: 'General inquiry — duplicate of INC routing',
        state: 'Closed',
        priority: '5 - Planning',
        requesterName: 'Self-service portal',
      },
    ],
  });

  console.log('Service desk seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
