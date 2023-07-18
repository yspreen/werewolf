import express, { Request, Response } from 'express'
import { getRoomsEndpoint } from './endpoints/getRooms'
import { init as redisInit } from './service/redis'
import { newRoom } from './endpoints/newRoom'
import { setName } from './endpoints/setName'
import { whoAmI } from './endpoints/whoAmI'
import bodyParser from 'body-parser'
import { getRoomEndpoint } from './endpoints/getRoom'
import { getUserEndpoint } from './endpoints/getUser'
import { startGame } from './endpoints/startGame'
import { advanceCycleEndpoint } from './endpoints/advanceCycle'
import { werewolfEndpoint } from './endpoints/werewolf'
import { join } from './endpoints/join'
import { updateRoomEndpoint } from './endpoints/updateRoom'
import { witchEndpoint } from './endpoints/witch'
import { hunterEndpoint } from './endpoints/hunter'
import { cupidEndpoint } from './endpoints/cupid'
export const app = express()

export async function init() {
  app.use(bodyParser.json())
  // CORS middleware
  app.use((req: Request, res: Response, next: () => void) => {
    res.header('Access-Control-Allow-Origin', req.header('origin'))
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    const headers = 'Origin, X-Requested-With, Content-Type, Accept, X-Session'
    res.header('Access-Control-Allow-Headers', headers)
    res.header('Access-Control-Expose-Headers', headers)
    next()
  })

  app.get('/', async (_: Request, res: Response) => {
    await new Promise((r) => setTimeout(r, 50))
    res.send('hi')
  })
  app.get('/rooms', getRoomsEndpoint)
  app.post('/rooms', newRoom)
  app.post('/name', setName)
  app.get('/whoami', whoAmI)
  app.get('/room/:roomId', getRoomEndpoint)
  app.get('/user/:userId', getUserEndpoint)
  app.post('/start-game', startGame)
  app.post('/advance-cycle', advanceCycleEndpoint)
  app.post('/werewolf', werewolfEndpoint)
  app.post('/join', join)
  app.post('/update-room', updateRoomEndpoint)
  app.post('/witch-action', witchEndpoint)
  app.post('/hunter', hunterEndpoint)
  app.post('/cupid', cupidEndpoint)

  await redisInit()
}
