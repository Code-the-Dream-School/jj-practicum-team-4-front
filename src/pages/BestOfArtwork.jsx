import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import sampleImage from "../assets/images.jpeg";
import UserCard from "../components/usercard/usercard";

export default function BestOfArtwork() {
  const [selected, setSelected] = useState(null);
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
  ]);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters sx={{ py: 5 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Best of Artwork
        </Typography>
        <Typography
          sx={{ pt: 3 }}
          variant="h5"
          textTransform="uppercase"
          align="center"
        >
          last week's challenge topic
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mx: "auto", maxWidth: 600 }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam,
          ipsum.
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 8, mx: 5 }}
        >
          {artworks.map((art) => (
            <Grid item xs={12} sm={6} md={4} key={art.id}>
              <Card onClick={() => setSelected(art)}>
                <CardMedia
                  component="img"
                  height="250"
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
