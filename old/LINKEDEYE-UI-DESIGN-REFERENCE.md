# LinkedEye-FinSpot Enterprise Incident Management Platform


---

## 📋 TABLE OF CONTENTS

1. Authentication & User Management
2. Main Dashboard
3. Incident Management
4. Change Management  
5. Problem Management
6. Asset Management --donaim level fs-blr-indmoney-dr-le
fs-mum-indmoney-prod-le
fs-dr-le
neo-prod-le
lemonn-mum-le
indmoney-ifsc-le
fs-ifsc-le
pl-prod-le
fs-dx-le
fs-w2w-le
fs-le-isv
ftc-mum-finspot-le


7. Network Dashboard
8. Reports & Analytics
9. User & Group Administration
10. Integration Tools Dashboard
11. Design System & Components


---

## 🎨 DESIGN PHILOSOPHY

**Inspired by:** Grafana Cloud, ServiceNow, PagerDuty, Datadog
**Color Palette:** Professional dark theme with vibrant accents
**Typography:** Segoe UI / Inter (modern, readable)
**Layout:** Responsive grid with sidebar navigation
**Icons:** Font Awesome 6 Pro
**Charts:** Recharts / D3.js / Chart.js

---

## 1. AUTHENTICATION & USER MANAGEMENT

### 1.1 Login Page (linkedeye-login.html)

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   ┌────────────────┐         ┌──────────────────────┐  │
│   │                │         │                      │  │
│   │  LEFT PANEL    │         │   LOGIN FORM         │  │
│   │  - Logo        │         │   - Email            │  │
│   │  - Features    │         │   - Password         │  │
│   │  - Graphics    │         │   - Remember Me      │  │
│   │                │         │   - SSO Options      │  │
│   └────────────────┘         └──────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Design Elements:**
- Split screen: 40% left (branding) / 60% right (form)
- Left Panel: 
  - Large LinkedEye logo with animated icon
  - Feature highlights with icons
  - Gradient background (navy to purple)
- Right Panel:
  - Clean white background
  - Email & password fields with validation
  - "Remember me" checkbox
  - "Forgot password?" link
  - SSO buttons (Microsoft, Google, Okta)
  - "Sign up" link at bottom
- Demo credentials badge for testing

**Features:**
- Password strength indicator
- Show/hide password toggle
- Auto-focus on email field
- Enter key to submit
- Loading state on submit
- Error messages inline

---

### 1.2 Registration Page (linkedeye-register.html)

**Layout:**
```
┌────────────────────────────────────────┐
│           LINKEDEYE LOGO               │
│      Create Your Account               │
├────────────────────────────────────────┤
│  [First Name]    [Last Name]           │
│  [Email Address]                       │
│  [Organization Name]                   │
│  [Password] ──────────────             │
│  [Confirm Password]                    │
│  ☐ I agree to Terms & Privacy          │
│  [Create Account Button]               │
│                                        │
│  OR sign up with:                      │
│  [Microsoft] [Google] [GitHub]         │
│                                        │
│  Already have account? Sign in         │
└────────────────────────────────────────┘
```

**Features:**
- Multi-step form (optional):
  - Step 1: Basic info
  - Step 2: Organization details
  - Step 3: Account verification
- Real-time email validation
- Password strength meter
- Terms & Privacy links
- Email verification flow

---

## 2. MAIN DASHBOARD

### 2.1 Dashboard Layout (linkedeye-dashboard.html)

**Main Layout Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Search | Alerts (3) | Help | User Avatar        │
├─────┬───────────────────────────────────────────────────────────┤
│     │  PAGE TITLE: Operations Dashboard                         │
│     │  Subtitle: Real-time monitoring • Last updated: 2s ago    │
│  S  ├───────────────────────────────────────────────────────────┤
│  I  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  D  │  │ CRITICAL │ │   OPEN   │ │   MTTR   │ │   SLA    │   │
│  E  │  │    3     │ │    23    │ │   24m    │ │  98.7%   │   │
│  B  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  A  ├───────────────────────────────────────────────────────────┤
│  R  │  FILTERS: [All] [Critical] [High] [Assigned to Me]       │
│     ├───────────────────────────────────────────────────────────┤
│     │  ┌─────────────────────────────────────────────────────┐ │
│     │  │ RECENT INCIDENTS TABLE                              │ │
│     │  │ INC# | Title | Priority | Status | Assignee | Age  │ │
│     │  └─────────────────────────────────────────────────────┘ │
│     ├───────────────────────────────────────────────────────────┤
│     │  ┌──────────────────────┐ ┌─────────────────────────────┐│
│     │  │ INCIDENT TREND CHART │ │ ACTIVITY TIMELINE          ││
│     │  │ (Last 7 Days)        │ │ • Alert triggered          ││
│     │  └──────────────────────┘ └─────────────────────────────┘│
└─────┴───────────────────────────────────────────────────────────┘
```

**Sidebar Navigation:**
```
☰ MENU
━━━━━━━━━━━━━━━━━━
📊 MAIN
  • Dashboard
  • Incidents (23)
  • Changes (7)
  • Problems
  • Calendar

🏢 INFRASTRUCTURE  
  • Network Devices
  • Servers
  • Databases
  • Cloud Resources

🤖 AUTOMATION
  • StackStorm
  • Runbooks
  • Auto-Remediation

📈 MONITORING
  • Prometheus
  • Grafana
  • Alerts

📊 ANALYTICS
  • Reports
  • AI Insights
  • SLA Tracking

⚙️ SETTINGS
  • Configuration
  • Teams
  • Integrations
