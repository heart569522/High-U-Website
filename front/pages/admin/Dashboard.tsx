import React from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid
} from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import Bar_Chart from '../../components/Chart/Bar_Chart';
import Donut_Chart from '../../components/Chart/Donut_Chart';

const drawerWidth = 240;

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

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        className="bg-slate-200 h-screen p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Website Views
              </Typography>
              <Typography variant='subtitle1' className="text-[#656565]">
                The number of visitors to the website each day.
              </Typography>
              <Bar_Chart />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Top 5 Wigs View
              </Typography>
              <Typography variant='subtitle1' className="text-[#656565]">
                The most viewed wig show
              </Typography>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Donut_Chart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Donut_Chart />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Top Week AR Wig
              </Typography>

            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Members Active
              </Typography>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard