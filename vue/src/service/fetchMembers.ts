import type { Room } from '@/models/room'
import { store } from './store'
import { api } from './api'

export async function fetchMembers(room: Room) {
  await Promise.all(
    room?.memberIds.map(async (memberId) => {
      if (store.users[memberId]) return
      store.users[memberId] = (await api.get(`/user/${memberId}`)).user
    }) ?? []
  )
}
