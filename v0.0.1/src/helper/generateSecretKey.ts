import {randomBytes} from 'crypto'

const KEY_LENGTH = 64
const secretKey = randomBytes(KEY_LENGTH).toString('hex')
console.log(secretKey) // Print the secret key
