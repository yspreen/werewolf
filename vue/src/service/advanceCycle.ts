import { api } from './api'
import { store } from './store'

export async function advanceCycle(andKillUserId: string | null = null) {
  await api.post('/advance-cycle', { roomId: store.room?.roomId, andKillUserId })
}
