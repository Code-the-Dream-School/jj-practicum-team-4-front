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
  // maxWidth: 400,
   width:"500px !important",
   height:"650px !important",
   minWidth: "500px !important", 
  maxWidth: "500px !important", 
  minHeight: "650px !important", 
  maxHeight: "650px !important", 
  borderRadius: 12,
  boxShadow: 3,
  display: "flex",
  flexDirection: "column",
  transition:"transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: 6,
  },
}));

// Image styles
export const StyledCardMedia = styled(CardMedia)(() => ({
  //  height: 400,
   height:"350px !important",
   maxHeight: "350px !important",
   minHeight: "350px !important",
   objectFit: "cover",
   width: "100%",
   flexShrink: 0,
   borderRadius: "12px 12px 0 0",
}));

// Placeholder box when no image
export const PlaceholderBox = styled(Box)(() => ({
  height: "350px !important",
  minHeight: "350px !important",
  maxHeight: "350px !important",
  backgroundColor: "#e0e0e0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#757575",
  fontSize: "1rem",
  flexShrink: 0,
  borderRadius: "12px 12px 0 0",
}));
//  Centered Card content styles
export const StyledCardContent = styled(CardContent)(() => ({
  //  flexGrow: 1,
  height:"200px !important",
  minHeight: "200px !important",
  maxHeight: "200px !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", 
  justifyContent: "space-evenly ! important",
  textAlign: "center", 
  width: "100%",
  // paddingBottom: "0px",
  padding:"16px !important",
  overflow: "hidden",
  flexShrink: 0,
  
  "& .MuiTypography-root": {
    wordBreak: "break-word",
    overflow: "hidden",
  },
  
  
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
  height: "80px !important",
  minHeight: "80px !important",
  maxHeight: "80px !important",
  padding: "8px 16px !important",
  flexShrink: 0,
  marginTop: "auto",
}));
