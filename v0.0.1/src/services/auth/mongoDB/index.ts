//src\services\auth\mongoDB\index.ts

import {User, IUser} from '../../../models/mongoDB/User.js'; // Import the User model and IUser interface

interface AuthResponse {
  success: boolean;
  user?: IUser;
  message?: string;
}

export default async function authenticate(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    console.log(`Authenticating user: ${username}`);
    const user = await User.findOne({username});
    console.log('User found:', user);
    if (user) {
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
      if (isMatch) {
        return {success: true, user};
      } else {
        return {success: false, message: 'Invalid credentials'};
      }
    } else {
      return {success: false, message: 'Invalid credentials'};
    }
  } catch (err) {
    console.error('Error during authentication:', err);
    return {success: false, message: 'An error occurred during authentication'};
  }
}
