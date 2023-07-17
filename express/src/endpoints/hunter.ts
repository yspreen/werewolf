import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getRoom } from '../service/getRoom'
import { Role } from '../models/role'
import { advanceCycle } from '../service/advanceCycle'

export async function hunterEndpoint(req: Request, res: Response) {
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
  if (room.givenRoles?.[user.userId] !== Role[Role.HUNTER]) {
    return res.json({ error: 'not hunter' })
  }

  room.diedTonight.push(userId)

  await advanceCycle(room)

  res.json({ room })
}
