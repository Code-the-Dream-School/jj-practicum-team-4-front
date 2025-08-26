import React from 'react';
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6, p: 4, bgcolor: "grey.100", borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {/* HERO SECTION */}
          Hero Section 
        </Typography>
        {/* Future hero content goes here */}
      </Box>

      
       <Box sx={{mb: 6, p: 4, bgcolor: "grey.100", borderRadius: 2 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h6" align="center" gutterBottom>
            WEEKLY CHALLENGE TOPIC
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            DURATION :
          </Typography>
           <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" component={Link} to="/sign-in">
            Join This Week’s Challenge
          </Button>
          <Button  component={Link} to="/gallery">
            See weekly challenge artworks →
          </Button>
        </Stack>
        </Container>
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
  

