import { Request, Response } from 'express'
import { getRoom } from '../service/getRoom'
import { getCleanRoomIds } from '../service/getCleanRoomIds'
import { getUser } from '../service/getUser'
import { addMember } from '../service/addMember'
export async function join(req: Request, res: Response) {
  const user = await getUser(req, res)

  const ids = await getCleanRoomIds()
  const { roomId } = req.body as {
    roomId: string
  }
  if (!ids.includes(roomId)) {
    return res.json({ error: 'room stale' })
  }

  const room = await addMember(roomId, user.userId)

  res.json({ room })
}
