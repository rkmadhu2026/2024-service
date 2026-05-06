# Service Desk — Unified Data Dictionary (v1 + v3)

This document merges **core Service Desk (v1)** entities with **extended enterprise fields (v3)** into a single reference. Use it with `GET /api/servicedesk/meta/dictionary` for the machine-readable contract.

## Conventions

| Meta | Meaning |
|------|---------|
| **v1** | Baseline incident/request/asset model |
| **v3** | Additions: SLA calendar, operational status, fulfillment, KB versioning hooks, CMDB depth |
| **PK** | Primary key |
| **FK** | Foreign key |
| **REQ** | Required |

---

## Party & access

### User (`PartyUser`)

| Field | Type | REQ | Source | Description |
|-------|------|-----|--------|-------------|
| id | string (cuid) | ✓ | both | Internal id |
| email | string | ✓ | v1 | Login id |
| displayName | string | ✓ | v1 | Full name |
| role | enum string | ✓ | v1 | ADMIN, AGENT, REQUESTER |
| department | string | | v1 | Cost centre / dept |
| active | boolean | ✓ | v3 | Soft deactivate |

### AssignmentGroup

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v1 |
| name | string | ✓ | v1 |
| email | string | | v3 | Distribution list |

### Location

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v3 |
| name | string | ✓ | v3 | Site / DC |
| region | string | | v3 |
| country | string | | v3 |

---

## Service catalog & fulfillment

### CatalogCategory

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v1 |
| name | string | ✓ | v1 |
| parentId | string | | v3 | Hierarchy |
| active | boolean | ✓ | v3 |

### CatalogItem

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v1 |
| categoryId | string | ✓ | v1 |
| name | string | ✓ | v1 |
| shortDescription | text | | v1 |
| fulfillmentGroup | string | | v1 | Maps to AssignmentGroup.name |
| operationalStatus | string | ✓ | v3 | Operational, Deprecated, Pilot |
| slaPolicyId | string | | v3 | FK → SlaPolicy |

---

## SLA

### SlaPolicy

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v3 |
| name | string | ✓ | v3 |
| responseTargetMinutes | int | | v3 |
| resolveTargetMinutes | int | | v3 |
| calendar | string | ✓ | v3 | e.g. 24x7, business_hours |

---

## Knowledge

### KnowledgeArticle

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v3 |
| number | string | ✓ | v3 | KB0001234 |
| title | string | ✓ | v3 |
| body | text | ✓ | v3 |
| state | string | ✓ | v3 | Draft, Published, Retired |
| visibility | string | ✓ | v3 | Internal, External |
| authorName | string | | v3 |
| topic | string | | v1 | Legacy grouping |

---

## Request fulfilment (RITM-style)

### ServiceRequest

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | v1 |
| number | string | ✓ | v1 | REQ001… |
| catalogItemId | string | | v1 |
| shortDescription | string | ✓ | v1 |
| state | string | ✓ | v1 | Open, In Progress, Closed |
| priority | string | ✓ | v1 |
| requesterName | string | ✓ | v1 |
| requestedFor | string | | v3 | On behalf of |
| openedAt | datetime | ✓ | both |

---

## CMDB / CI

### ConfigurationItem (`CmdbCi`)

| Field | Type | REQ | Source |
|-------|------|-----|--------|
| id | string | ✓ | both |
| name | string | ✓ | v1 |
| ciClass | string | ✓ | v3 | Server, Database, Application, Endpoint |
| environment | string | ✓ | v1 |
| owner | string | | v1 |
| status | string | ✓ | v1 | Operational, Degraded, Retired |
| locationId | string | | v3 |
| ipAddress | string | | v3 |
| serialNumber | string | | v3 |
| businessCriticality | string | | v3 | Low, Medium, High |

---

## Relationships (logical)

- `CatalogItem` → `CatalogCategory` (N:1)  
- `CatalogItem` → `SlaPolicy` (N:1, optional)  
- `ServiceRequest` → `CatalogItem` (N:1, optional)  
- `CmdbCi` → `Location` (N:1, optional)  

Incidents, problems, and changes continue to be served by `/api/incidents`, `/api/problems`, `/api/changes` (workspace layer). This unified dictionary powers **catalog, KB, requests, SLA, CMDB directory** under `/api/servicedesk/*`.
