import { Role } from '../models/role'
import { CYCLE_COUNT, NightCycle, Room } from '../models/room'
import { checkWinner, ensureLoverKilled, updateRoom } from './updateRoom'

function removeCupid(room: Room) {
  if (!room.givenRoles) return
  if (room.nightCycle !== NightCycle.CUPID_WALK) return
  let cupidId: string | null = null
  room.memberIds.forEach((userId) => {
    if (room.givenRoles![userId] === Role[Role.CUPID]) cupidId = userId
  })
  if (!cupidId) return
  room.givenRoles[cupidId] = Role[Role.VILLAGER]
}
export async function advanceCycle(room: Room) {
  removeCupid(room)
  room.hunterDayKill = false
  ensureLoverKilled(room)

  if (room.nightCycle === NightCycle.LOVERS) {
    room.loversShown = true
  }
  if (room.nightCycle === NightCycle.DAY) {
    room.diedTonight.forEach((userId) => {
      if (!room.dead.includes(userId)) room.dead.push(userId)
    })
    room.diedTonight = []
  }
  room.nightCycle += 1
  if (room.nightCycle === NightCycle.THIEF && !hasThief(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.CUPID && !hasCupid(room)) room.nightCycle += 2
  if (room.nightCycle === NightCycle.LOVERS && !shouldShowLovers(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.SEER && !hasSeer(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.WITCH && !hasWitch(room)) room.nightCycle += 1
  if (room.nightCycle === NightCycle.HUNTER && !hunterDied(room)) room.nightCycle += 1
  if (room.nightCycle === CYCLE_COUNT) {
    room.nightCycle = NightCycle.DAY

    await checkWinner(room, true)
  }

  await updateRoom(room)
}

export function hasRole(room: Room, checkRole: Role): boolean {
  const roles = room.givenRoles ?? {}
  for (const userId of Object.keys(roles)) {
    if (room.dead.includes(userId)) continue
    const role = roles[userId]
    if (role == Role[checkRole]) return true
  }
  return false
}
export function hasThief(room: Room): boolean {
  return hasRole(room, Role.THIEF)
}
export function hasCupid(room: Room): boolean {
  return hasRole(room, Role.CUPID)
}
export function hasSeer(room: Room): boolean {
  return hasRole(room, Role.SEER)
}
export function hasWitch(room: Room): boolean {
  return hasRole(room, Role.WITCH)
}
export function hunterDied(room: Room): boolean {
  for (const died of room.diedTonight) {
    if (room.givenRoles?.[died] == Role[Role.HUNTER]) return true
  }
  return false
}
export function shouldShowLovers(room: Room): boolean {
  if (room.lovers.length && !room.loversShown) return true
  return false
}
