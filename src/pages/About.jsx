import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4, textAlign: "left" }}>
        <Typography variant="h3" gutterBottom>
          About ArtHive
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> <br />
          ArtHive is a creative platform designed for artists of all levels who
          want inspiration and community. Each week, the app sends out a unique
          art challenge to spark creativity and encourage participation. Artists
          can upload their work, explore others’ submissions, and engage with
          the community through feedback and support. By combining structured
          challenges with a collaborative space, ArtHive helps artists stay
          motivated, improve their skills, and share their creativity with a
          wider audience.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Objective:</strong> <br />
          ArtHive is for everyone of all skill levels — from amateurs,
          professionals, and students to creative hobbyists — who want to
          improve their craft through consistent challenges and are looking for
          inspiration and fresh ideas.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Pain Point:</strong> <br />
          Many artists struggle to stay motivated and inspired, have their work
          buried under unrelated posts on social media, and rarely receive
          constructive exposure without an existing following — ArtHive offers a
          dedicated space where anyone can share artwork based on specific art
          topics.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Value / Impact:</strong> <br />
          Consistent creative practice in a supportive environment helps artists
          develop their skills, build confidence, and connect globally.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Relatable Story:</strong> <br />
          Ever stared at a blank canvas with no idea what to draw, or posted
          your art only for it to disappear in the feed? ArtHive changes that.
          <br />
          Art block can be frustrating. You sit down to create, but no ideas
          come, and your materials just sit there unused. ArtHive’s weekly
          prompts give artists a reason to pick up the brush or tablet again,
          and the community feedback helps turn that small spark into lasting
          motivation.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          User Stories & Features
        </Typography>
        <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: 600 }}>
          <li>
            Sign in to participate in weekly challenges and upload artwork
          </li>
          <li>View current challenge prompt, rules, and dates</li>
          <li>Submit artwork with image preview and optional social link</li>
          <li>Browse gallery, view and like other submissions</li>
          <li>See top 5 artworks ranked by likes</li>
          <li>Admins can create, edit, and delete prompts and submissions</li>
          <li>Secure admin tools and access control</li>
        </ul>
      </Box>
    </Container>
  );
}
