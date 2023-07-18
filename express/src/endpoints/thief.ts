import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getRoom } from '../service/getRoom'
import { advanceCycle } from '../service/advanceCycle'

export async function thiefEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const { roomId, role } = req.body as {
    roomId: string
    role: string
  }

  const room = await getRoom(roomId)

  if (!room.givenRoles) return

  room.givenRoles[user.userId] = role
  room.thiefChoices = []

  await advanceCycle(room)

  res.send({})
}
