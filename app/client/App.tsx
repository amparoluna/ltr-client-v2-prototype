import { Badge } from '@petscreeninginc/fido-ui/badge'
import { Button } from '@petscreeninginc/fido-ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@petscreeninginc/fido-ui/dialog'
import { Input } from '@petscreeninginc/fido-ui/input'
import {
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Grid2X2,
  LayoutDashboard,
  Link2,
  ListChecks,
  Settings,
  SlidersHorizontal,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { Logo } from './Logo'

const storageKey = 'ltr-user-id'

type User = {
  id: string
  name: string
  initials: string
  role: string
  properties: string[]
}

type Screen =
  | 'dashboard'
  | 'open-items'
  | 'people'
  | 'account'
  | 'general'
  | 'integrations'
  | 'policy'
  | 'groups'
  | 'properties'
  | 'users'
  | 'billing'

type NavItem = {
  id: Screen
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

const primaryNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'open-items', label: 'Open items', icon: ListChecks },
  { id: 'people', label: 'People & animals', icon: Users },
]

const settingsNav: NavItem[] = [
  { id: 'general', label: 'General', icon: SlidersHorizontal },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'policy', label: 'Policy management', icon: BookOpen },
  { id: 'groups', label: 'Property groups', icon: Grid2X2 },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'users', label: 'Users', icon: CircleUserRound },
  { id: 'billing', label: 'Billing & payment', icon: CreditCard },
]

const screenLabel: Record<Screen, string> = {
  dashboard: 'Dashboard',
  'open-items': 'Open items',
  people: 'People & animals',
  account: 'Account',
  general: 'General',
  integrations: 'Integrations',
  policy: 'Policy management',
  groups: 'Property groups',
  properties: 'Properties',
  users: 'Users',
  billing: 'Billing & payment',
}

function assignment(user: User) {
  if (user.properties.length === 0) return user.role
  return `${user.role} · ${user.properties.join(', ')}`
}

function readStoredUserId() {
  return localStorage.getItem(storageKey) ?? 'dwight'
}

