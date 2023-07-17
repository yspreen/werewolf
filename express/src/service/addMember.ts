import { getRoom } from '../service/getRoom'
import { Room } from '../models/room'
import { Role } from '../models/role'
import { updateRoom } from './updateRoom'

export async function addMember(roomId: string, userId: string): Promise<Room> {
  const room = await getRoom(roomId)
  if (!room.memberIds.includes(userId)) room.memberIds.push(userId)

  if (Object.keys(room.roleCount).length) {
    /// add new villager / werewolf automatically
    const memberCount = room.memberIds.length
    const roleCount = Object.values(room.roleCount).reduce((a, b) => a + b, 0)
    const werewolfCount = room.roleCount[Role[Role.WEREWOLF]] ?? 0

    if (roleCount < memberCount) {
      let shouldHaveWerewolves = 2
      if (memberCount > 11) {
        shouldHaveWerewolves = 3
      }
      if (werewolfCount < shouldHaveWerewolves && memberCount - werewolfCount > 1) {
        room.roleCount[Role[Role.WEREWOLF]] += 1
      } else {
        room.roleCount[Role[Role.VILLAGER]] += 1
      }
    }
  }

  await updateRoom(room)
  return room
}
