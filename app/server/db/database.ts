import { mkdirSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-sqlite'
import { migrate } from 'drizzle-orm/node-sqlite/migrator'
import { asRole } from '../can.ts'
import { users } from './schema.ts'

const migrationsFolder = fileURLToPath(new URL('./migrations', import.meta.url))

export function databasePath() {
  return process.env.DATABASE_PATH ?? fileURLToPath(new URL('../../data/app.sqlite', import.meta.url))
}

// Seed implements Saves. The seam test lists the API body separately.
const seedRows = [
  { id: 'dwight', name: 'Dwight Schrute', initials: 'DS', role: 'Org Admin', properties: '[]' },
  {
    id: 'pam',
    name: 'Pam Beesly',
    initials: 'PB',
    role: 'Property Manager',
    properties: JSON.stringify(['Clear Creek Meadows', 'Metro Lofts — Austin']),
  },
  {
    id: 'kevin',
    name: 'Kevin Malone',
    initials: 'KM',
    role: 'Property Manager',
    properties: JSON.stringify(['Renaissance Terrace']),
  },
]

export function openDatabase() {
  const path = databasePath()
  mkdirSync(dirname(path), { recursive: true })
  return drizzle(path)
}

export function resetDatabase() {
  const path = databasePath()
  rmSync(path, { force: true })
  const db = openDatabase()
  migrate(db, { migrationsFolder })
  db.insert(users).values(seedRows).run()
}

export function listUsers() {
  const db = openDatabase()
  return db.select().from(users).orderBy(sql`rowid`).all().map((row) => ({
    id: row.id,
    name: row.name,
    initials: row.initials,
    role: asRole(row.role),
    properties: JSON.parse(row.properties) as string[],
  }))
}
