import React, { useState, useEffect } from "react";
import formatDateForDisplay from "../util/date.jsx";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import hero4 from "../assets/hero4.jpeg";
import { CssBaseline } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
import UserCard from "../components/usercard/usercard.jsx";


export default function Home() {

  const [prompt, setPrompt]= useState(null);
  //    const formatDateForDisplay = (dateString) => {
  //    if (!dateString) return "";
  // //   // const date = new Date(dateString);
  // //   // console.log('Date from server:', date);
  // //   // console.log('Date after locale:', date.toLocaleDateString('en-US'));
  // //   // return date.toLocaleDateString('en-US');
  //    return dateString;
  //  };

  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      setPrompt(JSON.parse(storedPrompt));
    }
    
  }, []);

  const [artworks] = useState([
    {
      id: 1,
      username: "Alex Lee",
      title: "Sunset",
      image: sampleImage,
      likes: 15,
      description: "A beautiful sunset.",
    },
    {
      id: 2,
      username: "Sam Green",
      title: "Dreamscape",
      image: sampleImage,
      likes: 12,
      description: "Dreamy landscape.",
    },
    {
      id: 3,
      username: "Chris Blue",
      title: "Abstract Flow",
      image: sampleImage,
      likes: 10,
      description: "Abstract art.",
    },
    {
      id: 4,
      username: "Pat Red",
      title: "Ocean Waves",
      image: sampleImage,
      likes: 9,
      description: "Waves crashing.",
    },
    {
      id: 5,
      username: "Jamie Yellow",
      title: "Nature Walk",
      image: sampleImage,
      likes: 8,
      description: "Walking in nature.",
    },
    {
      id: 6,
      username: "Taylor Purple",
      title: "City Lights",
      image: sampleImage,
      likes: 7,
      description: "City at night.",
    },
  ]);
  const [selected, setSelected] = useState(null);

  // Sort by likes and get top 5
  const topArtworks = [...artworks]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);
  // Ensure most liked artwork is always in the center visually
  const centerIndex = Math.floor(topArtworks.length / 2);
  // Arrange: [least, 3rd, most, 2nd, least]
  let sortedForDisplay = [];
  if (topArtworks.length === 5) {
    // [2nd least, 3rd most, most, 2nd most, least]
    sortedForDisplay = [
      topArtworks[4],
      topArtworks[2],
      topArtworks[0],
      topArtworks[1],
      topArtworks[3],
    ];
  } else {
    // fallback: center most liked
    sortedForDisplay = [...topArtworks];
    if (topArtworks.length > 1) {
      const [mostLiked] = sortedForDisplay.splice(0, 1);
      sortedForDisplay.splice(centerIndex, 0, mostLiked);
    }
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{  
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "35em",
            position: "relative",
            display: "flex",
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 6 },
            py: { xs: 3, md: 0 },
          }}
        >
          
          
          <Box
            sx={{
              flex: { xs: '1 1 auto', md: '0 0 50%' }, 
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 4 },
              // textAlign: "center",
              // pb: 3,
               width: "100%",
              // mx: 3,
            }}
          >
            <Typography
              variant="h3"
              align="left"
              // align="center"
              sx={{ mb: 6}}
              margin-bottom="10px"
            >
              Turn Art Block Into Art Magic
            </Typography>
            <Typography variant="h5" align="left" sx={{ mb: 5}}>
              Discover fresh prompts every week. Share your creations. Get
              meaningful feedback. Build your artistic confidence.
            </Typography>

            <Typography variant="h6" align="left" fontWeight={600} gutterBottom>
              WEEKLY CHALLENGE TOPIC  {prompt ? `: ${prompt.title}` : ""}
            </Typography>
            <Typography variant="h6" align="left" fontWeight={600} gutterBottom>
              DURATION {prompt ? `: ${formatDateForDisplay(prompt.startDate)} - ${formatDateForDisplay(prompt.endDate)}` : ""}

            </Typography>
            <Stack
              direction="row"
              spacing={2}
              // align="left"
               justifyContent={{ xs: "center", md: "flex-start" }}
              // justifyContent="center"
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
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 45%' }, 
              display:'flex' , 
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 3, md: 0 },
              order: { xs: 1, md: 2 },
            }}
          >
            <Box
              component="img"
              src={hero4} 
              alt="Artist painting illustration"
              sx={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 2, 
              }}
            />
          </Box>
        </Box>
          
        
        {/* Top Most Liked/Voted Artworks Section */}
        <Box sx={{ p: 4, bgcolor: "grey.100",  backgroundSize: "cover",backgroundPosition: "center", }}>
          <Typography variant="h3" align="center" gutterBottom>
            Top Most Liked/Voted Artworks
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
              xs: "1fr", // Single column on mobile
              sm: "repeat(2, 1fr)", // Two columns on small screens
              md: `repeat(${Math.min(sortedForDisplay.length, 5)}, 1fr)`, // Dynamic on desktop, max 5
            },
              // gridTemplateColumns: `repeat(${sortedForDisplay.length}, 1fr)`,
              justifyContent: "center",
              alignItems: "end",
              gap: { xs: 2, md: 6 },
              mt: 4,
              minHeight: { xs: 'auto', md: 320 }, // Auto height on mobile
              px: { xs: 2, md: 0 },
            }}
          >
            {sortedForDisplay.map((art, idx) => {
              // Card sizes: center is largest, sides are smaller, but spacing is always equal
              let width = 220,
                height = 220,
                boxShadow = 2;
              if (window.innerWidth >= 960) { 
              if (idx === centerIndex) {
                width = 320;
                height = 320;
                boxShadow = 6;
              } else if (idx === centerIndex - 1 || idx === centerIndex + 1) {
                width = 260;
                height = 260;
                boxShadow = 4;
              }
            }
              return (
                <Box
                  key={art.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Card
                    sx={{
                      width: { xs: "100%", md: width },
                      maxWidth: { xs: 300, md: width },
                      height: { xs: 280, md: height },
                      boxShadow: { xs: 3, md: boxShadow },
                      cursor: "pointer",
                      transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
                      bgcolor: "grey.200",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      mx: { xs: "auto", md: 0 },
                    }}
                    onClick={() => setSelected(art)}
                  >
                    <CardMedia
                      component="img"
                      image={art.image}
                      alt={art.title}
                      sx={{
                        width: "100%",
                        height: { xs: 180, md: height - 100 },
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                    <CardContent
                      sx={{ textAlign: "center", width: "100%", pt: 2 }}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {art.username}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {art.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Likes: {art.likes}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
          <Modal open={!!selected} onClose={() => setSelected(null)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
              }}
            >
              <Box
                sx={{
                  // maxWidth: 400,
                  maxWidth: { xs: "95%", md: 400 },
                  width: "90%",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selected && (
                  <UserCard
                    username={selected.username}
                    title={selected.title}
                    description={selected.description}
                    image={selected.image}
                    isOpen={true}
                    onClose={() => setSelected(null)}
                  />
                )}
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>
    </>
  );
}
