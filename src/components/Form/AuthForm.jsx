import React, { useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  // user auth state management
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI alert
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

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
    setAlertMessage("");
    setAlertOpen(false);

    try {
      await login(email, password);
      setAlertOpen(true);
      setAlertSeverity("success");
      setAlertMessage("Login successful!");
      console.log("login success:");

      // redirect to home page
      setTimeout(() => navigate("/gallery"), 1500);
    } catch (err) {
      setAlertMessage("Invalid email or password");
      setAlertOpen(true);
    }
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
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              sign in
            </Typography>
            <Box sx={{ pl: 1 }}>
              <Typography
                component="span"
                sx={{
                  textTransform: "capitalize",
                  pr: 0.5,
                  fontSize: "14px",
                }}
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
