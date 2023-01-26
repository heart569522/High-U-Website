import React, { useState } from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid
} from '@mui/material'
import { Flex, Toggle, ToggleItem } from '@tremor/react';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

// IMPORT COMPONENT
import DrawerBar from '../../components/Navigation/DrawerBar';
import WebsiteView_AreaChart from '../../components/Chart/WebsiteView_AreaChart';
import TopFiveWigView_DonutChart from '../../components/Chart/TopFiveWigView_DonutChart';
import TopFiveWigView_List from '../../components/Chart/TopFiveWigView_List';
import SummaryCard_Chart from '../../components/Chart/SummaryCard_Chart';
import TopThreeFavWig from '../../components/Chart/TopThreeFavWig';

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
  const [selectedView, setSelectedView] = useState('chart');

  return (
    <ThemeProvider theme={theme}>
      <DrawerBar />
      <Box
        component="main"
        className="bg-slate-200 h-screen p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container spacing={2} className="pb-5">
          <Grid item xs={12}>
            <SummaryCard_Chart />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Website Views
              </Typography>
              <Typography variant='subtitle1' className="text-[#656565]">
                The number of visitors to the website each day.
              </Typography>
              <WebsiteView_AreaChart />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Flex
                spaceX="space-x-8"
                justifyContent="justify-between"
                alignItems="items-center"
              >
                <Box className='flex-col'>
                  <Typography className="text-[#303030] font-bold text-xl">
                    Top 5 Wigs View
                  </Typography>
                  <Typography variant='subtitle1' className="text-[#656565]">
                    The most viewed wig show
                  </Typography>
                </Box>
                <Toggle
                  defaultValue="chart"
                  color="gray"
                  onValueChange={(value) => setSelectedView(value)}
                >
                  <ToggleItem value="chart" icon={PieChartOutlinedIcon} />
                  <ToggleItem value="list" icon={ViewListOutlinedIcon} />
                </Toggle>
              </Flex>
              {selectedView === 'chart' ? (
                <TopFiveWigView_DonutChart />
              ) : (
                <>
                  <TopFiveWigView_List />
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl">
                Top 3 Favorite Wigs
              </Typography>
              <TopThreeFavWig />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard