import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import hero from "../assets/hero3.png";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }} padding-top="0">
      <Box
        sx={{
          marginTop: "-64px",
          borderRadius: 0,
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          minHeight: 300,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: 1000,
          marginTop: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            pb: 3,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 8 }}
            margin-bottom="10px"
          >
            Turn Art Block Into Art Magic
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 10 }}>
            Discover fresh prompts every week. Share your creations. Get
            meaningful feedback. Build your artistic confidence.
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            WEEKLY CHALLENGE TOPIC
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            DURATION :
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button variant="contained" component={Link} to="/sign-in">
              Join This Week Challenge
            </Button>
            <Button variant="outlined" component={Link} to="/gallery">
              See weekly challenge artworks →
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Top Most Liked/Voted Artworks Section */}
      <Box sx={{ p: 4, bgcolor: "grey.100", borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Top Most Liked/Voted Artworks
        </Typography>
        {/* Future top artworks content goes here */}
      </Box>
    </Container>
  );
}
