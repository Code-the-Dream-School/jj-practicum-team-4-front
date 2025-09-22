import React, { useState, useEffect } from "react";
import formatDateForDisplay from "../util/date.jsx";
import { Icon, Modal } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
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
  Stack,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import FormModal from "../components/Modal/FormModal.jsx";
import { jwtDecode } from "jwt-decode";
import { postData } from "../util/index.js";

export default function Gallery() {
  const [shownModal, setShownModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [authProcessed, setAuthProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    handleGoogleAuthSuccess();
  }, [authProcessed, navigate]);

  const handleGoogleAuthSuccess = async () => {
    const searchParams = new URLSearchParams(location.search);
    const authStatus = searchParams.get("auth");
    const token = searchParams.get("token");
    const userDataParam = searchParams.get("userData");
    // const code = searchParams.get("code");

    // if (code) {
    //   try {
    //     const response = await postData(`${baseUrl}/auth/google/callback`, {
    //       code,
    //     });
    //     if (response) {
    //       console.log(response);
    //     }
    //     navigate("/gallery");
    //   } catch (error) {
    //     console.error("Google Login failed", error);
    //     navigate("/sign-in");
    //   }
    // }
    // Check if this is a Google auth success redirect
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

  const [artworks] = useState([
    { id: 1, title: "Sunset", image: sampleImage, likes: 5 },
    { id: 2, title: "Dreamscape", image: sampleImage, likes: 8 },
    {
      id: 3,
      title: "Abstract Flow",
      image: sampleImage,
      likes: 3,
      user: "Alex Lee",
    },
    {
      id: 4,
      title: "Ocean Waves",
      image: sampleImage,
      likes: 6,
      user: "Sam Green",
    },
    {
      id: 5,
      title: "Nature Walk",
      image: sampleImage,
      likes: 2,
      user: "Chris Blue",
    },
    {
      id: 6,
      title: "City Lights",
      image: sampleImage,
      likes: 9,
      user: "Pat Red",
    },
  ]);

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
              DURATION{" "}
              {prompt
                ? `: ${formatDateForDisplay(prompt.startDate)} - ${formatDateForDisplay(prompt.endDate)}`
                : ""}
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
              <Card onClick={() => setSelected(art)}>
                <CardMedia
                  component="img"
                  // height="200"
                  image={art.image_url}
                  alt={art.title}
                />
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6">{art.title}</Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Likes: {art.likes}
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
                onClose={() => setSelected(null)}
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
