import React, { useState } from "react";
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
import hero from "../assets/hero5.png";
import { CssBaseline } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
import UserCard from "../components/usercard/usercard.jsx";

export default function Home() {
  // Placeholder artwork data
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
            backgroundImage: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "35em",
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              pb: 3,
              width: "100%",
              mx: 3,
            }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 8 }}
              color="#f49b6D"
              margin-bottom="10px"
            >
              Turn Art Block Into Art Magic
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="#3e6990"
              sx={{
                mb: 10,
                px: 2,
                fontWeight: 500,
                display: "inline-block",
                maxWidth: { xs: "100%", md: "80%" },
              }}
            >
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
              <Button
                variant="contained"
                component={Link}
                to="/sign-in"
                sx={{
                  backgroundColor: "#aabd8d",
                  color: "#222",
                  "&:hover": { backgroundColor: "#8fa76b" },
                }}
              >
                Join This Week Challenge
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/gallery"
                sx={{
                  backgroundColor: "#aabd8d",
                  color: "#222",
                  "&:hover": { backgroundColor: "#8fa76b" },
                }}
              >
                See weekly challenge artworks →
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Top Most Liked/Voted Artworks Section */}
        <Box sx={{ p: 4, bgcolor: "grey.100", borderRadius: 2 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Top Most Liked/Voted Artworks
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${sortedForDisplay.length}, 1fr)`,
              justifyContent: "center",
              alignItems: "end",
              gap: { xs: 2, md: 6 },
              mt: 4,
              minHeight: 320,
            }}
          >
            {sortedForDisplay.map((art, idx) => {
              // Card sizes: center is largest, sides are smaller, but spacing is always equal
              let width = 220,
                height = 220,
                boxShadow = 2;
              if (idx === centerIndex) {
                width = 320;
                height = 320;
                boxShadow = 6;
              } else if (idx === centerIndex - 1 || idx === centerIndex + 1) {
                width = 260;
                height = 260;
                boxShadow = 4;
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
                      width,
                      height,
                      boxShadow,
                      cursor: "pointer",
                      transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
                      bgcolor: "grey.200",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                    onClick={() => setSelected(art)}
                  >
                    <CardMedia
                      component="img"
                      image={art.image}
                      alt={art.title}
                      sx={{
                        width: "100%",
                        height: height - 100,
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
                  maxWidth: 400,
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
