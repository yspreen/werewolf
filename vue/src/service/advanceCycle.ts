import { api } from './api'
import { store } from './store'

export async function advanceCycle(andKillUserId: string | null = null) {
  if (!store.room) return
  store.room.nightCycle += 1
  store.room.v += 1
  await api.post('/advance-cycle', {
    roomId: store.room.roomId,
    andKillUserId,
    currentCycle: store.room.nightCycle - 1
  })
}
