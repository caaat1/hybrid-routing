// src\services\auth\mock\index.ts

export default async function authenticate(username: string, password: string) {
  // Define mock credentials
  const mockUser = {username: 'user', password: 'pass'};

  if (username === mockUser.username && password === mockUser.password) {
    return {success: true, user: mockUser};
  } else {
    return {success: false, message: 'Invalid credentials'};
  }
}
