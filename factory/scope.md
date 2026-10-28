# Scope

Status: approved.

## Mission

Show engineers, product, and leadership a small factory producing a working LTR V2 client prototype. The prototype is the evidence. The first showing is a local demo.

## Product

A property-manager web app, rebuilt in this repository. Saved data lives in a database and survives a restart.

`dev-hub/apps/ltr-v2-client-prototype` is reference only. Copy its screens, copy, and seed data. Do not import its code.

## Users

A user picker, no passwords. Every write is stored under the selected user.

| Seed | Role | Can edit |
| --- | --- | --- |
| One Org admin | Org admin | Every settings screen, including policy. Every property, including ones added later |
| One Property manager admin | Property manager admin | Assigned properties, and groups assigned directly |

The Property manager admin can see General, Integrations, Users, Billing, and Policy management, and cannot edit them. Policy fields are read-only on every screen. A group that only contains one of their properties is not theirs to edit.

## Slices

One row is one slice. Until the GitHub issues exist, Status is local. After Publish, the project board is the status, and this table keeps the issue number.

| # | Screen | Data | Status | Issue |
| --- | --- | --- | --- | --- |
| 0 | App shell: navigation, user picker, placeholders, database, seed | Database | planned | |
| 1 | Settings · Users | Database | planned | |
| 2 | Settings · Properties | Database | planned | |
| 3 | Settings · Policy management | Database | planned | |
| 4 | Settings · Property groups | Database | planned | |
| 5 | Settings · Integrations | Database | planned | |
| 6 | Settings · General | Database | planned | |
| 7 | Settings · Billing & payment | Database | planned | |
| 8 | People & animals | JSON file, read-only | planned | |

Integrations stores connection records only. Billing stores the plan, the payment method, and the invoices only.

## Placeholders

Dashboard, Open items, and Account are empty pages in the navigation. They get JSON data after the settings slices.

## Out of scope

- Deployment
- Real login, real property-management calls, and real payments
- Writes to People & animals
