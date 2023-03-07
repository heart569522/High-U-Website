import * as React from 'react';
import {
  Typography,
  Grid,
  TextField
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#303030",
    },
  },
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },

});


export default function MyDetail_Profile_admin() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#303030] font-bold pb-2">Firstname</Typography>
          <TextField
            type='text'
            defaultValue='admin'
            fullWidth
            name='firstname'
            variant='outlined'
            className="font-bold rounded bg-[#303030]"
            inputProps={{
              readOnly: true,
              style: { color: "#FFF" }
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#303030] font-bold pb-2">Lastname</Typography>
          <TextField
            type='text'
            defaultValue='test'
            fullWidth
            name='lastname'
            variant='outlined'
            className="font-bold rounded bg-[#303030]"
            inputProps={{
              readOnly: true,
              style: { color: "#FFF" }
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#303030] font-bold pb-2">Username</Typography>
          <TextField
            type='text'
            defaultValue='admin'
            fullWidth
            name='username'
            variant='outlined'
            className="font-bold rounded bg-[#303030]"
            inputProps={{
              readOnly: true,
              style: { color: "#FFF" }
            }}
            focused
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className="text-[#303030] font-bold pb-2">Email Address</Typography>
          <TextField
            type='email'
            defaultValue='admin@hu.com'
            fullWidth
            name='email'
            variant='outlined'
            className="font-bold rounded bg-[#303030]"
            inputProps={{
              readOnly: true,
              style: { color: "#FFF" }
            }}
            focused
          />
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}
