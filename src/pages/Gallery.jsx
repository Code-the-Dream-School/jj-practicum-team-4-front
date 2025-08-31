import React, { useState } from "react";
import { Icon, Modal } from "@mui/material";
import sampleImage from "../assets/images.jpeg";
import hero from "../assets/hero4.png";
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

export default function Gallery() {
  const [selected, setSelected] = useState(null);
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
      <Container maxWidth="lg">
        <Card elevation={2} sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 3, color: "#2c3e50" }}
            >
              WEEKLY CHALLENGE TOPIC
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 3, color: "#34495e" }}>
              DURATION: [Your duration here]
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: "800px", mx: "auto", color: "#3a4a5b" }}>
              INSTRUCTION/EXPLANATION: [Your detailed instructions here]
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AccountCircleOutlinedIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography align="center">
                  Create
                  <br />
                  an account.
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" color="action" />
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FileUploadOutlinedIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography align="center">
                  Upload your
                  <br /> artwork image
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" color="action" />
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <InsertDriveFileOutlinedIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography align="center">
                  Submit your
                  <br />
                  form!
                </Typography>
              </Box>
            </Stack>
            {/* <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                component={Link}
                to="/sign-in"
                sx={{ my: 2 }}
              >
                SIGN IN
              </Button>
            </Box> */}
          </CardContent>
        </Card>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Gallery
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {artworks.map((art) => (
            <Grid item xs={12} sm={6} md={4} key={art.id}>
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
