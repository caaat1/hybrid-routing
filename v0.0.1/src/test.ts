import pino from 'pino'

const logger = pino({level: 'info'})
logger.info('This should be typed.')
