import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getRoom } from '../service/getRoom'
import { Role } from '../models/role'
import { advanceCycle } from '../service/advanceCycle'

export async function werewolfEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { roomId, userId } = req.body as {
    roomId: string
    userId: string
  }
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const room = await getRoom(roomId)
  if (!room.memberIds.includes(user.userId)) {
    return res.json({ error: 'not member' })
  }
  if (room.givenRoles?.[user.userId] !== Role[Role.WEREWOLF]) {
    return res.json({ error: 'not werewolf' })
  }

  if (!room.skipOneWerewolfNight) room.diedTonight.push(userId)
  room.skipOneWerewolfNight = room.givenRoles[userId] === Role[Role.DISEASED]

  await advanceCycle(room, user)

  res.json({ room })
}
