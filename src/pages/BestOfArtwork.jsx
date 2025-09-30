import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
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
  }, []);

  const getWinnersData = async () => {
    try {
      const response = await getAllData(`${baseUrl}/api/challenge/winners`);
      if (!response) {
        throw new Error("Failed to fetch winners data");
      }
      setWinners(response);
      setPrevPrompt(response[0]?.prompt_id);
    } catch (error) {
      console.log("Failed to fetch data", error);
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
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography
          component="div"
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          textTransform="uppercase"
          fontWeight="bold"
          variant="h3"
          align="center"
        >
          Best of Artwork
          <EmojiEventsIcon color="warning" sx={{ height: 50, width: 50 }} />
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mx: "auto", maxWidth: 700 }}
          color="text.secondary"
        >
          Top submissions from last week’s challenge, recognized by the
          community!
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
          spacing={6}
          justifyContent="center"
          sx={{ width: "100%", my: 5 }}
        >
          {winners.map((art) => (
            <Grid item 
              xs={12} 
              sm={6} 
              md={6} 
              lg={6} 
              xl={6} 
              key={art.id}
              sx={{ display: "flex", justifyContent: "center" }}
              >
              <Card
                onClick={() => setSelected(art)}
                sx={{
                  height: 480,
                  width: 480, 
                  maxWidth: "100%", 
                  display: "flex",
                  flexDirection: "column",
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
                  sx={{
                    objectFit: "cover", 
                    flexShrink: 0, 
                  }}
                />
                <CardContent 
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 130, 
                    p: 2,
                  }}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{ height: "100%" }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6"
                      sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.2,
                          mb: 1,
                        }}
                        >
                          {art.title}
                        </Typography>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={art.media_tag}
                        size="small" 
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
                        flexShrink: 0,
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