```

**Dashboard Widgets:**
1. **Stats Cards** (4 cards)
   - Critical Incidents (red)
   - Open Incidents (orange)
   - MTTR (green)
   - SLA Compliance (blue)

2. **Recent Incidents Table**
   - Sortable columns
   - Color-coded priorities
   - Status badges
   - Quick actions (assign, resolve)

3. **Incident Trend Chart**
   - Line/area chart
   - Last 7 days
   - By priority levels

4. **Activity Timeline**
   - Real-time feed
   - Auto-scroll
   - Color-coded events

5. **Network Device Status**
   - Grid of device types
   - Health indicators

---

## 3. INCIDENT MANAGEMENT

### 3.1 Incident List View (linkedeye-incidents.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Incident Management                        [+ New Incident] │
├─────────────────────────────────────────────────────────────┤
│ FILTERS: [Priority▾] [Status▾] [Assignee▾] [Date Range]   │
│ VIEWS: [My Incidents] [Unassigned] [Critical] [All]        │
├─────────────────────────────────────────────────────────────┤
│ ┏━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━┳━━━━━━┓│
│ ┃ INC#   ┃ Title               ┃ Priority┃ Status ┃ Age  ┃│
│ ┣━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━╋━━━━━━━━╋━━━━━━┫│
│ ┃INC0001 ┃ DB Connection Pool  ┃ 🔴 1-C  ┃ Open   ┃ 12m  ┃│
│ ┃INC0002 ┃ High CPU Alert      ┃ 🟠 2-H  ┃ InProg ┃ 45m  ┃│
│ ┃INC0003 ┃ Network Latency     ┃ 🟡 3-M  ┃ Open   ┃ 2h   ┃│
│ ┗━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━┻━━━━━━━━┻━━━━━━┛│
│                                                             │
│ Showing 1-10 of 47 | [Prev] [1] [2] [3] [Next]            │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Multi-select for bulk actions
- Inline editing
- Drag-to-reorder priority
- Export to CSV/Excel
- Advanced search
- Saved filters

---

### 3.2 Incident Detail View (linkedeye-incident-detail.html)

**Layout:** (ServiceNow-style with Grafana integration)
```
┌─────────────────────────────────────────────────────────────┐
│ INC0015847 | 🔴 1-Critical | 🟢 In Progress                  │
│ [Save] [Assign] [Resolve] [Clone] [Print]                   │
├──────────────────────────────────────────┬──────────────────┤
│ 🔔 AUTO-CREATED FROM PROMETHEUS          │                  │
│ Server: prod-app-01 | CPU: 91% | Time:..│ SIDEBAR:         │
├──────────────────────────────────────────┤ • SLA: 3m/2h ✓   │
│ INCIDENT DETAILS                         │ • Response: 45s  │
│ ┌──────────────┬──────────────────────┐ │ • Assigned: RM   │
│ │ Number       │ INC0015847          │ │                  │
│ │ State        │ In Progress         │ │ QUICK ACTIONS:   │
│ │ Priority     │ 1 - Critical        │ │ [SSH]            │
│ │ Assigned To  │ Rajkumar M.        │ │ [Restart]        │
│ └──────────────┴──────────────────────┘ │ [Kill Process]   │
├──────────────────────────────────────────┤                  │
│ GRAFANA METRICS - CPU USAGE (LIVE)       │ GRAFANA LINKS:   │
│ ┌────────────────────────────────────┐   │ • Server View    │
│ │  100% │                            │   │ • CPU Detail     │
│ │   75% │    ╱──────╲                │   │ • Memory         │
│ │   50% │   ╱        ╲───────        │   │ • Network        │
│ │   25% │  ╱                 ╲       │   │                  │
│ │    0% │─────────────────────────── │   │ TIMELINE:        │
│ │      14:05    14:15    14:25 14:32│   │ • Running (now)  │
│ └────────────────────────────────────┘   │ • Assigned (3m)  │
├──────────────────────────────────────────┤ • Created (5m)   │
│ LIVE LOGS (LOKI)                         │ • Alert (5m)     │
│ ┌────────────────────────────────────┐   │                  │
│ │ 14:32:15 ERROR CPU throttling...   │   │ RELATED:         │
│ │ 14:32:10 WARN  CPU > 90%...        │   │ • CHG0012456     │
│ │ 14:32:05 WARN  High CPU...         │   │ • PRB0003421     │
│ └────────────────────────────────────┘   │ • CI: prod-app-01│
├──────────────────────────────────────────┤                  │
│ STACKSTORM AUTO-REMEDIATION              │                  │
│ ✓ Alert received (2s)                    │                  │
│ ✓ Incident created (2s)                  │                  │
│ ✓ Auto-assigned (2s)                     │                  │
│ ⟳ Running diagnostics (8s)...            │                  │
│ ⏳ Pending: Remediation                  │                  │
│ ⏳ Pending: Notify team                  │                  │
└──────────────────────────────────────────┴──────────────────┘
```

**Key Features:**
- Two-column layout (main + sidebar)
- Auto-creation banner (purple gradient)
- Embedded Grafana charts (live updates)
- Live logs from Loki (color-coded)
- StackStorm workflow status
- Related records links
- Collapsible sections
- Work notes vs. comments tabs
- Attachment support

---

### 3.3 New Incident Form (linkedeye-incident-new.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Create New Incident                                         │
├─────────────────────────────────────────────────────────────┤
│ QUICK CREATE | DETAILED FORM | FROM TEMPLATE                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Short Description *                                         │
│ [_______________________________________________]            │
│                                                             │
│ Configuration Item                                          │
│ [🔍 Search servers, devices...    ] [Browse CI Tree]       │
│                                                             │
│ ┌──────────────┬──────────────┬──────────────┐            │
│ │ Impact       │ Urgency      │ Priority     │            │
│ │ [2-Medium ▾] │ [2-Medium ▾] │ 3-Moderate   │            │
│ └──────────────┴──────────────┴──────────────┘            │
│                                                             │
│ Category / Subcategory                                      │
│ [Hardware ▾] → [Server ▾] → [CPU ▾]                       │
│                                                             │
│ Assignment Group                                            │
│ [Infrastructure Ops ▾]  [Auto-Assign 🤖]                   │
│                                                             │
│ Assigned To                                                 │
│ [Auto (Smart Routing) ▾]                                   │
│                                                             │
│ Description                                                 │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ [B] [I] [U] [🔗] [📎] [💬]                          │   │
│ │                                                       │   │
│ │ Detailed description here...                          │   │
│ │                                                       │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ Attachments                                                 │
│ [📎 Drag files here or click to browse]                    │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 💡 AI SUGGESTIONS                                     │   │
│ │ Based on "CPU high", we suggest:                      │   │
│ │ • Assign to: Infrastructure Ops                       │   │
│ │ • Related runbook: CPU_High_Remediation               │   │
│ │ • Similar incidents: INC0012456, INC0013789           │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│           [Cancel]  [Save as Draft]  [Submit]               │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Required fields marked with *
- Auto-complete for CI search
- Category tree selector
- Priority auto-calculation
- AI-powered suggestions
- Rich text editor
- Drag-drop attachments
- Templates dropdown
- Save as draft
- Validation on submit

---

## 4. CHANGE MANAGEMENT

### 4.1 Change Calendar View (linkedeye-change-calendar.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Change Calendar                          [+ New Change]     │
├─────────────────────────────────────────────────────────────┤
│ [Week] [Month] [List]    Dec 2025    [◀] [Today] [▶]      │
├─────────────────────────────────────────────────────────────┤
│ Mon 9   Tue 10  Wed 11  Thu 12  Fri 13  Sat 14  Sun 15     │
├─────────────────────────────────────────────────────────────┤
│         │       │       │ 10:00 │       │       │          │
│         │       │ 14:00 │ CHG001│       │       │          │
│         │ 22:00 │ CHG002│ Netwrk│       │       │          │
│         │ CHG003│ Backup│ Config│       │       │          │
│         │ Patch │       │       │       │       │          │
├─────────┼───────┼───────┼───────┼───────┼───────┼──────────┤
│         │       │       │       │ 02:00 │       │          │
│         │       │       │       │ CHG004│       │          │
│         │       │       │       │ DB Upg│       │          │
└─────────┴───────┴───────┴───────┴───────┴───────┴──────────┘

LEGEND: 🟢 Standard | 🟡 Normal | 🔴 Emergency
```

