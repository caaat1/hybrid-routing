//src\services\auth\mongoDB\index.ts

import {User} from '../../../models/mongoDB/User.js'
import type {IUser} from '../../../models/mongoDB/User.js'

interface AuthResponse {
  success: boolean
  user?: Partial<IUser>
  message?: string
}

export default async function authenticate(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    console.log(`Authenticating user: ${username}`)
    const user: IUser | null = await User.findOne({username})

    console.log(`User found: ${user ? user.username : 'None'}`)

    if (!user || !(await user.comparePassword(password))) {
      return {success: false, message: 'Invalid credentials'}
    }

    // Sanitize user object
    /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_" }]*/
    const {password: _password, ...sanitizedUser} = user.toObject() as IUser // Rename `password` to `_password`
    return {success: true, user: sanitizedUser}
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Authentication error:', err.message)
    } else {
      console.error('Unknown authentication error:', err)
    }
    return {success: false, message: 'An error occurred during authentication'}
  }
}
