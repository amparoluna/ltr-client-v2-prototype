import { Hono } from 'hono'
import { can } from './can.ts'
import { listUsers } from './db/database.ts'

export { resetDatabase } from './db/database.ts'

export function createApp() {
  const app = new Hono()

  app.get('/api/users', (c) => {
    const id = c.req.header('X-User-Id')
    const records = listUsers()
    const user = records.find((record) => record.id === id)
    if (!can(user, 'listUsers', undefined)) return c.text('', 401)
    return c.json(records)
  })

  return app
}
