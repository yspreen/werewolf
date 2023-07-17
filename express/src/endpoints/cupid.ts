import { Request, Response } from 'express'
import { getUser } from '../service/getUser'
import { getRoom } from '../service/getRoom'
import { Role } from '../models/role'
import { advanceCycle } from '../service/advanceCycle'

export async function cupidEndpoint(req: Request, res: Response) {
  const user = await getUser(req, res)

  const { roomId, lovers } = req.body as {
    roomId: string
    lovers: string[]
  }

  const room = await getRoom(roomId)

  if (!room.givenRoles || room.givenRoles[user.userId] !== Role[Role.CUPID]) res.send({})

  room.lovers = lovers
  room.givenRoles![user.userId] = Role[Role.VILLAGER]
  await advanceCycle(room)

  res.send({})
}
