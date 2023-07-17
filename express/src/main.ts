import { app, init } from './app'

const port = 3000

async function main() {
  await init()

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

main().catch(console.error)
