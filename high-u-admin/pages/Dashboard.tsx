import React from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid
} from '@mui/material'

const drawerWidth = 240;

function Dashboard() {
  return (
    <Box
      component="main"
      className="bg-slate-200 h-screen p-5 ml-[240px] max-[899px]:ml-0"
      sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Grid container>
        <Grid xs={12} md={6}>
          <Box className="bg-white w-full h-full rounded-xl p-5">
            <Typography className="text-[#303030] font-bold text-xl">
              Website Views
            </Typography>

          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Box className="bg-white w-full h-full rounded-xl p-5">
            <Typography className="text-[#303030] font-bold text-xl">
              Top 5 Wigs View
            </Typography>

          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Box className="bg-white w-full h-full rounded-xl p-5">
            <Typography className="text-[#303030] font-bold text-xl">
              Top Week AR Wig
            </Typography>

          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Box className="bg-white w-full h-full rounded-xl p-5">
            <Typography className="text-[#303030] font-bold text-xl">
              Members Active
            </Typography>

          </Box>
        </Grid>
      </Grid>


    </Box>

  )
}

export default Dashboard