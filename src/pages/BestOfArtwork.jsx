import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserCard from "../components/usercard/usercard";
import { getAllData } from "../util";

const baseUrl = import.meta.env.VITE_API_URL;

export default function BestOfArtwork() {
  const [selected, setSelected] = useState(null);
  const [winners, setWinners] = useState(null);
  useEffect(() => {
    getWinnersData();
    getAllPrompt();
  }, []);

  const getWinnersData = async () => {
    try {
      const response = await getAllData(`${baseUrl}/api/challenge/winners`);
      if (!response) {
        throw new Error("Failed to fetch winners data");
      }
      console.log(response);
      setWinners(response);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  const getAllPrompt = async () => {
    try {
      const response = await getAllData(`${baseUrl}/api/prompts/all`);
      if (!response) {
        throw new Error("Failed to fetch all prompt data");
      }
      console.log(response);
    } catch (error) {
      console.log("Failed to fetch");
    }
  };

  if (!winners)
    return (
      <Box
        sx={{
          mt: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters sx={{ py: { sm: 5 } }}>
        <Typography variant="h3" align="center" gutterBottom>
          Best of Artwork
        </Typography>
        <Typography
          sx={{ pt: 3 }}
          variant="h5"
          textTransform="capitalize"
          align="center"
        >
          Featured Masterpieces
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mx: "auto", maxWidth: 600 }}
        >
          Outstanding submissions that earned community recognition!
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 8, mx: 5 }}
        >
          {winners.map((art) => (
            <Grid container key={art.id}>
              <Card onClick={() => setSelected(art)}>
                <CardMedia
                  component="img"
                  height="250"
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
                      Likes: {art.like_counter}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={selected}
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
                username={selected.user?.first_name}
                title={selected.title}
                description={selected.description || ""}
                image={selected.image_url}
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
