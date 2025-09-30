import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import UserCard from "../components/usercard/usercard.jsx";
import { getData } from "../util/index.js";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import RecommendIcon from "@mui/icons-material/Recommend";
import heroImg from "../../public/images/hero_img.jpeg";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [artworks, setArtworks] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const ARTWORK_URL = `${BASE_URL}/api/prompts/:id/artworks`;

  const ACTIVE_PROMPT_URL = `${BASE_URL}/api/prompts/active`;

  // Fetch active prompt from backend
  const fetchActivePrompt = async () => {
    try {
      setLoading(true);
      const response = await getData(ACTIVE_PROMPT_URL);
      
      if (response && response?.prompt && response?.challenge) {
        const formatted = {
          id: response.prompt.id,
          title: response.prompt.title,
          description: response.prompt.description,
          rules: response.prompt.rules,
          startDate: response.challenge.start_date,
          endDate: response.challenge.end_date,
          status: response.prompt.is_active ? "ACTIVE" : "CLOSED",
        };
        
        setPrompt(formatted);
        localStorage.setItem("activePrompt", JSON.stringify(formatted));
        fetchAllArtWorks(formatted.id);
      } else {
        setError("No active prompt found");
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
      setError("Failed to load active prompt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      const p = JSON.parse(storedPrompt);
      setPrompt(p);
      fetchAllArtWorks(p.id);
    } else {
      // If no stored prompt, fetch from API
      fetchActivePrompt();
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
  if (!artworks) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log(artworks);

  const topArtworks = [...artworks]
    .sort((a, b) => b.like_counter - a.like_counter)
    .slice(0, 5);

  const centerIndex = Math.floor(topArtworks.length / 2);

  let sortedForDisplay = [];
  if (topArtworks.length === 5) {
    sortedForDisplay = [
      topArtworks[4],
      topArtworks[2],
      topArtworks[0],
      topArtworks[1],
      topArtworks[3],
    ];
  } else {
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
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              align="left"
              fontWeight="bold"
              sx={{
                my: 3,
                mx: { sm: "auto", md: "0px" },
                textAlign: { xs: "center", md: "left" },
              }}
              maxWidth="550px"
            >
              Turn Art Block Into Art Magic
            </Typography>
            <Typography
              sx={{ mb: 7, typography: { xs: "body1", md: "h6" } }}
              color="text.secondary"
            >
              Discover fresh prompts every week. Share your creations. Get
              meaningful feedback. Build your artistic confidence.
            </Typography>

            <Stack
              direction="row"
              gap={2}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
              }}
              flexWrap="wrap"
            >
              <Button variant="contained" component={Link} to="/sign-in">
                join the community &nbsp; <Diversity3Icon />
              </Button>
              <Button variant="outlined" component={Link} to="/gallery">
                Explore Weekly Artworks &nbsp;
                <ArrowRightAltIcon />
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
              src={heroImg}
              alt="Artist painting illustration"
              sx={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: { xs: 0, md: 5, lg: 0 } }} />
        <Box
          sx={{
            p: 4,
            maxWidth: "xl",
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
                variant="h4"
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
              p: 4,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: `repeat(${Math.min(sortedForDisplay.length, 5)}, 1fr)`,
                },
                justifyContent: "center",
                alignItems: "end",
                gap: { xs: 4, md: 4 },
                mt: 4,
                minHeight: { xs: "auto", md: 320 },
                px: { xs: 2, md: 0 },
              }}
            >
              {sortedForDisplay.map((art, idx) => {
                let width = 230,
                  height = 230,
                  boxShadow = 2;
                if (window.innerWidth >= 960) {
                  if (idx === centerIndex) {
                    width = 320;
                    height = 350;
                    boxShadow = 6;
                  } else if (
                    idx === centerIndex - 1 ||
                    idx === centerIndex + 1
                  ) {
                    width = 260;
                    height = 280;
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mx: { xs: "auto", md: 0 },
                        "&:hover": {
                          transform: "scale(1.08)",
                          boxShadow: { xs: 8, md: boxShadow + 6 },
                        },
                        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                      }}
                      onClick={() => setSelected(art)}
                    >
                      <CardMedia
                        component="img"
                        image={art.image_url}
                        alt={art.title}
                        sx={{
                          width: "100%",
                          height: { xs: 180, md: height - 100 },
                          objectFit: "cover",
                          //                    fr
                        }}
                      />
                      <CardContent
                        sx={{ textAlign: "center", width: "100%", pt: 2 }}
                      >
                        {/* <Box> */}
                        <Typography variant="body1" fontWeight={600}>
                          {art.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {art.user.first_name}
                        </Typography>
                        {/* </Box> */}
                        <Typography
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                          variant="body2"
                          color="text.secondary"
                        >
                          <RecommendIcon />
                          {art.like_counter}
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
                      user={selected.user}
                      title={selected.title}
                      description={selected.description}
                      image={selected.image_url}
                      isOpen={true}
                      onClose={() => setSelected(null)}
                    />
                  )}
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Container>
    </>
  );
}
