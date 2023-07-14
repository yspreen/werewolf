import type { User } from '@/models/user'
import { store } from './store'
import { api } from './api'

export async function loadUser(noReload: boolean = false): Promise<User | null> {
  if (store.user?.name) return store.user

  store.user = await api.get('/whoami')
  if (noReload) return store.user

  if (!store.user?.name) window.location.href = '/'

  return store.user
}