**Features:**
- Drag-drop to reschedule
- Color-coded by change type
- Conflict detection
- Maintenance window overlay
- Filter by type/team/status
- Export to iCal

---

### 4.2 Change Detail View (linkedeye-change-detail.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ CHG0012456 | Normal Change | 🟡 Scheduled                    │
│ Network VLAN Configuration Update                            │
├──────────────────────────────────────────┬──────────────────┤
│ APPROVAL WORKFLOW: 2/3 Approved          │                  │
│ ✓ Network Manager (Approved)             │ SCHEDULE:        │
│ ✓ Change Advisory Board (Approved)       │ Start: Dec 12    │
│ ⏳ CISO (Pending)                        │ 22:00 IST        │
├──────────────────────────────────────────┤ End: Dec 12      │
│ CHANGE DETAILS                           │ 23:30 IST        │
│ ┌──────────────┬──────────────────────┐ │ Duration: 90m    │
│ │ Number       │ CHG0012456          │ │                  │
│ │ Type         │ Normal              │ │ RISK:            │
│ │ Risk         │ Medium              │ │ • Medium         │
│ │ Implementer  │ Network Team        │ │ • 2 devices      │
│ └──────────────┴──────────────────────┘ │ • 15 min rollback│
├──────────────────────────────────────────┤                  │
│ IMPLEMENTATION PLAN                      │ APPROVERS:       │
│ 1. Backup current configs                │ ✓ John D.        │
│ 2. Apply VLAN changes to SW-01          │ ✓ CAB            │
│ 3. Apply VLAN changes to SW-02          │ ⏳ Sarah K.      │
│ 4. Verify connectivity                   │                  │
│ 5. Update documentation                  │ IMPACTED:        │
│                                          │ • Trading Floor  │
│ BACKOUT PLAN                             │ • 150 devices    │
│ 1. Restore from backup                   │ • 5 services     │
│ 2. Verify restoration                    │                  │
│ 3. Notify teams                          │ RELATED:         │
├──────────────────────────────────────────┤ • INC0015847     │
│ CONFIGURATION (Git)                      │ • PRB0003421     │
│ ┌────────────────────────────────────┐   │                  │
│ │ interface GigabitEthernet1/0/1     │   │ CI TREE:         │
│ │  switchport mode access            │   │ └─ Network       │
│ │  switchport access vlan 100        │   │   └─ SW-01       │
│ │ !                                  │   │   └─ SW-02       │
│ │ interface GigabitEthernet1/0/2     │   │                  │
│ │  switchport mode access            │   │                  │
│ │  switchport access vlan 100        │   │                  │
│ └────────────────────────────────────┘   │                  │
├──────────────────────────────────────────┤                  │
│ TESTING RESULTS                          │                  │
│ ✓ Pre-change health check (Passed)      │                  │
│ ⏳ Implementation (Scheduled)            │                  │
│ ⏳ Post-change validation (Scheduled)    │                  │
└──────────────────────────────────────────┴──────────────────┘
```

**Features:**
- Approval workflow tracker
- Implementation & backout plans
- Config diff viewer (Git integration)
- Pre/post health checks
- Impact analysis
- CI topology view
- Attachment support
- Change timeline

---

### 4.3 New Change Request Form (linkedeye-change-new.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Create Change Request                                       │
├─────────────────────────────────────────────────────────────┤
│ CHANGE TYPE: ● Standard  ○ Normal  ○ Emergency             │
├─────────────────────────────────────────────────────────────┤
│ Short Description *                                         │
│ [Network VLAN Configuration Update___________________]      │
│                                                             │
│ Change Type & Category                                      │
│ [Infrastructure ▾] → [Network ▾] → [Configuration ▾]       │
│                                                             │
│ Implementation Plan * (Markdown supported)                  │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Step 1: Backup current configs                        │   │
│ │ Step 2: Apply VLAN changes                            │   │
│ │ ...                                                   │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ Backout Plan * (Required)                                   │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Step 1: Restore from backup                           │   │
│ │ Step 2: Verify restoration                            │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ Risk Assessment                                             │
│ [Medium ▾]   Estimated Downtime: [0 minutes]               │
│                                                             │
│ Schedule                                                    │
│ [📅 Dec 12, 2025] [🕐 22:00] to [🕐 23:30]                │
│ Duration: 90 minutes                                        │
│                                                             │
│ Affected CIs                                                │
│ [+ Add CI]  SW-01, SW-02 (2 selected)                     │
│                                                             │
│ Business Justification                                      │
│ [Improve network segmentation for security_________]        │
│                                                             │
│ Testing Evidence                                            │
│ [📎 Upload test results]                                   │
│                                                             │
│ CAB Approval Required? ☑ Yes  ☐ No                        │
│                                                             │
│       [Cancel]  [Save Draft]  [Submit for Approval]        │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. PROBLEM MANAGEMENT

### 5.1 Problem Detail View (linkedeye-problem-detail.html)

**Layout:** (Similar to Change, focused on root cause)
```
┌─────────────────────────────────────────────────────────────┐
│ PRB0003421 | 🔴 Critical Problem | Under Investigation       │
│ Recurring Database Connection Pool Exhaustion                │
├──────────────────────────────────────────┬──────────────────┤
│ RELATED INCIDENTS (12)                   │                  │
│ • INC0015847 - CPU High (12/12)          │ INVESTIGATION:   │
│ • INC0015723 - DB Connection (12/10)     │ Started: 12/08   │
│ • INC0015689 - API Slow (12/09)          │ Duration: 4 days │
│ ... (9 more)                             │                  │
├──────────────────────────────────────────┤ WORKAROUND:      │
│ ROOT CAUSE ANALYSIS                      │ • Restart every  │
│ ┌────────────────────────────────────┐   │   4 hours        │
│ │ Problem: Connection leak in        │   │ • Manual cleanup │
│ │ trading-api v2.4.3                 │   │                  │
│ │                                    │   │ PERMANENT FIX:   │
│ │ Contributing Factors:              │   │ ⏳ In Progress   │
│ │ • No connection timeout            │   │ • Deploy v2.5.0  │
│ │ • Insufficient monitoring          │   │ • ETA: Dec 15    │
│ │ • Connection pool too small        │   │                  │
│ └────────────────────────────────────┘   │                  │
├──────────────────────────────────────────┤ RELATED CHANGES: │
│ INCIDENT CORRELATION CHART               │ • CHG0012789     │
│ (Shows spike in similar incidents)       │   (Perm Fix)     │
├──────────────────────────────────────────┤                  │
│ KNOWN ERROR DATABASE                     │ ATTACHMENTS:     │
│ Entry: KE0000234                         │ • RCA Doc        │
│ Documented: 12/10/2025                   │ • Test Results   │
│ Workaround: Available                    │ • Code Changes   │
└──────────────────────────────────────────┴──────────────────┘
```

**Features:**
- Related incidents graph
- Root cause analysis section
- Workaround vs. permanent fix tracking
- Incident correlation chart
- Known error database link
- Change request generation

---

## 6. ASSET MANAGEMENT

### 6.1 Asset Dashboard (linkedeye-assets.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Asset Management                         [+ Add Asset]      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ SERVERS │ │ NETWORK │ │DATABASE │ │  CLOUD  │           │
│ │   142   │ │   89    │ │   24    │ │   67    │           │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
├─────────────────────────────────────────────────────────────┤
│ FILTER: [Location▾] [Type▾] [Status▾] [Owner▾]            │
├─────────────────────────────────────────────────────────────┤
│ ASSET LIST                                                  │
│ ┏━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━┳━━━━━━━┳━━━━━━━━━━━┓   │
│ ┃ Hostname   ┃ Type       ┃ Loc  ┃ Status┃ Owner     ┃   │
│ ┣━━━━━━━━━━━━╋━━━━━━━━━━━━╋━━━━━━╋━━━━━━━╋━━━━━━━━━━━┫   │
│ ┃prod-app-01 ┃ Server     ┃ DC-1 ┃ 🟢 Up ┃ Infra Team┃   │
│ ┃prod-db-01  ┃ Database   ┃ DC-1 ┃ 🟢 Up ┃ DBA Team  ┃   │
│ ┃sw-core-01  ┃ Switch     ┃ DC-1 ┃ 🟢 Up ┃ Net Team  ┃   │
│ ┗━━━━━━━━━━━━┻━━━━━━━━━━━━┻━━━━━━┻━━━━━━━┻━━━━━━━━━━━┛   │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Asset categories
- Lifecycle tracking
- Warranty/EOL dates
- Cost tracking
- Relationship mapping
- Bulk import/export

---

## 7. NETWORK DASHBOARD

### 7.1 Network Topology View (linkedeye-network-topology.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Network Topology                         [Refresh] [Export] │
├─────────────────────────────────────────────────────────────┤
│ VIEW: ● Topology  ○ List  ○ Map                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌──────────┐                                   │
│              │ INTERNET │                                   │
│              └─────┬────┘                                   │
│                    │                                        │
│           ┌────────┴────────┐                              │
│           │                 │                              │
│      ┌────▼────┐      ┌────▼────┐                         │
│      │ FW-01   │      │ FW-02   │                         │
│      │ 🟢      │      │ 🟢      │                         │
│      └────┬────┘      └────┬────┘                         │
│           │                 │                              │
│      ┌────▼─────────────────▼────┐                        │
│      │                            │                        │
│ ┌────▼────┐                  ┌────▼────┐                  │
│ │ SW-C-01 │                  │ SW-C-02 │                  │
│ │ 🟢      │──────────────────│ 🟢      │                  │
│ └────┬────┘                  └────┬────┘                  │
│      │                            │                        │
│ ┌────▼────┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐       │
│ │ SW-A-01 │  │ SW-A-02 │  │ SW-A-03 │  │ SW-A-04 │       │
│ │ 🟢      │  │ 🟡      │  │ 🟢      │  │ 🟢      │       │
│ └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                             │
│ STATUS: 🟢 Healthy  🟡 Warning  🔴 Critical                │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Interactive topology (D3.js)
- Real-time health status
- Click device for details
- Link status/bandwidth
- Auto-discovery
- Export to PNG/SVG

---

### 7.2 Network Device Detail (linkedeye-network-device-detail.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ SW-CORE-01 | Cisco Catalyst 9500 | 🟢 Healthy               │
├──────────────────────────────────────────┬──────────────────┤
│ DEVICE INFO                              │                  │
│ ┌──────────────┬──────────────────────┐ │ METRICS:         │
│ │ Hostname     │ sw-core-01.finspot  │ │ CPU: 23%         │
│ │ IP Address   │ 10.0.1.1           │ │ Memory: 45%      │
│ │ Location     │ DC-1, Rack A3      │ │ Uptime: 45d      │
│ │ Serial #     │ FDO2345A6B7        │ │ Temp: 42°C       │
│ └──────────────┴──────────────────────┘ │                  │
├──────────────────────────────────────────┤ PORT STATUS:     │
│ INTERFACE STATUS                         │ Up: 45/48        │
│ ┏━━━━━━━┳━━━━━━━━━┳━━━━━━━┳━━━━━━━━━┓ │ Down: 3          │
│ ┃ Port  ┃ Status  ┃ VLAN  ┃ Speed   ┃ │                  │
│ ┣━━━━━━━╋━━━━━━━━━╋━━━━━━━╋━━━━━━━━━┫ │ ALERTS:          │
│ ┃ Gi1/1 ┃ 🟢 Up   ┃ 100   ┃ 1Gbps   ┃ │ None             │
│ ┃ Gi1/2 ┃ 🟢 Up   ┃ 100   ┃ 1Gbps   ┃ │                  │
│ ┃ Gi1/3 ┃ 🔴 Down ┃ -     ┃ -       ┃ │ CHANGES:         │
│ ┗━━━━━━━┻━━━━━━━━━┻━━━━━━━┻━━━━━━━━━┛ │ • CHG0012456     │
├──────────────────────────────────────────┤   (Scheduled)    │
│ CONFIG BACKUP (Last: 12/12 14:30)        │                  │
│ [View Current] [View History] [Restore]  │ INCIDENTS:       │
│                                          │ None (Last 30d)  │
│ GRAFANA DASHBOARD                        │                  │
│ [View Device Dashboard →]                │                  │
└──────────────────────────────────────────┴──────────────────┘
```

