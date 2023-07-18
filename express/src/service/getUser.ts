import { Request, Response } from 'express'
import { uuid } from './uuid'
import { redis } from './redis'
import { USER_TTL_SECONDS } from './config'
import { updateUser } from './updateUser'
import { User, newUser } from '../models/user'

export async function getUserId(req: Request, res: Response): Promise<string> {
  let sessionId = req.headersDistinct['x-session']?.[0] ?? ''
  let userId = await redis.get(`session:${sessionId}`)

  if (!userId) {
    sessionId = uuid()
    userId = uuid()
    res.header('x-session', sessionId)
    await redis.set(`session:${sessionId}`, userId, { EX: USER_TTL_SECONDS })
    await updateUser(newUser(userId))
  }
  return userId
}

export async function getUser(req: Request, res: Response): Promise<User> {
  const userId = await getUserId(req, res)
  const userString = await redis.get(`user:${userId}:profile`)
  if (userString) return JSON.parse(userString)
  const user = newUser(userId)
  updateUser(user)
  return user
}

export async function findUser(userId: string): Promise<User> {
  return JSON.parse((await redis.get(`user:${userId}:profile`)) ?? JSON.stringify(newUser(userId)))
}
