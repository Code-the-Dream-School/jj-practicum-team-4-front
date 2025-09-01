import React from "react";
import { Box, Typography, Container, Stack, List, ListItem } from "@mui/material";

// Features array defined outside component to prevent recreation on re-renders
const features = [
  "Sign in to participate in weekly challenges and upload artwork",
  "View current challenge prompt, rules, and dates",
  "Submit artwork with image preview and optional social link",
  "Browse gallery, view and like other submissions",
  "See top 5 artworks ranked by likes",
  "Admins can create, edit, and delete prompts and submissions",
  "Secure admin tools and access control"
];

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4, textAlign: "left" }}>
        <Typography variant="h3" gutterBottom>
          About ArtHive
        </Typography>

        <Stack spacing={3}>
          {/* Description */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              ArtHive is a creative platform designed for artists of all levels who
              want inspiration and community. Each week, the app sends out a unique
              art challenge to spark creativity and encourage participation. Artists
              can upload their work, explore others' submissions, and engage with
              the community through feedback and support. By combining structured
              challenges with a collaborative space, ArtHive helps artists stay
              motivated, improve their skills, and share their creativity with a
              wider audience.
            </Typography>
          </Box>

          {/* Objective */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Objective
            </Typography>
            <Typography variant="body1">
              ArtHive is for everyone of all skill levels — from amateurs,
              professionals, and students to creative hobbyists — who want to
              improve their craft through consistent challenges and are looking for
              inspiration and fresh ideas.
            </Typography>
          </Box>

          {/* Pain Point */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Pain Point
            </Typography>
            <Typography variant="body1">
              Many artists struggle to stay motivated and inspired, have their work
              buried under unrelated posts on social media, and rarely receive
              constructive exposure without an existing following — ArtHive offers a
              dedicated space where anyone can share artwork based on specific art
              topics.
            </Typography>
          </Box>

          {/* Value/Impact */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Value / Impact
            </Typography>
            <Typography variant="body1">
              Consistent creative practice in a supportive environment helps artists
              develop their skills, build confidence, and connect globally.
            </Typography>
          </Box>

          {/* Relatable Story */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Relatable Story
            </Typography>
            <Typography variant="body1" paragraph>
              Ever stared at a blank canvas with no idea what to draw, or posted
              your art only for it to disappear in the feed? ArtHive changes that.
            </Typography>
            <Typography variant="body1">
              Art block can be frustrating. You sit down to create, but no ideas
              come, and your materials just sit there unused. ArtHive's weekly
              prompts give artists a reason to pick up the brush or tablet again,
              and the community feedback helps turn that small spark into lasting
              motivation.
            </Typography>
          </Box>

          {/* Features */}
          <Box>
            <Typography variant="h6" gutterBottom>
              User Stories & Features
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                  padding: 0,
                  marginBottom: 1
                }
              }}
            >
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
