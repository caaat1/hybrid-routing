// src/middleware/Session/index.ts

import MongoStore from 'connect-mongo'
import type {RequestHandler} from 'express'
import session from 'express-session'

const HOURS_IN_A_DAY = 24
const MINUTES_IN_AN_HOUR = 60
const SECONDS_IN_A_MINUTE = 60
const MILLISECONDS_IN_A_SECOND = 1000
const ONE_DAY_IN_MS =
  HOURS_IN_A_DAY *
  MINUTES_IN_AN_HOUR *
  SECONDS_IN_A_MINUTE *
  MILLISECONDS_IN_A_SECOND
export default class Session {
  static create(
    sessionOptions: Partial<session.SessionOptions> = {},
  ): RequestHandler {
    const sessionSecret = process.env['SESSION_SECRET']
    if (sessionSecret === undefined || sessionSecret.trim() === '') {
      throw new Error('SESSION_SECRET is not defined or is empty')
    }
    const mongoUri = process.env['MONGO_URI']
    if (mongoUri === undefined || mongoUri.trim() === '') {
      throw new Error('MONGO_URI is not defined or is empty')
    }
    const defaultOptions = {
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: mongoUri,
      }),
      cookie: {maxAge: sessionOptions.cookie?.maxAge ?? ONE_DAY_IN_MS},
    }
    return session({...defaultOptions, ...sessionOptions})
  }
}
