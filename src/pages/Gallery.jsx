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
              variant="h4"
              align="center"
              sx={{ mb: 8 }}
              margin-bottom="10px"
            >
              WEEKLY CHALLENGE TOPIC
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 10 }}>
              DURATION :
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 10 }}>
              INSTRUCTION/EXPLANATION:
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <AccountCircleOutlinedIcon fontSize="large" /> {/* your icon */}
                <Typography align="center">
                  Create
                  <br />
                  an account.
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" />
              <Box>
                <FileUploadOutlinedIcon fontSize="large" />
                {/* your icon */}
                <Typography align="center">
                  Upload your
                  <br /> artwork image
                </Typography>
              </Box>
              <ArrowRightAltOutlinedIcon fontSize="large" />
              <Box>
                <InsertDriveFileOutlinedIcon fontSize="large" />
                <Typography align="center">
                  Submit your
                  <br />
                  form!
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              component={Link}
              to="/sign-in"
              sx={{ my: 2 }}
            >
              SIGNIN
            </Button>
          </Box>
        </Box>
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
