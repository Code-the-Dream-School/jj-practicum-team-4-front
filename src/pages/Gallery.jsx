import React, { useState, useEffect } from "react";
import formatDateForDisplay from "../util/date.jsx";
import { Divider, Modal } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  Link,
  Snackbar,
  Alert,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import FormModal from "../components/Modal/FormModal.jsx";
import { jwtDecode } from "jwt-decode";
import { getData, postData, patchData, deleteData } from "../util";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Gallery() {
  
  // const { token ,isAuthenticated } = useAuth();
  
  const [shownModal, setShownModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  //const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const [authProcessed, setAuthProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;
  const ARTWORK_URL = `${BASE_URL}/api/prompts/:id/artworks`;
   const LIKE_URL = `${BASE_URL}/api/artwork/`;


 
  const DELETEARTWORK_URL = `${BASE_URL}/api/artwork`;

  useEffect(() => {
    handleGoogleAuthSuccess();
  }, [authProcessed, navigate]);

  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      const p = JSON.parse(storedPrompt);
      setPrompt(p);
      // Fetch artworks when component mounts
      fetchAllArtWorks(p.id);
    }
  }, []);

  const handleGoogleAuthSuccess = async () => {
    const searchParams = new URLSearchParams(location.search);
    const authStatus = searchParams.get("auth");
    const token = searchParams.get("token");
    const userDataParam = searchParams.get("userData");
    if (authStatus === "success" && token && userDataParam && !authProcessed) {
      setIsProcessing(true);
      try {
        // Decode tha user data from URL param
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        console.log("google auth success detected");
        console.log("token from google auth", token);
        console.log("user data from google auth,", userData);

        localStorage.setItem("token", token);
        const userInfo = jwtDecode(token);

        localStorage.setItem("user", JSON.stringify(userInfo));
        console.log("user info", JSON.stringify(userInfo));
        // Clean URL and reload to trigger auth context update
        window.history.replaceState({}, document.title, "/gallery");
        window.location.reload();
      } catch (error) {
        console.log(error);
        window.history.replaceState({}, document.title, "/");
      }
      setAuthProcessed(true);
      setIsProcessing(false);
    }
  };

  const updatedArtworkLikes = async(artworkId) => {
    try {
      const response = await getData(`${LIKE_URL}${artworkId}/likes`, {
         headers: {
            Authorization: `Bearer ${token}`,
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
  };

  const deleteArtwork = async (artworkId) => {
    try {
      await deleteData(`${DELETEARTWORK_URL}/${artworkId}`);
      console.log("Artwork deleted successfully", artworkId);
      // Refetch all artworks again to show the latest
      fetchAllArtWorks(prompt.id);
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };
  const handleDeleteClick = (artworkId) => {
    setSelectedArtworkId(artworkId);
    setConfirmOpen(true);   // show dialog
  };

  const handleConfirmDelete = async () => {
    if (selectedArtworkId) {
      await deleteArtwork(selectedArtworkId);
    }
    setConfirmOpen(false);
    setSelectedArtworkId(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedArtworkId(null);
  };


  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e0e0e0",
            padding: "3em 2em",
            textAlign: "center",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box width="800px">
            <Box
              component="img"
              width="100%"
              src="images/art_illustration.png"
            />
          </Box>
          <Box
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              textTransform="uppercase"
              fontWeight="bold"
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
              {prompt
                ? `${formatDateForDisplay(prompt.startDate)} - ${formatDateForDisplay(prompt.endDate)}`
                : ""}
            </Typography>

            <Typography
              variant="body1"
              align="center"
              fontWeight={600}
              sx={{ mt: 3, maxWidth: "800px", mx: "auto", color: "#3a4a5b" }}
            >
              {prompt ? `${prompt.description}` : ""}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              fontWeight={600}
              sx={{ mb: 4, maxWidth: "800px", mx: "auto", color: "#3a4a5b" }}
            >
              {prompt ? ` ${prompt.rules}` : ""}
            </Typography>
            {!isAuthenticated && (
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
                  <InsertDriveFileOutlinedIcon
                    fontSize="large"
                    sx={{ mb: 1 }}
                  />
                  <Typography align="center">
                    Submit your
                    <br />
                    form!
                  </Typography>
                </Box>
              </Stack>
            )}
            {isAuthenticated && (
              <Box>
                <Button
                  variant="contained"
                  sx={{ px: 10, mt: 4, backgroundColor: "#C86D6D" }}
                  onClick={() => setShownModal(true)}
                >
                  UPLOAD YOUR ARTWORK
                </Button>
                <FormModal
                  shownModal={shownModal}
                  setShownModal={setShownModal}
                />
              </Box>
            )}
          </Box>
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
          <Typography variant="h3" align="center">
            Gallery
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {artworks.map((art) => (
            
            <Grid
              // item
              xs={12}
              sm={6}
              md={4}
              key={art.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                onClick={() => setSelected(art)}
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
                }}
              >
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
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
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
                    {/* <Stack direction="row" spacing={1}> */}
                    <Typography variant="body2" 
                      sx={{ ml: 2, flexShrink: 0 }}>

                      Likes: {art.like_counter}
                    </Typography>
                    {(user?.admin || user?.userId === art.user.id) && (
                    <IconButton
                        onClick={(e) => {
                           e.stopPropagation();
                          handleDeleteClick(art.id);
                        }}
                        // sx={{ bgcolor: "#E6B6B6" }}
                        disabled={saving}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  {/* </Stack> */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this artwork? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
        <Snackbar
          open={authProcessed}
          autoHideDuration={6000}
          onClose={() => setAuthProcessed(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAuthProcessed(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully logged in with Google!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