**Features:**
- Real-time metrics
- Port status table
- Config backup/restore
- Change history
- Related incidents
- Embedded Grafana

---

## 8. REPORTS & ANALYTICS

### 8.1 Reports Dashboard (linkedeye-reports.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Reports & Analytics                      [+ New Report]     │
├─────────────────────────────────────────────────────────────┤
│ QUICK REPORTS                                               │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│ │ Daily Digest │ │Weekly Summary│ │Monthly Review│        │
│ │ [Generate]   │ │ [Generate]   │ │ [Generate]   │        │
│ └──────────────┘ └──────────────┘ └──────────────┘        │
├─────────────────────────────────────────────────────────────┤
│ INCIDENT REPORTS                                            │
│ • Incident Volume by Priority (Last 30 days)               │
│ • MTTR Trend Analysis                                       │
│ • Top 10 Most Frequent Incident Types                      │
│ • SLA Compliance Report                                     │
│ • Incidents by Assignment Group                            │
├─────────────────────────────────────────────────────────────┤
│ CHANGE REPORTS                                              │
│ • Change Success Rate                                       │
│ • Emergency vs. Planned Changes                            │
│ • Changes by Type and Risk                                 │
│ • Change Calendar Utilization                              │
├─────────────────────────────────────────────────────────────┤
│ SERVER-SPECIFIC REPORTS                                     │
│ • prod-app-01 Incident History (Last 90 days)              │
│ • Database Server Performance Issues                       │
│ • Network Device Downtime Summary                          │
├─────────────────────────────────────────────────────────────┤
│ SCHEDULED REPORTS                                           │
│ ┏━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━┓   │
│ ┃ Report Name       ┃ Schedule┃ Format ┃ Recipients  ┃   │
│ ┣━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━╋━━━━━━━━╋━━━━━━━━━━━━┫   │
│ ┃ Daily Ops Summary ┃ Daily   ┃ PDF    ┃ Ops Team    ┃   │
│ ┃ Weekly SLA Report ┃ Monday  ┃ Excel  ┃ Management  ┃   │
│ ┗━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━┻━━━━━━━━┻━━━━━━━━━━━━┛   │
└─────────────────────────────────────────────────────────────┘
```

**Report Types:**
1. **Daily Digest**
   - Yesterday's incidents
   - Today's scheduled changes
   - SLA metrics
   - Critical alerts

2. **Weekly Summary**
   - Incident statistics
   - Change success rate
   - Top issues
   - Team performance

3. **Monthly Review**
   - Trend analysis
   - Budget vs. actual
   - SLA compliance
   - Capacity planning

4. **Server-Specific Reports**
   - Filter by hostname
   - Incident history
   - Change history
   - Performance metrics
   - Cost attribution

---

### 8.2 Analytics Dashboard (linkedeye-analytics.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Analytics & Insights                     [Date Range: 30d]  │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐  │
│ │ INCIDENT TREND (Last 30 Days)                          │  │
│ │  50 │                                                  │  │
│ │  40 │     ╱‾╲    ╱‾╲                                   │  │
│ │  30 │    ╱   ╲  ╱   ╲                                  │  │
│ │  20 │   ╱     ╲╱     ╲                                 │  │
│ │  10 │  ╱               ╲╲                              │  │
│ │   0 │─────────────────────────                        │  │
│ └────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐ ┌──────────────────────────────┐  │
│ │ TOP 5 CATEGORIES     │ │ MTTR BY PRIORITY             │  │
│ │ • Database    (45%)  │ │ Critical:  45 min            │  │
│ │ • Network     (25%)  │ │ High:      2.5 hours         │  │
│ │ • Application (15%)  │ │ Medium:    4 hours           │  │
│ │ • Server      (10%)  │ │ Low:       1 day             │  │
│ │ • Other       (5%)   │ │                              │  │
│ └──────────────────────┘ └──────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ 🤖 AI INSIGHTS                                              │
│ • Incident volume increased 15% this week                  │
│ • Database issues are recurring - consider Problem ticket  │
│ • prod-app-01 has 5 incidents in 3 days - needs attention │
│ • SLA compliance at risk for Infrastructure team           │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. USER & GROUP ADMINISTRATION

### 9.1 User Management (linkedeye-users.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ User Management                          [+ Add User]       │
├─────────────────────────────────────────────────────────────┤
│ FILTER: [Role▾] [Team▾] [Status▾] [Search user...]         │
├─────────────────────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━┳━━━━━━━┓│
│ ┃ Name          ┃ Email      ┃ Role   ┃ Team   ┃ Status┃│
│ ┣━━━━━━━━━━━━━━━╋━━━━━━━━━━━━╋━━━━━━━━╋━━━━━━━━╋━━━━━━━┫│
│ ┃ Rajkumar M.   ┃ raj@...    ┃ Admin  ┃ DevOps ┃ 🟢    ┃│
│ ┃ Arun Kumar    ┃ arun@...   ┃ Agent  ┃ Infra  ┃ 🟢    ┃│
│ ┃ Priya Sharma  ┃ priya@...  ┃ Agent  ┃ DBA    ┃ 🟢    ┃│
│ ┗━━━━━━━━━━━━━━━┻━━━━━━━━━━━━┻━━━━━━━━┻━━━━━━━━┻━━━━━━━┛│
└─────────────────────────────────────────────────────────────┘
```

