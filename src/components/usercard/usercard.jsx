import React, { useState } from "react";
import { CardContent, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";
import sampleImage from "../../assets/images.jpeg";

import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  PlaceholderBox,
  CenteredActions,
} from "./usercardstyle";

export default function UserCard({
  username = "User Name",
  title = "Artwork Title",
  description = "Artwork description goes here...",
  socialLink = "",
  image = sampleImage,
}) {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(true);

  const handleLike = () => setLiked(true); // disable after one click
  const handleClose = () => setOpen(false);

  if (!open) return null;

  return (
    <StyledBox>
      <StyledCard>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Image or placeholder */}
        {image ? (
          <StyledCardMedia component="img" image={sampleImage} alt={username} />
        ) : (
          <PlaceholderBox>Image Placeholder</PlaceholderBox>
        )}

        {/* Content */}
        <CardContent>
          <Typography gutterBottom variant="h6">
            {username}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {socialLink && (
            <Typography variant="body1" color="text.secondary">
              Social Media Link:{" "}
              <a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2", textDecoration: "underline" }}
              >
                {socialLink}
              </a>
            </Typography>
          )}
        </CardContent>

        {/* Like button */}
        <CenteredActions>
          <IconButton
            onClick={handleLike}
            disabled={liked}
            color={liked ? "primary" : "default"}
          >
            <ThumbUpIcon />
          </IconButton>
        </CenteredActions>
      </StyledCard>
    </StyledBox>
  );
}
