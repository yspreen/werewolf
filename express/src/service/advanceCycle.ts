import { Role } from '../models/role'
import { CYCLE_COUNT, NightCycle, Room } from '../models/room'
import { User } from '../models/user'
import { updateRoom } from './updateRoom'

export async function advanceCycle(room: Room, user: User) {
  if (room.nightCycle === NightCycle.DAY) {
    room.diedTonight.forEach((userId) => {
      if (!room.dead.includes(userId)) room.dead.push(userId)
    })
    room.diedTonight = []
  }
  room.nightCycle += 1
  if (room.nightCycle === NightCycle.THIEF && !hasThief(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.CUPID && !hasCupid(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.LOVERS && !shouldShowLovers(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.SEER && !hasSeer(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.WITCH && !hasWitch(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.HUNTER && !hunterDied(room)) room.nightCycle += 1
  if (room.nightCycle === CYCLE_COUNT) {
    room.nightCycle = NightCycle.DAY

    room.diedTonight.forEach((userId) => {
      /// Lover killed during the night. Can reveal now that night is over
      if (room.lovers.includes(userId)) {
        room.lovers.forEach((loverId) => {
          if (!room.diedTonight.includes(loverId)) room.diedTonight.push(loverId)
        })
      }
    })
  }

  await updateRoom(room)
}

export function hasThief(room: Room): boolean {
  const roles = room.givenRoles ?? {}
  for (const userId of Object.keys(roles)) {
    if (room.dead.includes(userId)) continue
    const role = roles[userId]
    if (role == Role[Role.THIEF]) return true
  }
  return false
}
export function hasCupid(room: Room): boolean {
  const roles = room.givenRoles ?? {}
  for (const userId of Object.keys(roles)) {
    if (room.dead.includes(userId)) continue
    const role = roles[userId]
    if (role == Role[Role.CUPID]) return true
  }
  return false
}
export function hasSeer(room: Room): boolean {
  const roles = room.givenRoles ?? {}
  for (const userId of Object.keys(roles)) {
    if (room.dead.includes(userId)) continue
    const role = roles[userId]
    if (role == Role[Role.SEER]) return true
  }
  return false
}
export function hasWitch(room: Room): boolean {
  const roles = room.givenRoles ?? {}
  for (const userId of Object.keys(roles)) {
    if (room.dead.includes(userId)) continue
    const role = roles[userId]
    if (role == Role[Role.WITCH]) return true
  }
  return false
}
export function hunterDied(room: Room): boolean {
  for (const died of room.diedTonight) {
    if (room.givenRoles?.[died] == Role[Role.HUNTER]) return true
  }
  return false
}
export function shouldShowLovers(room: Room): boolean {
  if (hasCupid(room) && !room.loversShown) return true
  return false
}
