import React from 'react';
import { Box, Typography } from '@mui/material';
import Events from './Events';
import Basket from './Basket';

function App() {
  return (
    <Box sx={{ padding: '10px'}}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please explore the events below and add tickets to your basket. After checkout, you'll receive an email confirmation with details for each ticket purchased, including your FIXR login credentials/Ticket PDF.
      </Typography>
      <Events />
      <Basket />
    </Box>    
  );
}

export default App;
