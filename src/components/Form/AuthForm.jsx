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
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { testAuth } from "../../services/test";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllData, getData } from "../../util";

const baseUrl = import.meta.env.VITE_API_URL;
const baseGoogleUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;

function AuthForm() {
  // user auth state management
  // const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // UI alert
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const navigate = useNavigate();
  // const { login } = useAuth();

  // TESTING TO GET USER DATA
  const getUsers = async () => {
    const allUsersData = await getAllData(`${baseUrl}/auth/user`);
    console.log(allUsersData);
  };
  useEffect(() => {
    getUsers();
  }, []);

  // const getGoogleUsers = async () => {
  //   const allUsersData = await getAllData(baseGoogleUrl);
  //   console.log(allUsersData);
  // };
  // useEffect(() => {
  //   getGoogleUsers();
  // }, []);

  const handleAuthChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    console.log(`submitted - email: ${email}, password: ${password}`);
    setIsLoading(true);
    setError("");
    setAlertMessage("");
    setAlertOpen(false);

    try {
      const user = await testAuth.login(email, password);
      // login(user);
      setAlertOpen(true);
      setAlertSeverity("success");
      setAlertMessage("Login successful!");
      console.log("login success:", user);

      // TODO: store this user in Context

      // redirect to home page
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
      setAlertMessage("Invalid email or password");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   testFetch();
  // }, []);

  // const testFetch = async () => {
  //   try {
  //     const res = await fetch(`${baseUrl}/auth/login`);
  //     if (!res.ok) {
  //       throw new Error(res.status);
  //     }
  //     const data = res.data;
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
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
              disabled={isLoading || (!email && !password)}
              type="submit"
              variant="contained"
              size="large"
              sx={{ textTransform: "capitalize", mt: 3 }}
            >
              {isLoading ? "Logging in..." : "sign in"}
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        // onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          // onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AuthForm;
