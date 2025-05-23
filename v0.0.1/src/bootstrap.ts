// FILE: src/bootstrap.ts
import dotenv from 'dotenv'
import pino from 'pino'

const logger = pino({
  level: 'info',
  base: null, // Removes default metadata (pid, hostname)
  timestamp: () => `,"time":"${new Date().toISOString()}"`, // ISO timestamps
})

dotenv.config()

if (process.env['NODE_ENV'] === 'dev') {
  await import('module-alias/register.js')
}

import app from './app'
import Db from './config/db/index'
import {defaults} from './defaults'

const SERVER_PORT = Number(process.env['SERVER_PORT'] ?? defaults.SERVER_PORT)
const db = new Db()

async function init(): Promise<void> {
  try {
    await db.connect()
    app.listen(SERVER_PORT, () => {
      logger.info(
        {
          port: SERVER_PORT,
          env: process.env['NODE_ENV'],
          pid: process.pid,
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          cpuUsage: process.cpuUsage(),
        },
        '[App] Server started',
      )
    })
  } catch (error) {
    logger.error(formatError(error), '[App] Critical startup error')
    process.exit(1)
  }
}

// Handle graceful shutdown
async function shutdown(): Promise<void> {
  logger.warn('[App] Gracefully shutting down...')
  try {
    await db.disconnect()
    logger.warn('[App] Cleanup complete. Exiting...')
    process.exit(0)
  } catch (error) {
    logger.error(formatError(error), '[App] Error during shutdown')
    process.exit(1)
  }
}

interface ErrorDetails {
  message?: string | undefined
  stack?: string | undefined
  cause?: ErrorDetails | undefined
}

function formatError(error: unknown): ErrorDetails {
  if (typeof error === 'object' && error !== null) {
    const err = error as ErrorDetails
    return {
      message: err.message ?? 'Unknown error',
      stack: err.stack ?? 'No stack trace available',
      cause: err.cause ? formatError(err.cause) : undefined,
    }
  }
  return {message: String(error)}
}

// Handle termination signals
;['SIGINT', 'SIGTERM'].forEach((signal) =>
  process.on(signal, () => {
    void shutdown().catch((error: unknown) => {
      logger.error(formatError(error), '[App] Error during shutdown')
      process.exit(1)
    })
  }),
)

void init()
