import { api } from './api'
import { store } from './store'

export async function advanceCycle(andKillUserId: string | null = null) {
  if (!store.room) return
  const currentCycle = store.room.nightCycle
  store.room.nightCycle += 0.1
  store.room.v += 1
  await api.post('/advance-cycle', {
    roomId: store.room.roomId,
    andKillUserId,
    currentCycle
  })
}
