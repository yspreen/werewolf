import { Room } from '../models/room'
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

export async function updateRoom(room: Room) {
  ensureLoverKilled(room)
  await redis.set(`room:${room.roomId}:info`, JSON.stringify(room))
}
