import React, { useState, useEffect } from "react";
import formatDateForDisplay from "../util/date.jsx";
import { Icon, Modal } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
import { CssBaseline } from "@mui/material";
import UserCard from "../components/usercard/usercard.jsx";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import FormModal from "../components/Modal/FormModal.jsx";
import { getData, postData, patchData, deleteData } from "../util";

const currentUser = JSON.parse(localStorage.getItem("user"));

export default function Gallery() {
  const { isAuthenticated } = useAuth();
  const [shownModal, setShownModal] = useState(false);
  const [selected, setSelected] = useState(null);
  // TODO: Replace with actual authentication logic
  const isLoggedIn = true; // Set to true to simulate logged-in user
  const [prompt, setPrompt]= useState(null);
  const [artworks, setArtworks] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const ARTWORK_URL = `${BASE_URL}/api/prompts/:id/artworks`;
   const LIKE_URL = `${BASE_URL}/api/artwork/`;
  
  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      const p = JSON.parse(storedPrompt);
      setPrompt(p);
      // Fetch artworks when component mounts
      fetchAllArtWorks(p.id);
    }
    
  }, []);

  const updatedArtworkLikes = async(artworkId) => {
    try {
      const response = await getData(`${LIKE_URL}${artworkId}/likes`, {
         headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
      });
      const newLikeCount = response.like_counter;
      setArtworks((prev) =>
        prev.map((artwork) => 
           artwork.id === artworkId ?{...artwork, like_counter: newLikeCount} : artwork
        )
      );          
    } catch (error) {
      console.error(
        "Error updating like count for artwork:",
        error);
    }
  }

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
  }



  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            backgroundColor: "#f5f5f7",
            borderBottom: "1px solid #e0e0e0",
            padding: "3em 2em",
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 3, color: "#2c3e50" }}
            >
              {prompt ? `${prompt.title}` : ""}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              fontWeight={600}
              sx={{ mb: 3, color: "#34495e" }}
            >
              DURATION {prompt ? `: ${formatDateForDisplay(prompt.startDate)} - ${formatDateForDisplay(prompt.endDate)}` : ""}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              fontWeight={600}
              sx={{ mb: 4, maxWidth: "800px", mx: "auto", color: "#3a4a5b" }}
            >
             DESCRIPTION {prompt ? `: ${prompt.description}` : ""}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              fontWeight={600}
              sx={{ mb: 4, maxWidth: "800px", mx: "auto", color: "#3a4a5b" }}
            >
             RULES {prompt ? `: ${prompt.rules}` : ""}
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AccountCircleOutlinedIcon fontSize="large" sx={{ mb: 1 }} />
                <Typography align="center">
                  Create
                  <br />
                  an account.
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FileUploadOutlinedIcon fontSize="large" sx={{ mb: 1 }} />
                <Typography align="center">
                  Upload your
                  <br /> artwork image
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <InsertDriveFileOutlinedIcon fontSize="large" sx={{ mb: 1 }} />
                <Typography align="center">
                  Submit your
                  <br />
                  form!
                </Typography>
              </Box>
            </Stack>
            {isAuthenticated && (
              <>
                <Button
                  variant="contained"
                  sx={{ mt: 4, backgroundColor: "#C86D6D" }}
                  onClick={() => setShownModal(true)}
                >
                  UPLOAD YOUR ARTWORK
                </Button>
                <FormModal
                  shownModal={shownModal}
                  setShownModal={setShownModal}
                />
              </>
            )}
          </Container>
        </Box>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 6, md: 10 },
        }}
      >
        <Box sx={{ width: "100%", mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Gallery
          </Typography>
        </Box>
        <Grid
          container
           spacing={4}
          // spacing={2}
          // alignItems="stretch"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {artworks.map((art) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={art.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card onClick={() => setSelected(art)}
                sx={{
                    width: "320px !important",        
                    height: "300px !important",       
                    maxWidth: "320px !important",
                    minWidth: "320px !important", 
                    maxHeight: "300px !important",
                    minHeight: "300px !important",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    overflow: "hidden",
                    "&:hover": {
                    transform: "translateY(-4px) scale(1.02)",
                    boxShadow: 6,
                    },
                  }}>
                <CardMedia
                  component="img"
                  // height="200"
                  image={art.image_url}
                  alt={art.title}
                  sx={{
                      height: "200px !important",      
                      minHeight: "200px !important",
                      maxHeight: "200px !important",
                      objectFit: "cover",
                      flexShrink: 0,
                     }}
                />
                <CardContent 
                sx={{
                    height: "100px !important",      
                    minHeight: "100px !important",
                    maxHeight: "100px !important",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                    padding: "16px !important",
                   }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ 
                       height: "100%",
                       width: "100%"
                       }}

                  >
                    <Typography variant="h6" 
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        minWidth: 0, // Important for text truncation
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        }}>
                       {art.title}</Typography>
                    <Typography variant="body2" 
                      sx={{ ml: 2, flexShrink: 0 }}>
                      Likes: {art.like_counter}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={!!selected}
          aria-labelledby="modal-artwork-detail"
          disableRestoreFocus
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            {selected && (
              <UserCard
                user={selected.user}
                title={selected.title}
                description={selected.media_tag || selected.description}
                image={selected.image_url}
                isOpen={true}
                socialLink={selected.social_link}
                artworkId={selected.id}
                artwork={selected}
                likes={selected.like_counter}
                onLike={() => updatedArtworkLikes(selected.id)}
                onClose={() => { 
                  setSelected(null);
                  updatedArtworkLikes(selected.id);
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </>
  );
}
