# Scope

Status: draft, not approved.

## Mission

Show engineers, product, and leadership how a small agentic factory produces a working LTR V2 client prototype. The prototype is the evidence; the factory is the subject. The first showing is a local demo, a few days out.

## The product

A property-manager web app, rebuilt from scratch in this repository. The dev-hub prototype at `dev-hub/apps/ltr-v2-client-prototype` is reference only: screens, copy, and seed data can be mined from it, and no code is imported from it.

Data survives a browser session and a server restart because it lives in a database.

## Users

No passwords. A user picker selects who is acting, and every write is saved under that user.

| Seeded user | Role | Properties |
| --- | --- | --- |
| One Org admin | Org admin | All properties, including ones added later |
| One Property manager admin | Property manager admin | An assigned list |

The Org admin edits every settings screen, including every policy.

The Property manager admin edits only the properties assigned to them, and only the groups assigned to them directly. A group that merely contains one of their properties is not theirs to edit.

These screens are read-only for the Property manager admin: General, Integrations, Users, Billing, and Policy management. Policy fields are read-only for them on every screen.

## In scope

Each item is one slice. Until the GitHub issues exist, Status is the local stand-in. After Publish in the production plan, the project board is the status other people see, and this table keeps the issue number instead.

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

Integrations stores connection records only. It never calls Yardi or Entrata. Billing stores plan, payment-method, and invoice records only. It never charges anything.

## Placeholders

Dashboard, Open items, and Account appear in the navigation and open an empty page that says so. They get JSON data after the settings flows are done.

## Out of scope

- Deployment, dev-hub, and any hosted environment
- Real authentication
- Real PMS integration and real payments
- Writes to People & animals

## Decided

- Org-wide screens are read-only for the Property manager admin, not hidden.
- A group is editable only when it is assigned to that user directly.
- Only the Org admin can change policy: templates, locks, custom rules, and a property's policy fields.
