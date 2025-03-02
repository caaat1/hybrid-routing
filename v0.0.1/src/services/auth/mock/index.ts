// src\services\auth\mock\index.ts

export default function authenticate(
  username: string,
  password: string,
): {
  success: boolean
  user: {username: string; password: string} | undefined
  message: string
} {
  // Define mock credentials
  const mockUser = {username: 'user', password: 'pass'}

  if (username === mockUser.username && password === mockUser.password) {
    return {success: true, user: mockUser, message: 'User logged in'}
  } else {
    return {success: false, user: undefined, message: 'Invalid credentials'}
  }
}
