import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, CardActions, CardContent } from "@mui/material";

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
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: 6,
  },
}));

// Image styles
export const StyledCardMedia = styled(CardMedia)(() => ({
  height: 400,
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
//  Centered Card content styles
export const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingBottom: "0px",
}));
// Centered like button area
export const CenteredActions = styled(CardActions)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingTop: "0px",
  paddingBottom: "16px",
}));
