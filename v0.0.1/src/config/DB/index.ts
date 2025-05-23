// FILE: src/config/Db/index.ts
import mongoose from 'mongoose'

const RETRY_BASE_DELAY_MS = 5000
const DEFAULT_RETRY_COUNT = 3

export default class Db {
  async connect(retries = DEFAULT_RETRY_COUNT): Promise<void> {
    try {
      const mongoURI = process.env['MONGO_URI'] ?? ''
      if (mongoURI.trim() === '') {
        throw new Error('MONGO_URI is not defined')
      }
      await mongoose.connect(mongoURI)
      console.info('[MongoDB] connected successfully')
    } catch (error: unknown) {
      const errorMsg: string =
        error instanceof Error ? error.message : JSON.stringify(error)
      console.error(
        `[${new Date().toISOString()}] [MongoDB] Connection Error: ${errorMsg}`,
      )
      if (retries > 0) {
        console.warn(`[MongoDB] Retrying... (${retries} attempts left)`)
        await new Promise((res) => setTimeout(res, RETRY_BASE_DELAY_MS))
        return this.connect(retries - 1)
      } else {
        throw new Error('[MongoDB] connection failed after multiple retries')
      }
    }
    return void 0 // ✅ Explicitly returning undefined
  }
  async disconnect(retries = DEFAULT_RETRY_COUNT - 1): Promise<void> {
    try {
      if (
        mongoose.connection.readyState !==
        mongoose.ConnectionStates.disconnected
      ) {
        await mongoose.connection.close()
        console.info('[MongoDB] disconnected successfully')
      } else {
        console.log('[MongoDB] was already disconnected')
      }
    } catch (error) {
      console.error('[MongoDB] disconnecting error:', error)
      if (retries > 0) {
        console.warn(
          `[MongoDB] Retrying disconnection... (${retries} attempts left)`,
        )
        await new Promise((res) => setTimeout(res, RETRY_BASE_DELAY_MS))
        return this.disconnect(retries - 1)
      } else {
        throw new Error(
          '[MongoDB] disconnection failed after multiple attempts',
        )
      }
    }
    return void 0 // ✅ Explicitly returning undefined to satisfy Promise<void>
  }
}

// export default class Db {
//   private readonly connection: IDatabaseConnection

//   constructor(connection: IDatabaseConnection) {
//     this.connection = connection
//   }

//   async connect(): Promise<void> {
//     return this.connection.connect()
//   }

//   async disconnect(): Promise<void> {
//     return this.connection.disconnect()
//   }
// }

// export interface IDatabaseConnection {
//   connect(): Promise<void>
//   disconnect(): Promise<void>
// }

// import mongoose from 'mongoose'
// import { IDatabaseConnection } from './IDatabaseConnection'
// import pino from 'pino'

// const logger = pino({ level: 'info' })
// const DEFAULT_RETRY_COUNT = 3
// const RETRY_DELAY_MS = 5000

// export class MongoConnection implements IDatabaseConnection {
//   private readonly uri: string

//   constructor(uri: string) {
//     if (!uri.trim()) throw new Error('MONGO_URI is not defined')
//     this.uri = uri
//   }

//   async connect(retries = DEFAULT_RETRY_COUNT): Promise<void> {
//     try {
//       await mongoose.connect(this.uri)
//       logger.info('[MongoDB] Connected successfully')
//     } catch (error) {
//       logger.error('[MongoDB] Connection Error:', error)
//       if (retries > 0) {
//         logger.warn(`[MongoDB] Retrying in ${RETRY_DELAY_MS / 1000}s... (${retries} attempts left)`)
//         await new Promise((res) => setTimeout(res, RETRY_DELAY_MS))
//         return this.connect(retries - 1)
//       } else {
//         throw new Error('[MongoDB] Connection failed after multiple retries')
//       }
//     }
//   }

//   async disconnect(): Promise<void> {
//     try {
//       await mongoose.connection.close()
//       logger.info('[MongoDB] Disconnected successfully')
//     } catch (error) {
//       logger.error('[MongoDB] Error during disconnection:', error)
//       throw error
//     }
//   }
// }
// import dotenv from 'dotenv'
// import pino from 'pino'
// import app from './app'
// import Db from './config/Db/index'
// import { MongoConnection } from './config/Db/MongoConnection'
// import { IDatabaseConnection } from './config/Db/IDatabaseConnection'
// import { defaults } from './defaults'

// dotenv.config()

// const logger = pino({
//   level: 'info',
//   base: null, // Removes default metadata (pid, hostname)
//   timestamp: () => `,"time":"${new Date().toISOString()}"`, // ISO timestamps
// })

// const SERVER_PORT = Number(process.env['SERVER_PORT'] ?? defaults.SERVER_PORT)

// const mongoConnection: IDatabaseConnection = new MongoConnection(process.env['MONGO_URI'] ?? '')
// const db = new Db(mongoConnection) // Injected connection instance

// async function init(): Promise<void> {
//   try {
//     await db.connect()
//     app.listen(SERVER_PORT, () => {
//       logger.info(
//         {
//           port: SERVER_PORT,
//           env: process.env['NODE_ENV'],
//           pid: process.pid,
//           uptime: process.uptime(),
//           memoryUsage: process.memoryUsage(),
//         },
//         '[App] Server started',
//       )
//     })
//   } catch (error) {
//     logger.error(error, '[App] Critical startup error')
//     process.exit(1)
//   }
// }

// async function shutdown(): Promise<void> {
//   logger.warn('[App] Gracefully shutting down...')
//   try {
//     await db.disconnect()
//     logger.warn('[App] Cleanup complete. Exiting...')
//     process.exit(0)
//   } catch (error) {
//     logger.error(error, '[App] Error during shutdown')
//     process.exit(1)
//   }
// }

// // Handle termination signals
// ;['SIGINT', 'SIGTERM'].forEach((signal) =>
//   process.on(signal, () => {
//     void shutdown().catch((error) => {
//       logger.error(error, '[App] Error during shutdown')
//       process.exit(1)
//     })
//   }),
// )

// void init()
