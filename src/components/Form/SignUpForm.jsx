import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
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
              create a new account
            </Typography>
            <Box sx={{ mb: 5, mt: 1, pl: 0.5 }}>
              <Typography
                component="span"
                sx={{ textTransform: "capitalize", pr: 0.5, fontSize: "14px" }}
              >
                already have an account?
              </Typography>
              <Typography
                component={Link}
                to="/sign-in"
                color="textSecondary"
                sx={{ fontWeight: "bold", fontSize: "14px" }}
              >
                login
              </Typography>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              pb: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                onChange={handleChange}
                type="text"
                name="firstName"
                required
                id="firstName"
                label="first name"
                variant="outlined"
                fullWidth
                sx={{ mb: 3, textTransform: "capitalize" }}
              />
              <TextField
                onChange={handleChange}
                type="text"
                name="lastName"
                required
                id="lastName"
                label="last name"
                variant="outlined"
                fullWidth
                sx={{ mb: 3, textTransform: "capitalize" }}
              />
            </Box>
            <TextField
              onChange={handleChange}
              type="email"
              name="email"
              required
              id="email"
              label="Email"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={handleChange}
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
              type="submit"
              variant="contained"
              size="large"
              sx={{ textTransform: "capitalize", mt: 3 }}
            >
              create account
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default SignUpForm;