**User Detail View:**
```
┌─────────────────────────────────────────────────────────────┐
│ User: Rajkumar M.                        [Edit] [Deactivate]│
├─────────────────────────────────────────────────────────────┤
│ PROFILE                                                     │
│ Name: Rajkumar Madhu                                        │
│ Email: rajkumar@finspot.com                                 │
│ Phone: +91 98765 43210                                      │
│ Title: Senior DevOps Engineer                               │
│ Department: Infrastructure Operations                       │
│                                                             │
│ ROLES & PERMISSIONS                                         │
│ ☑ Admin                                                    │
│ ☑ Incident Manager                                         │
│ ☑ Change Approver                                          │
│ ☐ Auditor                                                  │
│                                                             │
│ TEAMS & GROUPS                                              │
│ • Infrastructure Operations (Primary)                      │
│ • Database Team                                            │
│ • On-Call Rotation Group                                   │
│                                                             │
│ SKILLS                                                      │
│ • Linux Administration                                     │
│ • PostgreSQL                                               │
│ • Kubernetes                                               │
│ • Network Troubleshooting                                  │
│                                                             │
│ STATISTICS (Last 30 Days)                                   │
│ Assigned: 45 | Resolved: 42 | Avg MTTR: 2.3h              │
└─────────────────────────────────────────────────────────────┘
```

