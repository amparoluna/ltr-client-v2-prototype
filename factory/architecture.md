# Architecture

Status: draft, not approved. This is the factory's first core asset: the pieces of the app and how they connect. A slice that needs a new piece or a new connection changes this file first.

## Pieces

```
browser ──► web client ──/api──► API server ──► SQLite file
                                     │
                                     └──► people.json (read-only)
```

| Piece | What it is | Lives in |
| --- | --- | --- |
| Web client | React single-page app, built with Vite, styled with Fido UI | `app/client/` |
| API server | One Node HTTP server; every read and write goes through it | `app/server/` |
| Database | One SQLite file on disk, accessed through Drizzle ORM | `app/data/` (file gitignored) |
| Schema and seed | Drizzle schema, migrations, and the seed script | `app/server/db/` |
| Mock data | `people.json` for People & animals | `app/server/mock/` |
| Fido UI | Vendored copy of PetScreening's component library | `app/vendor/fido-ui/` |

SQLite keeps the local demo to one process and no running database service. Drizzle keeps a later move to Postgres to a driver and schema-dialect change.

## Connections

- The client never reads the database or the JSON file. It calls `/api/...` only.
- In development, Vite serves the client and proxies `/api` to the API server. One command starts both.
- The user picker stores the chosen user id in the browser. The client sends it on every request as the `X-User-Id` header.
- The server decides what the user may do. Each route loads the user, then checks role and property assignment before reading or writing. The client hides controls the user cannot use, and that is only a display choice.

## Access rules

| Role | Properties | Can edit |
| --- | --- | --- |
| Org admin | All, including ones added later | Every settings screen, including every policy |
| Property manager admin | Assigned list | Assigned properties, and groups assigned directly. General, Integrations, Users, Billing, and Policy management are read-only. Policy fields are read-only on every screen |

An access check is one server function, `can(user, action, record)`, used by every route. Rules live in that function only.

## Conventions

- Package manager: pnpm 9.12.2, run as `npx pnpm@9.12.2` if pnpm is not installed. Fido UI's workspace needs pnpm.
- Language: TypeScript on client and server.
- A change to the database is a Drizzle migration. The seed script resets the file to the seeded users and records.
- Tests: Vitest, run from `app/`. Each slice adds API tests for its persistence and its access rule.
- Reference only: `/Users/amparoluna/Projects/dev-hub/apps/ltr-v2-client-prototype/src`. Copy markup, copy, and seed values from it. Do not import from it.

## Open until slice 0

- The SQLite driver for Node 26. Slice 0 picks one that installs here and records the choice in this file.
- The HTTP framework for the API server. Slice 0 picks one and records it here.
