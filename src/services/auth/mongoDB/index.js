// Relative path: "src\services\auth\mongoDB\index.js"
import {findOne} from '../../../models/mongoDB/User.js'; // Import the User model

export default async function authenticate(username, password) {
  try {
    console.log(`Authenticating user: ${username}`);
    const user = await findOne({username});
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
