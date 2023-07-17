import { app, init } from './app'
import * as serverless from 'aws-serverless-express'

const binaryMimeTypes: string[] = []
const server = serverless.createServer(app, undefined, binaryMimeTypes)

exports.handler = async (event: any, context: any) => {
  await init()
  return serverless.proxy(server, event, context, 'PROMISE').promise
}
