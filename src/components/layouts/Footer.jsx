import { Box, Divider, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        color: "white",
        bgcolor: "text.primary",
        pt: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          my: 2,
          mx: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ARTHIVE
          </Typography>
        </Box>
        <Typography variant="body2" color="white">
          &copy; 2024 CTD - jjj Team 4. All rights reserved.
        </Typography>
        <Divider sx={{ borderColor: "white" }} />
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 3 }}
        >
          <Typography variant="body2" color="grey" component={Link} to="#">
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="grey" component={Link} to="#">
            Terms of Service
          </Typography>
          <Typography variant="body2" color="grey" component={Link} to="#">
            Cookie Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
