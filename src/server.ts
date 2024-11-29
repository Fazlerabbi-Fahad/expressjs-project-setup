import mongoose from 'mongoose'
import app from './app'
import { Server } from 'http'
import config from './config'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})
let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch {
    errorlogger.error('Failed to connect database', config.port)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
