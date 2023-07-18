import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getUser } from '../service/getUser'
import { updateRoom } from '../service/updateRoom'
import { Room } from '../models/room'
export async function updateRoomEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { room } = req.body as {
    room: Room
  }
  const { roomId } = room
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const oldRoom = await getRoom(roomId)
  if (!oldRoom.admins.includes(user.userId)) {
    return res.json({ error: 'not admin' })
  }

  room.v = oldRoom.v
  await updateRoom(room)

  res.json({ room })
}
