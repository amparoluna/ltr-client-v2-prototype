# Scope

Status: approved.

## Mission

Show engineers, product, and leadership a small factory producing a working LTR V2 client prototype. The prototype is the evidence. The first showing is a local demo.

## Product

A property-manager web app, rebuilt in this repository. Saved data lives in a database and survives a restart.

`dev-hub/apps/ltr-v2-client-prototype` is reference only. Copy its screens, copy, and seed data. Do not import its code. Do not branch, commit, or edit that repository.

## Users

A user picker, no passwords. Every write is stored under the selected user.

| Seed | Role | Can edit |
| --- | --- | --- |
| One Org Admin | Org Admin | Every settings screen, including policy. Every property, including ones added later |
| Two Property Managers | Property Manager | Assigned properties, and groups assigned directly |

The Property Manager can see General, Integrations, Users, Billing, and Policy management, and cannot edit them. Policy fields are read-only on every screen. A group that only contains one of their properties is not theirs to edit.

## Slices

One row is one slice. The project board is the status. This table keeps the order and the issue number.

| # | Screen | Data | Issue |
| --- | --- | --- | --- |
| 0 | App shell | Database | #1 |
| 1 | Settings · Users | Database | #2 |
| 2 | Settings · Properties table | Database | #3 |
| 3 | Settings · Add a property | Database | #4 |
| 4 | Settings · Property policy detail | Database | #5 |
| 5 | Settings · Locked policy items | Database | #6 |
| 6 | Settings · Policy templates | Database | #7 |
| 7 | Settings · Property policies | Database | #8 |
| 8 | Settings · Property groups list | Database | #9 |
| 9 | Settings · Property group changes | Database | #10 |
| 10 | Settings · Integrations | Database | #11 |
| 11 | Settings · General | Database | #12 |
| 12 | Settings · Billing & payment | Database | #13 |
| 13 | People & animals | JSON file, read-only | #14 |

Integrations stores connection records only. Billing stores the plan, the payment method, and the invoices only.

## Placeholders

Dashboard, Open items, and Account are empty pages in the navigation. They get JSON data after the settings slices.

## Out of scope

- Deployment
- Real login, real property-management calls, and real payments
- Writes to People & animals