---

### 9.2 Group Management (linkedeye-groups.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Groups & Teams                           [+ New Group]      │
├─────────────────────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓   │
│ ┃ Group Name          ┃ Members ┃ Description         ┃   │
│ ┣━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━┫   │
│ ┃ Infrastructure Ops  ┃ 12      ┃ Server & Network    ┃   │
│ ┃ Database Team       ┃ 5       ┃ DBA Group           ┃   │
│ ┃ Network Team        ┃ 8       ┃ Network Operations  ┃   │
│ ┃ DevOps Team         ┃ 15      ┃ CI/CD & Automation  ┃   │
│ ┗━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━┛   │
│                                                             │
│ Group: Infrastructure Operations                            │
│ ├─ Members (12)                                            │
│ │  • Rajkumar M. (Lead)                                   │
│ │  • Arun Kumar                                           │
│ │  ... (10 more)                                          │
│ ├─ On-Call Schedule                                        │
│ │  Current: Rajkumar M.                                   │
│ │  Next: Arun Kumar (starts Dec 13)                      │
│ ├─ Assignment Rules                                        │
│ │  Auto-assign: Server & Network incidents               │
│ └─ Escalation Policy                                       │
│    L1: Team member (15 min)                               │
│    L2: Team lead (30 min)                                 │
│    L3: Manager (1 hour)                                   │
└─────────────────────────────────────────────────────────────┘
```
## 👥 Finspot Team Contacts

### Primary On-Call
- **Name**: Rajkumar Madhu
- **Role**: Senior DevOps Engineer
- **Mobile**: +91-917-677-2077
- **Email**: rajkumar.madhu@rmadhu.in
- **Responsibility**: 24/7 Infrastructure support

### DevOps Lead / Escalation
- **Name**: Hoysala Bise
- **Email**: hoysala.bise@finspot.in
- **Mobile**: +91-998-014-6101
- **Escalation Level**: Critical infrastructure issues

### Network Operations Team
1. **Siva Kadirannagari** (Lead)
   - Email: siva.kadirannagari@finspot.in
   - Mobile: +91-960-368-3828
   - Focus: Network infrastructure, switches, firewalls

2. **Edukondalu P**
   - Email: edukondalu.p@finspot.in
   - Mobile: +91-984-002-3898
   - Focus: Routing, network monitoring

3. **Devendrareddy Puppala**
   - Email: devendrareddy.puppala@finspot.in
   - Mobile: +91-630-146-2775
   - Focus: SNMP monitoring, network devices

### Database Administration
- **Name**: Rajkumar Ashokan
- **Email**: rajkumar.ashokan@finspot.in
- **Mobile**: +91-975-189-2775
- **Expertise**: MySQL, PostgreSQL, MongoDB

### Trading Platform Team
1. **Siva Kadirannagari** (Lead)
   - Email: siva.kadirannagari@finspot.in
   - Mobile: +91-960-368-3828
   - Responsibility: NSE/BSE/NSEFO connectivity

2. **Edukondalu P**
   - Email: edukondalu.p@finspot.in
   - Mobile: +91-984-002-3898
   - Responsibility: BOD/EOD operations

---

## 🚨 Emergency Contact Protocol

### Critical Infrastructure Issues
1. **Primary**: Rajkumar Madhu (+91-917-677-2077)
2. **Escalation**: Hoysala Bise (+91-998-014-6101)

### Network Emergencies
- Contact Network Team (Siva/Edukondalu/Devendrareddy)
- Slack: #network-ops

### Database Emergencies
- Contact: Rajkumar Ashokan (+91-975-189-2775)
- Slack: #database-ops

### Trading Platform Outages
- Contact Trading Team immediately
- Notify trading desk
- Slack: #trading-critical


---

## 10. INTEGRATION TOOLS DASHBOARD

### 10.1 Integrations Overview (linkedeye-integrations.html)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Integrations                             [+ Add Integration]│
├─────────────────────────────────────────────────────────────┤
│ MONITORING & OBSERVABILITY                                  │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│ │ 📊 Prometheus  │ │ 🟠 Grafana     │ │ 💜 Loki        │  │
│ │ ✓ Connected    │ │ ✓ Connected    │ │ ✓ Connected    │  │
│ │ 1,245 metrics  │ │ 45 dashboards  │ │ Logs streaming │  │
│ │ [Configure]    │ │ [Configure]    │ │ [Configure]    │  │
│ └────────────────┘ └────────────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ AUTOMATION & ORCHESTRATION                                  │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│ │ 🤖 StackStorm  │ │ 📘 Ansible AWX │ │ 🔄 Jenkins     │  │
│ │ ✓ Connected    │ │ ✓ Connected    │ │ ✓ Connected    │  │
│ │ 25 workflows   │ │ 15 playbooks   │ │ 10 pipelines   │  │
│ │ [Configure]    │ │ [Configure]    │ │ [Configure]    │  │
│ └────────────────┘ └────────────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ COMMUNICATION                                               │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│ │ 💬 Slack       │ │ 📧 Email       │ │ 📟 PagerDuty   │  │
│ │ ✓ Connected    │ │ ✓ Connected    │ │ ✓ Connected    │  │
│ │ #ops-incidents │ │ SMTP configured│ │ 3 services     │  │
│ │ [Configure]    │ │ [Configure]    │ │ [Configure]    │  │
│ └────────────────┘ └────────────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ TICKETING & ITSM                                            │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│ │ 🎫 Jira        │ │ 🔵 ServiceNow  │ │ 📋 GitHub      │  │
│ │ ○ Available    │ │ ○ Available    │ │ ✓ Connected    │  │
│ │ Not configured │ │ Not configured │ │ Issues synced  │  │
│ │ [Setup]        │ │ [Setup]        │ │ [Configure]    │  │
│ └────────────────┘ └────────────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ WEBHOOKS & API                                              │
│ • Incoming Webhooks: 5 active                              │
│ • Outgoing Webhooks: 8 active                              │
│ • API Keys: 12 active                                      │
│ [Manage Webhooks] [Manage API Keys]                        │
└─────────────────────────────────────────────────────────────┘
```

