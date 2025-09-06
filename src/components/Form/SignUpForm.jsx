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
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  
  const { register, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setAlertSeverity("warning");
      setAlertMessage("Please fill in all required fields");
      setAlertOpen(true);
      console.log('Validation failed - missing fields:', 
        !formData.firstName ? 'firstName' : '',
        !formData.lastName ? 'lastName' : '',
        !formData.email ? 'email' : '',
        !formData.password ? 'password' : '');
      return;
    }
    
    // Password length validation
    if (formData.password.length < 6) {
      setAlertSeverity("warning");
      setAlertMessage("Password must be at least 6 characters long");
      setAlertOpen(true);
      console.log('Password validation failed - too short');
      return;
    }
    
    // Username character validation (letters, numbers, underscores, and dashes only)
    const nameRegex = /^[A-Za-z0-9_-]+$/;
    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      setAlertSeverity("warning");
      setAlertMessage("Names can only contain letters, numbers, underscores, or dashes (no spaces)");
      setAlertOpen(true);
      console.log('Name validation failed - invalid characters');
      return;
    }
    
    // Prepare user data for registration that matches backend expectations
    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password
    };
    
    console.log('Prepared user data for registration:', { ...userData, password: '***' });
    
    try {
      console.log('Sending registration request to:', '/auth/register');
      const result = await register(userData);
      console.log('Registration success response:', { success: !!result });
      
      setAlertSeverity("success");
      setAlertMessage("Registration successful!");
      setAlertOpen(true);
      
      // Redirect to home page after successful registration
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);
      
      setAlertSeverity("error");
      setAlertMessage(
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        "Registration failed. Please check your information and try again."
      );
      setAlertOpen(true);
    }
  };
  
  const handleCloseAlert = () => {
    setAlertOpen(false);
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
            onSubmit={handleSubmit}
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
              disabled={isLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.password}
              sx={{ textTransform: "capitalize", mt: 3 }}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUpForm;
