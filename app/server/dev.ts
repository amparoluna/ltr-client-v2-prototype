import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { serve } from '@hono/node-server'
import { createApp } from './app.ts'
import { databasePath, resetDatabase } from './db/database.ts'

if (!existsSync(databasePath())) resetDatabase()

const port = Number(process.env.PORT ?? 3001)
serve({ fetch: createApp().fetch, port }, () => {
  console.log(`api listening on ${port}`)
})

const appRoot = fileURLToPath(new URL('..', import.meta.url))
const vite = spawn(fileURLToPath(new URL('../node_modules/.bin/vite', import.meta.url)), [], {
  cwd: appRoot,
  stdio: 'inherit',
})

function stop() {
  vite.kill('SIGTERM')
  process.exit(0)
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