**Integration Detail View:**
```
┌─────────────────────────────────────────────────────────────┐
│ Prometheus Integration                   [Edit] [Test]      │
├─────────────────────────────────────────────────────────────┤
│ STATUS: ✓ Connected                                         │
│ Last Sync: 2 minutes ago                                    │
│                                                             │
│ CONNECTION DETAILS                                          │
│ URL: https://prometheus.finspot.com                        │
│ Auth: Bearer Token                                          │
│ Version: 2.45.0                                             │
│                                                             │
│ CONFIGURATION                                               │
│ ☑ Auto-create incidents from alerts                       │
│ ☑ Embed metrics in incident tickets                       │
│ ☑ Link to Grafana dashboards                              │
│ Alert Severity Mapping:                                     │
│ • critical → Priority 1                                    │
│ • warning → Priority 2                                     │
│ • info → Priority 4                                        │
│                                                             │
│ STATISTICS (Last 30 Days)                                   │
│ Alerts Received: 1,234                                      │
│ Incidents Created: 45                                       │
│ Metrics Collected: 1.2M                                     │
│                                                             │
│ WEBHOOK URL                                                 │
│ https://linkedeye.finspot.com/api/v1/webhooks/prometheus   │
│ [Copy] [Regenerate]                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. DESIGN SYSTEM & COMPONENTS

### Color Palette
```
Primary:
- Navy: #0f1c3f (headers)
- Blue: #016 (links, buttons)
- Blue Light: #2e4a6a (hover states)

