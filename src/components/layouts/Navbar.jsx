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
import { Alert, Snackbar } from "@mui/material";

const pages = [
  "home",
  "gallery",
  "best of artwork",
  "about",
  "challenge prompt",
];
const settings = ["Profile", "Logout"];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("error");
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setAnchorElUser(null);
      setAlertMessage("Logout Successfully!");
      setAlertOpen(true);
      setAlertSeverity("info");

      setTimeout(() => {
        (navigate("/gallery"), setAlertOpen(false), setAlertMessage(null));
      }, 1000);
    } catch (err) {
      console.error("logout failed:", err);
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

  return (
    <>
      <AppBar>
        <Toolbar disableGutters sx={{ mx: 3 }}>
          <AdbIcon sx={{ display: "flex", mr: 1, order: { xs: 1, md: 0 } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: { xs: 1, md: 0 },
              order: { xs: 2, md: 0 },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ARTHIVE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.slice(0, isAuthenticated ? 5 : 4).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    color="primary"
                    component={Link}
                    to={page.replaceAll(" ", "-")}
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
            {pages.slice(0, isAuthenticated ? 5 : 4).map((page) => (
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
                  <Avatar>
                    {!user ? "U" : user.fullName.charAt(0).toUpperCase()}
                  </Avatar>
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
        // onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          // onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          Logout successfully
        </Alert>
      </Snackbar>
    </>
  );
}
export default Navbar;
