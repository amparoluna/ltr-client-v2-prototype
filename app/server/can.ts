export type User = {
  id: string
  name: string
  initials: string
  role: string
  properties: string[]
}

export function can(user: User | undefined, action: 'listUsers'): boolean {
  if (!user) return false
  return action === 'listUsers'
}
