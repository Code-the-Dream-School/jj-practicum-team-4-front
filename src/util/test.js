export const testAuth = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@test.com" && password === "password") {
          resolve({ id: 1, name: "test user", email: email, is_admin: true });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },
};
