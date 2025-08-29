import React, { useEffect, useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getData } from "../../util";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function AuthForm() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  // console.log({ email, password });
  const handleAuthenticate = async (credentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await fetch(`${baseUrl}/auth/login`, options);
      if (!res.ok) {
        if (res.status === 401) {
          console.dir(res);
        }
        throw new Error(res.status);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
    console.log(`submitted - email: ${email}, password: ${password}`);
    handleAuthenticate({ email, password });
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
          height: "90vh",
          width: "100%",
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: "600px", width: "100%" }}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textTransform: "uppercase", fontWeight: "bold" }}
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
              pb: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              onChange={handleAuthChange}
              type="email"
              name="email"
              required={password}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <FormControl variant="outlined" required={email}>
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
              // disabled={isFormSubmit || (!email && !password)}
              type="submit"
              variant="contained"
              size="large"
              sx={{ textTransform: "capitalize", mt: 3 }}
            >
              {isFormSubmit ? "loading" : "sign in"}
            </Button>
          </Box>
          <Divider sx={{ color: "grey" }}>or</Divider>
          <Box sx={{ mt: 5, justifySelf: "center", width: "100%" }}>
            <Button
              variant="outlined"
              sx={{
                py: 1.5,
                width: "100%",
                textTransform: "none",
                fontSize: 18,
              }}
              onClick={handleGoogleLogin}
            >
              <Avatar
                alt="Google Icon"
                src="src/assets/images/googleIcon.png"
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