Status Colors:
- Green: #4caf50 (success, healthy)
- Red: #d32f2f (critical, error)
- Orange: #ff9800 (warning, high priority)
- Yellow: #ffc107 (caution, medium)
- Purple: #9c27b0 (automation)

Background:
- Body: #f4f6f9
- White: #ffffff
- Light: #fafbfc
- Section: #e8eef5
- Dark: #1a1a1a (charts)

Text:
- Primary: #000
- Secondary: #424952
- Muted: #6b7785

Borders:
- Main: #d2d6dc
- Light: #e5e8eb
```

### Typography
```
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
Monospace: 'Courier New', 'JetBrains Mono', monospace

Sizes:
- h1: 22px (incident numbers)
- h2: 18px (section headers)
- h3: 15px (card titles)
- body: 13px (main text)
- small: 11px (metadata)
- tiny: 9px (badges)

Weights:
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
```

### Shadows
```
sm: 0 1px 2px 0 rgba(0,0,0,.05)
md: 0 2px 4px 0 rgba(0,0,0,.08)
lg: 0 4px 8px 0 rgba(0,0,0,.12)
```

### Border Radius
```
- Small: 3px (badges)
- Medium: 4px (cards)
- Large: 8px (modals)
- Round: 50% (avatars)
```

## 👥 Finspot Team Contacts

### Primary On-Call
- **Name**: Rajkumar Madhu
- **Role**: Senior DevOps Engineer
- **Mobile**: +91-917-677-2077
- **Email**: rajkumar.madhu@rmadhu.in
- **Responsibility**: 24/7 Infrastructure support

### DevOps Lead / Escalation
- **Name**: Hoysala Bise
- **Email**: hoysala.bise@finspot.in
- **Mobile**: +91-998-014-6101
- **Escalation Level**: Critical infrastructure issues

### Network Operations Team
1. **Siva Kadirannagari** (Lead)
   - Email: siva.kadirannagari@finspot.in
   - Mobile: +91-960-368-3828
   - Focus: Network infrastructure, switches, firewalls

2. **Edukondalu P**
   - Email: edukondalu.p@finspot.in
   - Mobile: +91-984-002-3898
   - Focus: Routing, network monitoring

3. **Devendrareddy Puppala**
   - Email: devendrareddy.puppala@finspot.in
   - Mobile: +91-630-146-2775
   - Focus: SNMP monitoring, network devices

### Database Administration
- **Name**: Rajkumar Ashokan
- **Email**: rajkumar.ashokan@finspot.in
- **Mobile**: +91-975-189-2775
- **Expertise**: MySQL, PostgreSQL, MongoDB

### Trading Platform Team
1. **Siva Kadirannagari** (Lead)
   - Email: siva.kadirannagari@finspot.in
   - Mobile: +91-960-368-3828
   - Responsibility: NSE/BSE/NSEFO connectivity

2. **Edukondalu P**
   - Email: edukondalu.p@finspot.in
   - Mobile: +91-984-002-3898
   - Responsibility: BOD/EOD operations

---

## 🚨 Emergency Contact Protocol

### Critical Infrastructure Issues
1. **Primary**: Rajkumar Madhu (+91-917-677-2077)
2. **Escalation**: Hoysala Bise (+91-998-014-6101)

### Network Emergencies
- Contact Network Team (Siva/Edukondalu/Devendrareddy)
- Slack: #network-ops

### Database Emergencies
- Contact: Rajkumar Ashokan (+91-975-189-2775)
- Slack: #database-ops

### Trading Platform Outages
- Contact Trading Team immediately
- Notify trading desk
- Slack: #trading-critical

---

## 🎯 SUMMARY OF ALL HTML FILES NEEDED

### Phase 1: Authentication (2 files)
1. `linkedeye-login.html` - Login page
2. `linkedeye-register.html` - Registration page

### Phase 2: Main Dashboard (1 file)
3. `linkedeye-dashboard.html` - Main operations dashboard

### Phase 3: Incident Management (3 files)
4. `linkedeye-incidents.html` - Incident list view
5. `linkedeye-incident-detail.html` - Incident detail (with Grafana/Loki)
6. `linkedeye-incident-new.html` - Create incident form

### Phase 4: Change Management (3 files)
7. `linkedeye-change-calendar.html` - Change calendar view
8. `linkedeye-change-detail.html` - Change detail with approval workflow
9. `linkedeye-change-new.html` - Create change request form

### Phase 5: Problem Management (1 file)
10. `linkedeye-problem-detail.html` - Problem record with RCA

### Phase 6: Asset & Network (4 files)
11. `linkedeye-assets.html` - Asset dashboard
12. `linkedeye-network-topology.html` - Network topology view
13. `linkedeye-network-device-detail.html` - Device detail
14. `linkedeye-network-devices.html` - Device list

### Phase 7: Reports & Analytics (2 files)
15. `linkedeye-reports.html` - Reports dashboard
16. `linkedeye-analytics.html` - Analytics & insights

### Phase 8: Administration (3 files)
17. `linkedeye-users.html` - User management
18. `linkedeye-groups.html` - Group management
19. `linkedeye-admin-settings.html` - Admin settings

### Phase 9: Integrations (2 files)
20. `linkedeye-integrations.html` - Integration dashboard
21. `linkedeye-integration-detail.html` - Integration configuration

**TOTAL: 21 HTML FILES**

---

## 🚀 NEXT STEPS

Once you approve this design reference, I will:

1. Create each HTML file with production-ready code
2. Include ServiceNow-style layouts
3. Embed Grafana/Loki visualizations
4. Add StackStorm workflow displays
5. Implement responsive design
6. Add interactive JavaScript
7. Include all navigation flows
8. Create a master index.html

**Ready to proceed?** Please confirm and I'll start building the complete HTML templates!
