import { app, init } from './app'
import * as serverless from 'aws-serverless-express'

const binaryMimeTypes: string[] = []
const server = serverless.createServer(app, undefined, binaryMimeTypes)

let didInit = false

exports.handler = async (event: any, context: any) => {
  if (!didInit) {
    await init()
    didInit = true
  }
  return serverless.proxy(server, event, context, 'PROMISE').promise
}
