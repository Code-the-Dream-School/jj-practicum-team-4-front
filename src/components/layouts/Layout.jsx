import React from "react";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xl"
        disableGutters
        sx={{ mt: 8, minHeight: "100vh" }}
      >
        <Box>{children}</Box>
      </Container>
      <Footer />
    </>
  );
}
