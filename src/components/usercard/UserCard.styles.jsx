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
  
}));

// Image styles
export const StyledCardMedia = styled(CardMedia)(() => ({
  height: 300,
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
export const StyledCardContent = styled(CardContent )(() => ({
//  sx: {
    

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"

//  }
}));
// Centered like button area
export const CenteredActions = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingBottom: "16px",
}));

