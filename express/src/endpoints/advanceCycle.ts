import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getUser } from '../service/getUser'
import { advanceCycle } from '../service/advanceCycle'
import { Role } from '../models/role'
import { setWinner } from '../service/updateRoom'

export async function advanceCycleEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { roomId, andKillUserId } = req.body as {
    roomId: string
    andKillUserId?: string | null | undefined
  }
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const room = await getRoom(roomId)
  if (!room.memberIds.includes(user.userId)) {
    return res.json({ error: 'not member' })
  }

  if (andKillUserId) {
    /// Vote during the day
    room.diedTonight.push(andKillUserId)

    if (room.lovers.includes(andKillUserId)) {
      room.lovers.forEach((loverId) => {
        if (!room.diedTonight.includes(loverId)) room.diedTonight.push(loverId)
      })
    }

    if (room.givenRoles?.[andKillUserId] === Role[Role.JESTER]) setWinner(room, 'JESTER')
  }
  await advanceCycle(room)

  res.json({ room })
}
