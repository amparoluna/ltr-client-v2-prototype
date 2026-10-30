export type Role = 'Org Admin' | 'Property Manager'

export type User = {
  id: string
  name: string
  initials: string
  role: Role
  properties: string[]
}

export function asRole(value: string): Role {
  if (value === 'Org Admin' || value === 'Property Manager') return value
  throw new Error(`Unknown role: ${value}`)
}

export function can(user: User | undefined, action: 'listUsers', record: unknown): boolean {
  if (!user) return false
  return action === 'listUsers'
}
