import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getUser } from '../service/getUser'
import { updateRoom } from '../service/updateRoom'
export async function leaveRoomEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { roomId } = req.body
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const room = await getRoom(roomId)
  room.memberIds = room.memberIds.filter((userId) => userId !== user.userId)

  await updateRoom(room)

  res.json({ room })
}
