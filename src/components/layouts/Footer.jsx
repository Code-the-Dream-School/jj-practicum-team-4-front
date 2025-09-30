import { Box, Divider, Typography } from "@mui/material";
import arthiveLogo from "../../../public/images/arthive_logo.png";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        color: "white",
        bgcolor: "primary.main",
        pt: 4,
        display: "flex",
        flexDirection: "column",
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
        <Box component="a" href="/">
          <Box
            component="img"
            src={arthiveLogo}
            alt="Arthive Logo"
            sx={{
              mr: 1,
              width: "100px",
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "white" }} />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            pt: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body1" color="white" sx={{ pr: 5 }}>
            &copy; 2025 CTD - jjj Team 4. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="body2"
              color="#dadada"
              sx={{ textDecoration: "none" }}
              component={Link}
              to="#"
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              color="#dadada"
              sx={{ textDecoration: "none" }}
              component={Link}
              to="#"
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body2"
              color="#dadada"
              sx={{ textDecoration: "none" }}
              component={Link}
              to="#"
            >
              Cookie Policy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
