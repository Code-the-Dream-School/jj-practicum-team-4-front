import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const handleAuthChange = (e) => {
    const { value, name } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", userFormData);
  };

  const handleGoogleLogin = () => {};
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: "600px", width: "100%" }}>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{ textTransform: "uppercase" }}
            >
              sign in
            </Typography>
            <Box sx={{ mb: 5, pl: 1 }}>
              <Typography
                component="span"
                sx={{ textTransform: "capitalize", pr: 0.5, fontSize: "14px" }}
              >
                new user?
              </Typography>
              <Typography
                component="a"
                href="sign-up"
                color="textSecondary"
                sx={{ fontWeight: "bold", fontSize: "14px" }}
              >
                Create an account
              </Typography>
            </Box>
          </Box>
          <Box
            onSubmit={handleAuthSubmit}
            component="form"
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              onChange={handleAuthChange}
              type="email"
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={handleAuthChange}
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              // onSubmit={handleAuthSubmit}
              type="submit"
              variant="contained"
              size="large"
              sx={{ textTransform: "capitalize", mt: 3 }}
            >
              sign in
            </Button>
          </Box>
          <Divider sx={{ color: "grey" }}>or</Divider>
          <Box sx={{ mt: 5, justifySelf: "center" }}>
            <Button
              variant="outlined"
              sx={{ py: 1, px: 5, textTransform: "none", fontSize: 18 }}
              onClick={handleGoogleLogin}
            >
              <Avatar
                alt="Google Icon"
                src="src\assets\images\googleIcon.png"
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              Continue with Google
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default AuthForm;
