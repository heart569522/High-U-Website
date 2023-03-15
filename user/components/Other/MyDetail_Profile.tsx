import * as React from 'react';
import {
  Typography,
  Grid,
  TextField
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const theme = createTheme({
  palette: {
    primary: {
      main: "#F0CA83",
    },
    secondary: {
      main: "#F08383",
    },
  },
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
});

type User = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export default function MyDetail_Profile() {
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
          <TextField
            type='text'
            fullWidth
            defaultValue={"test"}
            name='firstname'
            variant='outlined'
            className="bg-[#F0ca83] font-bold rounded"
            inputProps={{
              readOnly: true,
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#F0CA83] font-bold pb-2">Lastname</Typography>
          <TextField
            type='text'
            defaultValue='Alonzo'
            fullWidth
            name='lastname'
            variant='outlined'
            className="bg-[#F0ca83] font-bold rounded"
            inputProps={{
              readOnly: true,
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#F0CA83] font-bold pb-2">Username</Typography>
          <TextField
            type='text'
            defaultValue='mtalonz123'
            fullWidth
            name='username'
            variant='outlined'
            className="bg-[#F0ca83] font-bold rounded"
            inputProps={{
              readOnly: true,
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#F0CA83] font-bold pb-2">Email Address</Typography>
          <TextField
            type='email'
            defaultValue='mt-alz@gmail.com'
            fullWidth
            name='email'
            variant='outlined'
            className="bg-[#F0ca83] font-bold rounded"
            inputProps={{
              readOnly: true,
            }}
            focused
          />
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}
