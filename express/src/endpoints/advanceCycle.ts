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
  const { roomId, andKillUserId, currentCycle } = req.body as {
    roomId: string
    andKillUserId?: string | null | undefined
    currentCycle?: number | null | undefined
  }
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const room = await getRoom(roomId)
  if (!room.memberIds.includes(user.userId)) {
    return res.json({ error: 'not member' })
  }
  if ((currentCycle ?? null) !== null && room.nightCycle !== currentCycle) {
    return res.json({ error: 'stale cycle' })
  }

  if (andKillUserId) {
    /// Vote during the day
    room.diedTonight.push(andKillUserId)

    if (room.givenRoles?.[andKillUserId] === Role[Role.JESTER]) setWinner(room, 'JESTER')

    let hunterKilled = room.givenRoles?.[andKillUserId] === Role[Role.HUNTER]
    if (room.lovers.includes(andKillUserId)) {
      const otherLover = room.lovers.filter((val) => val !== andKillUserId)[0]
      if (room.givenRoles?.[otherLover] === Role[Role.HUNTER]) hunterKilled = true
    }

    if (hunterKilled) {
      room.hunterDayKill = true
      await updateRoom(room)
      return res.json({ room })
    }
  }
  await advanceCycle(room)

  res.json({ room })
}
