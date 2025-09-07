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
};