export function App() {
  const [userId, setUserId] = useState(readStoredUserId)
  const [users, setUsers] = useState<User[]>([])
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [impersonateOpen, setImpersonateOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pendingId, setPendingId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/users', { headers: { 'X-User-Id': userId } })
      .then(async (response) => {
        if (!response.ok) throw new Error('The user list was refused.')
        return response.json() as Promise<User[]>
      })
      .then((records) => {
        if (cancelled) return
        setUsers(records)
        if (!records.some((user) => user.id === userId)) {
          localStorage.setItem(storageKey, 'dwight')
          setUserId('dwight')
        }
      })
    return () => {
      cancelled = true
    }
  }, [userId])

  const selected = users.find((user) => user.id === userId)
  const signedIn = users.find((user) => user.role === 'Org Admin')
  const pending = users.find((user) => user.id === pendingId) ?? null
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return users
    return users.filter((user) => `${user.name} ${assignment(user)}`.toLowerCase().includes(needle))
  }, [query, users])

  function chooseUser(id: string) {
    localStorage.setItem(storageKey, id)
    setUserId(id)
    setPendingId(null)
    setQuery('')
    setImpersonateOpen(false)
    setMenuOpen(false)
  }

  function openScreen(next: Screen) {
    setScreen(next)
    setMenuOpen(false)
    if (settingsNav.some((item) => item.id === next)) setSettingsOpen(true)
    if (next === 'account' || primaryNav.some((item) => item.id === next)) setSettingsOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Logo className="brand-logo" role="img" aria-label="PetScreening" />
        </div>
        <nav className="nav" aria-label="Primary navigation">
          {settingsOpen ? (
            <>
              <button type="button" className="nav-back" onClick={() => setSettingsOpen(false)}>
                <ChevronLeft size={17} strokeWidth={1.7} />
                <span>Settings</span>
              </button>
              {settingsNav.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={screen === item.id ? 'page' : undefined}
                    onClick={() => openScreen(item.id)}
                  >
                    <Icon size={17} strokeWidth={1.7} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </>
          ) : (
            <>
              {primaryNav.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={screen === item.id ? 'page' : undefined}
                    onClick={() => openScreen(item.id)}
                  >
                    <Icon size={17} strokeWidth={1.7} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
              <button type="button" onClick={() => setSettingsOpen(true)}>
                <Settings size={17} strokeWidth={1.7} />
                <span>Settings</span>
                <ChevronRight size={15} />
              </button>
            </>
          )}
        </nav>
        <div className="sidebar-footer">
          {menuOpen && (
            <div className="menu" role="menu">
              <button type="button" role="menuitem" onClick={() => openScreen('account')}>Account</button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  setImpersonateOpen(true)
                }}
              >
                Impersonate user
              </button>
            </div>
          )}
          <button
            type="button"
            className="user-trigger"
            aria-label={selected ? `Account menu for ${selected.name}` : 'Account menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="user-avatar">{selected?.initials ?? 'DS'}</span>
            <span className="user-copy">
              <strong>{selected?.name ?? 'Dwight Schrute'}</strong>
              <small>{selected ? assignment(selected) : 'Org Admin'}</small>
            </span>
          </button>
        </div>
      </aside>
      <div className="main-column">
        {selected && signedIn && selected.id !== signedIn.id && (
          <div className="impersonation-banner" role="status">
            <p>
              <strong>Viewing as {selected.name}</strong>
              <span>Signed in as {signedIn.name}</span>
            </p>
            <button type="button" onClick={() => chooseUser(signedIn.id)}>Exit impersonation</button>
          </div>
        )}
        <main className="page">
          <h1>{screenLabel[screen]}</h1>
        </main>
        <footer>
          <div>
            <a href="https://www.petscreening.com/resources" target="_blank" rel="noreferrer">Resources</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a className="support-link" href="mailto:clientsupport@petscreening.com">Email us at clientsupport@petscreening.com</a>
          </div>
          <span>© PetScreening, Inc. All Rights Reserved.</span>
        </footer>
      </div>
      <Dialog
        open={impersonateOpen}
        onOpenChange={(open) => {
          setImpersonateOpen(open)
          if (!open) {
            setQuery('')
            setPendingId(null)
          }
        }}
      >
        <DialogContent>
          {pending ? (
            <>
              <DialogHeader>
                <DialogTitle>Continue as {pending.name}?</DialogTitle>
                <DialogDescription>
                  You'll see the portal exactly as {pending.name} does until you exit impersonation.
                </DialogDescription>
              </DialogHeader>
              <div className="pending-user">
                <span className="user-avatar">{pending.initials}</span>
                <span className="user-copy">
                  <strong>{pending.name}</strong>
                  <small>{assignment(pending)}</small>
                </span>
              </div>
              <DialogFooter>
                <Button color="primary" shade="dark" onClick={() => chooseUser(pending.id)}>Continue</Button>
                <Button color="neutral" shade="light" onClick={() => setPendingId(null)}>Back</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Impersonate a user</DialogTitle>
                <DialogDescription>Choose who you want to view as.</DialogDescription>
              </DialogHeader>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name or role"
                aria-label="Search users"
              />
              <ul className="user-list">
                {matches.map((user) => {
                  const current = user.id === userId
                  const content = (
                    <>
                      <span className="user-avatar">{user.initials}</span>
                      <span className="user-copy">
                        {current && <Badge color="success" shade="light" size="sm">Current</Badge>}
                        <strong>{user.name}</strong>
                        <small>{assignment(user)}</small>
                      </span>
                    </>
                  )
                  return (
                    <li key={user.id}>
                      {current ? (
                        <div className="current-user" aria-current="true">{content}</div>
                      ) : (
                        <button type="button" onClick={() => setPendingId(user.id)}>{content}</button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
