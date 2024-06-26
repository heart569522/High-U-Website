import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
} from '@mui/material'
import { Flex, Tab, TabList, Toggle, ToggleItem } from '@tremor/react';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

// IMPORT COMPONENT
import WebsiteView_AreaChart from '@/components/Chart/WebsiteView_AreaChart';
import TopFiveWigView_DonutChart from '@/components/Chart/TopFiveWigView_DonutChart';
import TopFiveWigView_List from '@/components/Chart/TopFiveWigView_List';
import SummaryCard_Chart from '@/components/Chart/SummaryCard_Chart';
import TopThreeFavWig from '@/components/Chart/TopThreeFavWig';
import TopThreeUseAR from '@/components/Chart/TopThreeUseAR';
import { GetSessionParams, getSession } from 'next-auth/react';

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

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context)

  // If the user doesn't have an active session, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: './',
        permanent: false,
      },
    }
  }

  // If the user has an active session, render the protected page
  return {
    props: { session },
  }
}

function Dashboard() {
  const [selectedView, setSelectedView] = useState('chart');
  const [selectTop3, setSelectTop3] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Dashboard | High U Administrator</title></Head>
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
                The number of visitors to the website.
              </Typography>
              <WebsiteView_AreaChart />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Box className="flex justify-between items-center space-x-8">
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
              </Box>
              {selectedView === 'chart' ? (
                <Box className="flex justify-between items-center">
                  <TopFiveWigView_DonutChart />
                </Box>
              ) : (
                <TopFiveWigView_List />
              )}

            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <TabList
                defaultValue="1"
                onValueChange={(value) => setSelectTop3(value === "1")}
                color="slate"
              >
                <Tab color='slate' value="1" text="Top 3 Favorite Wigs" className="font-bold"/>
                <Tab color='slate' value="2" text="Top 3 Use AR Wig" className="font-bold"/>
              </TabList>
              {selectTop3 === true ? (
                <TopThreeFavWig />
              ) : (
                <TopThreeUseAR />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard