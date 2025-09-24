
import React, { useState, useEffect } from "react";
import {Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";
import sampleImage from "../../assets/images.jpeg";
import { getData, postData, deleteData } from "../../util";

import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  PlaceholderBox,
  CenteredActions,
} from "./UserCard.styles";

export default function UserCard({
  user ,
  title ,
  description,
  socialLink ,
  image ,
  isOpen = true,
  artworkId,
  likes = 0,
  onLike,
  onClose ,
}) {
  const [liked, setLiked] = useState(false);

  // const handleLike = () => setLiked(true); // disable after one click

  const BASE_URL = import.meta.env.VITE_API_URL;
  const LIKE_URL = `${BASE_URL}/api/artwork/`;

   const currentUser = JSON.parse(localStorage.getItem("user"));
  // const isOwnArtwork = user?.id === currentUser?.id;

  useEffect(() => {
    checkUserLiked();
  }, [artworkId]);

  const checkUserLiked = async () => {
    if (!artworkId) return;
    try {
      const userDetail = JSON.parse(localStorage.getItem("user"));
      //const response = await getData(`${Like_URL}${artworkId}/likes`);
      const response = await getData(`${LIKE_URL}${artworkId}/likes`, {}, {
        headers: { Authorization: `Bearer ${userDetail.token}` },
      });
      // Assume response.likes contains array of users who liked
      const hasLiked = response?.liked_by_me;
      setLiked(hasLiked);
    } catch (err) {
      console.error("Error checking if user liked:", err);
    }
  };

   const handleLike = async () => {
    if (!artworkId ) return;
      // likeArtwork(artworkId);
      // setLiked(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      if (!liked) {
        // Like artwork
        await postData(`${LIKE_URL}${artworkId}/likes`, {}, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setLiked(true);
      } else {
        // Dislike artwork (remove like)
        await deleteData(`${LIKE_URL}${artworkId}/likes`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setLiked(false);
      }
        if (onLike) 
          onLike();
        
    }catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleClose = () => onClose(); // Notify parent

  const getSocialUrl = (link) => {
     if (!link) 
      return null;
      if (link.startsWith("http")) {
    return link;
    } else if (link.startsWith('@')) {
    return `https://instagram.com/${link.slice(1)}`;
  
  } else {
   return `https://${link}`;
     }

}

  if (!isOpen) return null;

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
          <StyledCardMedia component="img" image={image} alt={title} />
        ) : (
          <PlaceholderBox>Image Placeholder</PlaceholderBox>
        )}

        {/* Content */}
        <StyledCardContent  >
          <Typography gutterBottom variant="h4"component="div"
            sx={{ 
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: 'center !important',
              color: 'text.primary',
              width: '100%',
              margin: '0 auto',
            }}>
            {user.first_name || "Unknown User"}
          </Typography>
          <Typography variant="h5" color="text.secondary"component="div"
            sx={{ 
              fontWeight:500,
              lineHeight: 1.3,
              textAlign: 'center !important',
              width: '100%',
              margin: '0 auto',
            }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div"
            sx={{ 
              fontWeight:500,
              lineHeight: 1.3,
              textAlign: 'center !important',
              width: '100%',
              margin: '0 auto',
            }}>
            {description}
          </Typography>
          {socialLink && (
            <Typography variant="body1" color="text.secondary" component="div"
            sx={{ 
              
              lineHeight: 1.3,
              textAlign: 'center !important',
              fontWeight: 500,
              width: '100%',
              margin: '0 auto',
            }}>
              Social Media Link:{" "}
              <a
                href={getSocialUrl(socialLink)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2", textDecoration: "underline" }}
              >
                {socialLink}
              </a>
            </Typography>
          )}
        </StyledCardContent>

        {/* Like button */}
        <CenteredActions>
          <IconButton
            // onClick={handleLike}
            onClick={() => handleLike(artworkId)}
            disabled={liked}
            color={liked ? "primary" : "default"}
            sx={{ fontSize: "1.5rem" }}
          >
            <ThumbUpIcon  sx={{ fontSize: "1.5rem" }}/>
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {liked ? "Liked!" : "Like"}
          </Typography>
        </CenteredActions>
      </StyledCard>
    </StyledBox>
  );
}