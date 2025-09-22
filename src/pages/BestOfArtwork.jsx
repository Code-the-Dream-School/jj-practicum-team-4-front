import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserCard from "../components/usercard/usercard";
import { getAllData } from "../util";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
export default function BestOfArtwork() {
  const [selected, setSelected] = useState(null);
  const [winners, setWinners] = useState(null);
  const [prevPrompt, setPrevPrompt] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;
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

      setPrevPrompt(response?.items[0]);
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

  if (!prevPrompt) {
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
  }
  return (
    <>
      {/* <CssBaseline /> */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography
          component="div"
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="h3"
          align="center"
        >
          Best of Artwork{" "}
          <EmojiEventsIcon color="warning" sx={{ height: 50, width: 50 }} />
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mx: "auto", maxWidth: 600 }}
          color="text.secondary"
        >
          Outstanding submissions that earned community recognition!
        </Typography>
        <Divider sx={{ my: 12 }}>
          <Box>
            <Typography variant="h4" textTransform="uppercase">
              {prevPrompt.title}
            </Typography>
            <Typography variant="body1">{prevPrompt.description}</Typography>
          </Box>
        </Divider>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ width: "100%", my: 5 }}
        >
          {winners.map((art) => (
            <Grid item xl={3} key={art.id}>
              <Card
                onClick={() => setSelected(art)}
                sx={{
                  borderRadius: 0,
                  cursor: "pointer",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="350"
                  image={art.image_url}
                  alt={art.title}
                />
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="h6">{art.title}</Typography>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={art.media_tag}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{
                        ml: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <ThumbUpAltIcon color="action" />
                      {art.like_counter}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
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
              user={selected?.user}
              title={selected.title}
              description={selected.description || ""}
              image={selected.image_url}
              isOpen={true}
              onClose={() => setSelected(null)}
              isLiked={true}
              like_counter={selected.like_counter}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
