import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getRoom } from '../service/getRoom'
import { Role } from '../models/role'
import { updateRoom } from '../service/updateRoom'

export async function witchEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const { roomId, userId, action } = req.body as {
    roomId: string
    userId: string
    action: 'heal' | 'kill'
  }

  const room = await getRoom(roomId)

  if (!room.givenRoles) return
  if ((room.givenRoles[user.userId] ?? '') !== Role[Role.WITCH]) res.send({})

  if (action === 'heal') {
    if (room.witchPotions[0] <= 0) res.send({})
    room.witchPotions[0] -= 1
    room.diedTonight = room.diedTonight.filter((died) => died !== userId)
  }
  if (action === 'kill') {
    if (room.witchPotions[1] <= 0) res.send({})
    room.witchPotions[1] -= 1
    if (!room.diedTonight.includes(userId)) room.diedTonight.push(userId)
  }

  if (Math.max(room.witchPotions[0], room.witchPotions[1]) <= 0)
    room.givenRoles[user.userId] = Role[Role.VILLAGER]

  await updateRoom(room)

  res.send({})
}
