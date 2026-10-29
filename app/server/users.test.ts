import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { createApp, resetDatabase } from './app.ts'

const seededUsers = [
  {
    id: 'dwight',
    name: 'Dwight Schrute',
    initials: 'DS',
    role: 'Org Admin',
    properties: [],
  },
  {
    id: 'pam',
    name: 'Pam Beesly',
    initials: 'PB',
    role: 'Property Manager',
    properties: ['Clear Creek Meadows', 'Metro Lofts — Austin'],
  },
  {
    id: 'kevin',
    name: 'Kevin Malone',
    initials: 'KM',
    role: 'Property Manager',
    properties: ['Renaissance Terrace'],
  },
]

describe('GET /api/users', () => {
  beforeAll(() => {
    const directory = mkdtempSync(join(tmpdir(), 'ltr-users-'))
    process.env.DATABASE_PATH = join(directory, 'app.sqlite')
    resetDatabase()
  })

  it('returns the seeded users for Dwight, Pam, and Kevin', async () => {
    const app = createApp()

    for (const id of ['dwight', 'pam', 'kevin']) {
      const response = await app.request('/api/users', {
        headers: { 'X-User-Id': id },
      })
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual(seededUsers)
    }
  })

  it('refuses an unknown user and a missing user', async () => {
    const app = createApp()

    const refused = [
      await app.request('/api/users', { headers: { 'X-User-Id': 'samantha' } }),
      await app.request('/api/users'),
    ]
    for (const response of refused) {
      expect(response.status).toBe(401)
      const body = await response.text()
      expect(body).not.toContain('Dwight Schrute')
      expect(body).not.toContain('Pam Beesly')
      expect(body).not.toContain('Kevin Malone')
    }
  })
})
