
import React from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Layout ({ children }) {
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xl">
        <Box sx={{ py: 4 }}>
          {children}
        </Box>
      </Container>
      {/* Footer can be added in future tickets */}
    </>
  );
};


