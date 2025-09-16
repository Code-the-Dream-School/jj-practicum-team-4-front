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
  Link,
} from "@mui/material";
import SubmissionPreview from "../components/Form/SubmissionPreview.jsx";
import SubmissionForm from "../components/Form/SubmissionForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Gallery() {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // TODO: Replace with actual authentication logic
  const isLoggedIn = true; // Set to true to simulate logged-in user
  const [prompt, setPrompt]= useState(null);
  
  useEffect(() => {
    const storedPrompt = localStorage.getItem("activePrompt");
    if (storedPrompt) {
      setPrompt(JSON.parse(storedPrompt));
    }

  }, []);

  // Placeholder artwork data
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
              WEEKLY CHALLENGE TOPIC {prompt ? `: ${prompt.title}` : ""}
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
                  component={Link}
                  to="/upload-artwork"
                  sx={{ mt: 4, backgroundColor: "#C86D6D" }}
                  onClick={() => setOpen(true)}
                >
                  UPLOAD YOUR ARTWORK
                </Button>
                <Modal open={open}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxWidth: 800,
                      width: "90%",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      overflowY: "auto",
                    }}
                  >
                    {step === 1 && (
                      <SubmissionForm setOpen={setOpen} setStep={setStep} />
                    )}
                    {step === 2 && (
                      <SubmissionPreview setOpen={setOpen} setStep={setStep} />
                    )}
                  </Box>
                </Modal>
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
                  height="200"
                  image={art.image}
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
                username={selected.user}
                title={selected.title}
                description={selected.description || ""}
                image={selected.image}
                isOpen={true}
                onClose={() => setSelected(null)}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </>
  );
}
