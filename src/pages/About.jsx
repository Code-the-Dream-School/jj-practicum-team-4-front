
import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Title */}
        <Typography variant="h3" gutterBottom>
          About ArtHive
        </Typography>

        {/* Description */}
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          ArtHive is a creative platform designed for artists of all levels who
          want inspiration and community. Each week, the app sends out a unique
          art challenge to spark creativity and encourage participation. Artists
          can upload their work, explore others’ submissions, and engage with
          the community through feedback and support. By combining structured
          challenges with a collaborative space, ArtHive helps artists stay
          motivated, improve their skills, and share their creativity with a
          wider audience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Objective */}
        <Typography variant="h5" gutterBottom>
          Objective
        </Typography>
        <Typography variant="body1" paragraph>
          ArtHive is for everyone of all skill levels — from amateurs,
          professionals, and students to creative hobbyists — who want to
          improve their craft through consistent challenges and are looking for
          inspiration and fresh ideas.
        </Typography>

        {/* Pain Point */}
        <Typography variant="h5" gutterBottom>
          Pain Point
        </Typography>
        <Typography variant="body1" paragraph>
          Many artists struggle to stay motivated and inspired, have their work
          buried under unrelated posts on social media, and rarely receive
          constructive exposure without an existing following — ArtHive offers a
          dedicated space where anyone can share artwork based on specific art
          topics.
        </Typography>

        {/* Value */}
        <Typography variant="h5" gutterBottom>
          Value / Impact
        </Typography>
        <Typography variant="body1" paragraph>
          Consistent creative practice in a supportive environment helps artists
          develop their skills, build confidence, and connect globally.
        </Typography>

        {/* Story */}
        <Typography variant="h5" gutterBottom>
          Relatable Story
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontStyle: "italic" }}>
          Ever stared at a blank canvas with no idea what to draw, or posted
          your art only for it to disappear in the feed? ArtHive changes that.
          <br />
          Art block can be frustrating. You sit down to create, but no ideas
          come, and your materials just sit there unused. ArtHive’s weekly
          prompts give artists a reason to pick up the brush or tablet again,
          and the community feedback helps turn that small spark into lasting
          motivation.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Features */}
        <Typography variant="h5" gutterBottom>
          User Stories & Features
        </Typography>
        <List dense>
          {[
            "Sign in to participate in weekly challenges and upload artwork",
            "View current challenge prompt, rules, and dates",
            "Submit artwork with image preview and optional social link",
            "Browse gallery, view and like other submissions",
            "See top 5 artworks ranked by likes",
            "Admins can create, edit, and delete prompts and submissions",
            "Secure admin tools and access control",
          ].map((feature, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}