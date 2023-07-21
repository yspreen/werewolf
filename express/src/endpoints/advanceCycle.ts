import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getUser } from '../service/getUser'
import { advanceCycle } from '../service/advanceCycle'
import { Role } from '../models/role'
import { setWinner, updateRoom } from '../service/updateRoom'

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

    if (room.givenRoles?.[andKillUserId] === Role[Role.JESTER]) setWinner(room, 'JESTER')

    if (room.givenRoles?.[andKillUserId] === Role[Role.HUNTER]) {
      room.hunterDayKill = true
      await updateRoom(room)
      return res.json({ room })
    }
  }
  await advanceCycle(room)

  res.json({ room })
}
