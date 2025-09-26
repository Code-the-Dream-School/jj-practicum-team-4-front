import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Alert,
  CircularProgress,
  Skeleton,
  Snackbar,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const pages = [
  "home",
  "gallery",
  "best of artwork",
  "about",
  "challenge prompt",
];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, isAuthenticated, logout, isLoading, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isAuthenticated) {
      try {
        const decodeToken = jwtDecode(token);
        setIsAdmin(!!decodeToken.admin);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    } else {
      // Reset admin status when not authenticated
      setIsAdmin(false);
    }
  }, [token, isAuthenticated]);

  if (isLoading) {
    return (
      <Stack spacing={2} direction="row">
        <Skeleton variant="rectangular" width="100%" height={60} />
        <Skeleton variant="circular" width={60} height={60} />
      </Stack>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      setAnchorElUser(null);
      setIsAdmin(false);
      setAlertMessage("Logout Successfully!");
      setAlertOpen(true);
      setAlertSeverity("success");

      setTimeout(() => {
        (navigate("/"), setAlertOpen(false), setAlertMessage(null));
      }, 1000);
    } catch (error) {
      console.error("logout failed:", error);
      setAlertOpen(true);
      setAlertMessage("Logout failed");
      setAlertSeverity("error");

      setTimeout(() => {
        (setAlertOpen(false), setAlertMessage(null));
      }, 3000);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getPages = () => {
    if (!isAuthenticated) {
      return pages.slice(0, 4);
    }
    return isAdmin ? pages : pages.slice(0, 4);
  };
  const visiblePages = getPages();
  return (
    <>
      <AppBar>
        <Toolbar
          disableGutters
          sx={{ mx: 3, justifyContent: { xs: "space-between" } }}
        >
          <Box
            component="a"
            href="/"
            sx={{ pt: 1, mr: 1, order: { xs: 1, md: 0 } }}
          >
            <Box
              component="img"
              src="images\aRTHIVE\2.png"
              alt="Arthive Logo"
              sx={{
                height: "55px",
                width: "auto",
              }}
            />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {visiblePages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    color="primary"
                    component={Link}
                    to={page === "home" ? "/" : page.replaceAll(" ", "-")}
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {visiblePages.map((page) => (
              <Button
                component={Link}
                to={page === "home" ? "/" : page.replaceAll(" ", "-")}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isAuthenticated ? (
            <>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, order: { xs: 3, md: 0 } }}
                >
                  <Avatar
                    src={
                      user && (user.picture || user.avatar || user.profilePic)
                    }
                    alt={user && (user.first_name || user.fullName || "User")}
                    slotProps={{
                      onError: (e) => {
                        console.error(
                          "Avatar image failed to load:",
                          e.target.src
                        );
                        e.target.onerror = null; // Prevent infinite error loop
                        e.target.style.display = "none"; // Hide the broken image
                      },
                      onLoad: () =>
                        console.log("Avatar image loaded successfully"),
                    }}
                  >
                    {!user
                      ? "U"
                      : user.first_name
                        ? user.first_name.charAt(0).toUpperCase()
                        : user.fullName
                          ? user.fullName.charAt(0).toUpperCase()
                          : "U"}
                  </Avatar>
                  {/* Debug comment - Picture URL: {user?.picture || 'none'} */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="sign-in"
              color="inherit"
              sx={{ order: { xs: 3, md: 0 } }}
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertSeverity} sx={{ width: "100%" }}>
          Logout successfully
        </Alert>
      </Snackbar>
    </>
  );
}
export default Navbar;
