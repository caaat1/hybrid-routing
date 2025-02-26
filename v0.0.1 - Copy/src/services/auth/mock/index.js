// src\services\auth\mock\index.js
export default async function authenticate(username, password) {
  // Define mock credentials
  const mockUser = {username: 'user', password: 'pass'};

  if (username === mockUser.username && password === mockUser.password) {
    return {success: true, user: mockUser};
  } else {
    return {success: false, message: 'Invalid credentials'};
  }
}
