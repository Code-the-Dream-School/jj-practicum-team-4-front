
import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import PaletteIcon from "@mui/icons-material/Palette";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const PageContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#fdfdfd",
  paddingTop: "8rem",
  paddingBottom: "8rem",
});

const Section = styled(Box)(({ theme }) => ({
  marginBottom: "8rem",
  [theme.breakpoints.down('md')]: {
    marginBottom: "6rem",
  },
}));

const IconWrapper = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#f8f9fa",
  marginBottom: "2rem",
  border: "1px solid #e9ecef",
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(6, 0),
  backgroundColor: "#e9ecef",
  height: "1px",
  maxWidth: "200px",
  marginLeft: "auto",
  marginRight: "auto",
}));

export default function About() {
  return (
    <PageContainer>
      <Container 
        maxWidth="md" 
        sx={{ 
          px: { xs: 4, sm: 6, md: 8 },
          textAlign: "center" 
        }}
      >
        
       
        <Section>
         
          <Typography 
              variant="h2" 
              fontWeight="bold"
              textTransform="uppercase"
            sx={{
              fontWeight: 300,
              color: "#2c3e50",
              mb: 4,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em"
            }}
          >
            About ArtHive
          </Typography>
           <IconWrapper sx={{ mx: "auto" }}>
            <PaletteIcon sx={{ fontSize: 36, color: "#6c757d" }} />
          </IconWrapper>
          
          
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 300,
              color: "#6c757d",
              lineHeight: 1.6,
              maxWidth: "600px",
              mx: "auto",
              mb: 0,
              fontSize: { xs: "1.25rem", md: "1.5rem" }
            }}
          >
            A creative sanctuary where artists discover inspiration through 
            weekly challenges and meaningful community connections.
          </Typography>
        </Section>

        <StyledDivider />

       
        <Section>
          <IconWrapper sx={{ mx: "auto" }}>
            <LightbulbIcon sx={{ fontSize: 36, color: "#6c757d" }} />
          </IconWrapper>
          
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 400,
              color: "#2c3e50",
              mb: 3,
              fontSize: { xs: "1.75rem", md: "2.125rem" }
            }}
          >
            Our Purpose
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#495057",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 300
            }}
          >
            ArtHive exists for creators of every level—from passionate beginners 
            to seasoned professionals. We believe that consistent creative practice, 
            paired with supportive community feedback, unlocks artistic potential 
            and fosters genuine creative growth.
          </Typography>
        </Section>

        <StyledDivider />

       
        <Section>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 400,
              color: "#2c3e50",
              mb: 3,
              fontSize: { xs: "1.75rem", md: "2.125rem" }
            }}
          >
            The Challenge We Address
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#495057",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 300
            }}
          >
            Too many talented artists struggle in isolation—facing creative blocks, 
            lacking motivation, and seeing their work disappear in the noise of 
            general social platforms. Every artist deserves a dedicated space 
            where their creativity can flourish and be genuinely appreciated.
          </Typography>
        </Section>

        <StyledDivider />

       
        <Section>
          <IconWrapper sx={{ mx: "auto" }}>
            <GroupsIcon sx={{ fontSize: 36, color: "#6c757d" }} />
          </IconWrapper>
          
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 400,
              color: "#2c3e50",
              mb: 3,
              fontSize: { xs: "1.75rem", md: "2.125rem" }
            }}
          >
            A Creative Community
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#495057",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 300,
              mb: 4
            }}
          >
            Each week brings a fresh creative prompt designed to spark imagination 
            and encourage artistic exploration. Artists share their interpretations, 
            discover diverse perspectives, and build meaningful connections through 
            constructive feedback and mutual support.
          </Typography>
        </Section>

        <StyledDivider />

       
        <Section>
          <IconWrapper sx={{ mx: "auto" }}>
            <TrendingUpIcon sx={{ fontSize: 36, color: "#6c757d" }} />
          </IconWrapper>
          
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 400,
              color: "#2c3e50",
              mb: 3,
              fontSize: { xs: "1.75rem", md: "2.125rem" }
            }}
          >
            Growing Together
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "#495057",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 300
            }}
          >
            Through consistent practice and community engagement, artists develop 
            technical skills, build creative confidence, and form lasting connections 
            with fellow creators around the world. This is where artistic journeys 
            truly begin to flourish.
          </Typography>
        </Section>

        <StyledDivider />
        <Section>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 400,
              color: "#2c3e50",
              mb: 4,
              fontSize: { xs: "1.75rem", md: "2.125rem" }
            }}
          >
            Your Creative Journey
          </Typography>
          
          <Box 
            sx={{ 
              fontStyle: "italic",
              maxWidth: "650px",
              mx: "auto",
              py: 4,
              px: 2,
            }}
          >
            <Typography 
              variant="body1" 
              sx={{
                fontSize: "1.25rem",
                lineHeight: 1.7,
                color: "#495057",
                fontWeight: 300
              }}
            >
              "Every artist knows the frustration of staring at a blank canvas, 
              waiting for inspiration to strike. ArtHive transforms that waiting 
              into doing—turning creative uncertainty into purposeful practice, 
              one weekly challenge at a time."
            </Typography>
          </Box>
        </Section>
        <StyledDivider />
        <Section sx={{ mb: 0 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 500,
              color: "#4c5155ff",
              mb: 4,
              fontSize: { xs: "1.25rem", md: "1.5rem" }
            }}
          >
            What We Offer
          </Typography>
          
          <Box sx={{ maxWidth: "500px", mx: "auto" }}>
            {[
              "Weekly creative challenges and prompts",
              "Supportive artist community feedback", 
              "Gallery showcase for all skill levels",
              "Recognition for outstanding work",
              "Safe space for creative exploration"
            ].map((feature, idx) => (
              <Typography 
                key={idx}
                variant="body1" 
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#495057",
                  fontWeight: 500,
                  mb: 1.5,
                  "&:last-child": { mb: 0 }
                }}
              >
                {feature}
              </Typography>
            ))}
          </Box>
        </Section>

      </Container>
    </PageContainer>
  );
}