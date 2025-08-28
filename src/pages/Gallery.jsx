import React, { useState } from 'react';
import { Modal } from '@mui/material';
import sampleImage from "../assets/images.jpeg";
import UserCard from '../components/usercard/usercard.jsx';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export default function Gallery() {

  const [selected, setSelected] = useState(null);
  // Placeholder artwork data
  const [artworks] = useState([
    { id: 1, title: 'Sunset', image: sampleImage, likes: 5  },
    { id: 2, title: 'Dreamscape', image: sampleImage, likes: 8 },
    { id: 3, title: 'Abstract Flow', image: sampleImage, likes: 3, user: 'Alex Lee' },
    { id: 4, title: 'Ocean Waves', image:  sampleImage, likes: 6, user: 'Sam Green' },
    { id: 5, title: 'Nature Walk', image:  sampleImage, likes: 2, user: 'Chris Blue' },
    { id: 6, title: 'City Lights', image:  sampleImage, likes: 9, user: 'Pat Red' },
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={4}>
        {artworks.map((art) => (
          <Grid item xs={12} sm={6} md={4} key={art.id}>
            <Card onClick={() => setSelected(art)}>
              <CardMedia component="img" height="200" image={art.image} alt={art.title} />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{art.title}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>Likes: {art.likes}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <Box sx={{ position: 'center'}}>
          {selected && (
            <UserCard
              username={selected.user}
              title={selected.title}
              description={selected.description || ''}
              image={selected.image}
              isOpen={true}
              onClose={() => setSelected(null)}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
}

