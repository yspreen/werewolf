import { Role } from '../models/role'
import { NightCycle, Room, WINNER } from '../models/room'
import { redis } from './redis'

export function ensureLoverKilled(room: Room) {
  room.diedTonight.forEach((userId) => {
    /// If one lover is killed all lovers are killed.
    if (room.lovers.includes(userId)) {
      room.lovers.forEach((loverId) => {
        if (!room.diedTonight.includes(loverId)) room.diedTonight.push(loverId)
      })
    }
  })
}

export function setWinner(room: Room, winner: WINNER) {
  room.winner = winner
  room.nightCycle = NightCycle.DAY
}

export async function checkWinner(room: Room, includeDeathsFromTonight: boolean) {
  if (room.winner) return setWinner(room, room.winner)

  const alive = room.memberIds.filter((userId) => {
    let dead = room.dead
    if (includeDeathsFromTonight) dead = dead.concat(room.diedTonight)
    return !dead.includes(userId)
  })
  const nonWerewolf = alive.filter((userId) => room.givenRoles?.[userId] !== Role[Role.WEREWOLF])

  if (
    alive.length &&
    alive.length === alive.filter((userId) => room.lovers.includes(userId)).length
  )
    return setWinner(room, 'LOVERS')

  if (!nonWerewolf.length) return setWinner(room, 'WEREWOLVES')

  if (nonWerewolf.length === alive.length) return setWinner(room, 'VILLAGERS')
}

export async function updateRoom(room: Room) {
  ensureLoverKilled(room)
  await checkWinner(room, false)
  await redis.set(`room:${room.roomId}:info`, JSON.stringify(room))
}
