# Architecture

Status: draft, not approved. The parts of the app and the paths between them. A slice that needs a new part, or a new path, adds it here before the code that uses it.

## Parts

```
browser ──► web client ──/api──► API server ──► SQLite file
                                     │
                                     └──► people.json (read-only)
```

| Part | What it is | Lives in |
| --- | --- | --- |
| Web client | React app, built with Vite, styled with Fido UI | `app/client/` |
| API server | One Node HTTP server. Every read and write goes through it | `app/server/` |
| Database | One SQLite file, through Drizzle | `app/data/` (gitignored) |
| Schema and seed | Drizzle schema, migrations, and the seed script | `app/server/db/` |
| Mock data | `people.json` for People & animals | `app/server/mock/` |
| Fido UI | Vendored copy of the component library | `app/vendor/fido-ui/` |

SQLite needs no separate database service. Drizzle keeps a later move to Postgres small.

## Paths

- The client calls `/api/...` only. It never reads the database or the JSON file.
- In development, one command starts Vite and the API server. Vite proxies `/api`.
- The user picker stores the chosen user id in the browser and sends it as the `X-User-Id` header.
- Who can edit what is in [scope.md](scope.md). The server enforces it in one function, `can(user, action, record)`, on every route. Hiding a control in the client is display only.

## Conventions

- pnpm 9.12.2. If `pnpm` is missing, run `npx pnpm@9.12.2`. Fido UI's workspace needs pnpm.
- TypeScript on the client and the server.
- A database change is a Drizzle migration. The seed script resets the file to the seeded records.
- Vitest, run from `app/`. Each slice adds API tests for what it saves and for who is refused.
- Reference only: `dev-hub/apps/ltr-v2-client-prototype`. Copy from it. Do not import from it.

## Open until slice 0

- Which SQLite driver installs on Node 26.
- Which HTTP framework the API server uses.

Slice 0 records both choices here.
