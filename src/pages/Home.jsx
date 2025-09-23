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
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import hero4 from "../assets/hero4.jpeg";
import { CssBaseline } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
import UserCard from "../components/usercard/usercard.jsx";
import { getData } from "../util/index.js";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Diversity3Icon from "@mui/icons-material/Diversity3";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const ARTWORK_URL = `${BASE_URL}/api/prompts/:id/artworks`;

  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      const p = JSON.parse(storedPrompt);
      setPrompt(p);
      // Fetch artworks when component mounts
      fetchAllArtWorks(p.id);
    }
  }, []);

  const fetchAllArtWorks = async (promptId) => {
    if (!promptId) return;
    try {
      const response = await getData(ARTWORK_URL.replace(":id", promptId));
      if (response && response.items && response.items.length > 0) {
        setArtworks(response.items);
      } else {
        setArtworks([]);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  if (!artworks) return "loading...";

  console.log(artworks);
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
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 6 },
            py: { xs: 3, md: 0 },
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "0 0 50%" },
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 4 },
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              align="left"
              fontWeight="bold"
              sx={{ my: 3, mx: "auto" }}
              textAlign="center"
              width="450px"
            >
              Turn Art Block Into Art Magic
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              Discover fresh prompts every week. Share your creations. Get
              meaningful feedback. Build your artistic confidence.
            </Typography>
            {/* challenge prompt display */}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Button variant="contained" component={Link} to="/sign-in">
                join the community <Diversity3Icon />
              </Button>
              <Button variant="outlined" component={Link} to="/gallery">
                Explore Weekly Artworks <ArrowRightAltIcon />
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              flex: { xs: "0 0 auto", md: "0 0 45%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 3, md: 0 },
              order: { xs: 1, md: 2 },
            }}
          >
            <Box
              component="img"
              src={hero4}
              alt="Artist painting illustration"
              sx={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>
        <Divider />
        {/* Top Most Liked/Voted Artworks Section */}
        <Box
          sx={{
            p: 4,
            // bgcolor: "grey.100",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {prompt && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                textTransform="uppercase"
              >
                {prompt.title}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatDateForDisplay(prompt.startDate)} -{" "}
                {formatDateForDisplay(prompt.endDate)}
              </Typography>
            </Box>
          )}
          <Typography
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
            align="left"
            color="text.secondary"
          >
            Top Rated Artworks <WhatshotIcon sx={{ color: "orange" }} />
          </Typography>

          <Box
            sx={{
              display: "grid",
              width: "fit-content",
              gridTemplateColumns: {
                xs: "1fr", // Single column on mobile
                sm: "repeat(2, 1fr)", // Two columns on small screens
                // md: `repeat(${Math.min(sortedForDisplay.length, 5)}, 1fr)`, // Dynamic on desktop, max 5
                md:
                  sortedForDisplay.length === 1
                    ? "1fr"
                    : sortedForDisplay.length === 2
                      ? "repeat(2, 1fr)"
                      : sortedForDisplay.length === 3
                        ? "repeat(3, 1fr)"
                        : sortedForDisplay.length === 4
                          ? "repeat(4, 1fr)"
                          : "repeat(5, 1fr)",
              },
              justifyItems: "center",
              // gridTemplateColumns: `repeat(${sortedForDisplay.length}, 1fr)`,
              justifyContent: "center",
              alignItems: "end",
              // gap: { xs: 2, md: 6 },
              gap: 1,
              mt: 4,
              minHeight: { xs: "auto", md: 320 }, // Auto height on mobile
              px: { xs: 2, md: 0 },
              flexWrap: "wrap",
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
                    // onClick={() => setSelected(art)}
                  >
                    <CardMedia
                      component="img"
                      image={art.image_url}
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
                        Likes: {art.like_counter}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
          {/* <Modal open={!!selected} onClose={() => setSelected(null)}>
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
                    image={selected.image_url}
                    isOpen={true}
                    onClose={() => setSelected(null)}
                  />
                )}
              </Box>
            </Box>
          </Modal> */}
        </Box>
      </Container>
    </>
  );
}
