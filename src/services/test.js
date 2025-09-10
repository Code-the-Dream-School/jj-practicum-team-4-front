const testUsers = [
  { id: 1, name: "John Doe", email: "test@test.com", password: "password" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@test.com",
    password: "password123",
  },
];

export const testAuth = {
  login: async (email, password) => {
    console.log("mock login attempt:", { email, password });
    const user = testUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: `mock-jwt-token-${user.id}`,
    };

    console.log("mock login successful", userResponse);
    return userResponse;
  },

  register: async (userData) => {
    console.log("Mock register attempt:", userData);

    // check if user already exists
    const existedUser = testUsers.find((u) => u.email === userData.email);
    if (existedUser) {
      throw new Error("User already exists with this email");
    }

    // Simulate creating new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    // Add to test user obj
    testUsers.push(newUser);

    // Return user data w/o password
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: `mock-jwt-token-${newUser.id}`,
    };

    console.log("Mock registration successful", userResponse);
    return userResponse;
  },

  logout: async () => {
    console.log("Mock logout");

    console.log("mock logout successful");
    return { success: true };
  },
};

export const { login, register, logout } = testAuth;
