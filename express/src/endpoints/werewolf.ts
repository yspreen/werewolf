import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getRoom } from '../service/getRoom'
import { Role } from '../models/role'
import { advanceCycle } from '../service/advanceCycle'
import { NightCycle } from '../models/room'

export async function werewolfEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { roomId, userId } = req.body as {
    roomId: string
    userId: string
  }
  if (!ids.includes(roomId)) {
    console.error('room stale')
    return res.json({ error: 'room stale' })
  }

  const room = await getRoom(roomId)
  if (!room.memberIds.includes(user.userId)) {
    console.error('not member')
    return res.json({ error: 'not member' })
  }
  if (room.nightCycle !== NightCycle.WEREWOLF) {
    console.error('wrong cycle')
    return res.json({ error: 'wrong cycle' })
  }
  if (room.givenRoles?.[user.userId] !== Role[Role.WEREWOLF]) {
    console.error('not werewolf')
    return res.json({ error: 'not werewolf' })
  }

  if (!room.skipOneWerewolfNight) room.diedTonight.push(userId)
  room.skipOneWerewolfNight = room.givenRoles[userId] === Role[Role.DISEASED]

  await advanceCycle(room)

  res.json({ room })
}
