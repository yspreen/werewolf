import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'

export async function getRoomEndpoint(req: Request, res: Response) {
  const ids = await getCleanRoomIds()
  const { roomId } = req.params
  if (!ids.includes(roomId)) {
    return res.json({ room: { memberIds: [] } })
  }
  const room = await getRoom(roomId)
  res.json({ room })
}
