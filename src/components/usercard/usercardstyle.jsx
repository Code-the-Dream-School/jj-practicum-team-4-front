import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, CardActions } from "@mui/material";

// Outer container
export const StyledBox = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "background.default",
}));

// Card styles
export const StyledCard = styled(Card)(() => ({
  position: "relative",
  maxWidth: 400,
  borderRadius: 12,
  boxShadow: 3,
}));

// Image styles
export const StyledCardMedia = styled(CardMedia)(() => ({
  height: 200,
  objectFit: "cover",
}));

// Placeholder box when no image
export const PlaceholderBox = styled(Box)(() => ({
  height: 200,
  backgroundColor: "#e0e0e0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#757575",
  fontSize: "1rem",
}));

// Centered like button area
export const CenteredActions = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingBottom: "16px",
}));