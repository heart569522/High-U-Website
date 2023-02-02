import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Paper,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

// IMPORT COMPONENT
import Navbar from "../../components/Navigation/Navigation"
import UserHeader from '../../components/Auth/UserHeader';
import MyDetail_Profile from '../../components/Other/MyDetail_Profile';
import EditProfile_Profile from '../../components/Other/EditProfile_Profile';
import ChangePassword_Profile from '../../components/Other/ChangePassword_Profile';
import Head from 'next/head';

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

export default function Profile() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [loading]);

  const [value, setValue] = React.useState('1');

  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head><title>Profile | High U</title></Head>
        <Paper className="bg-[#252525] h-screen max-[450px]:h-max">
          <Navbar />
          <Container maxWidth="xl" >
            <UserHeader />
            <Box className="w-full py-6" sx={{ typography: 'body1' }}>
              <TabContext value={value}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 bg-[#f0ca8350] rounded-md" />) : (
                  <Box className="border-b border-[#886828]">
                    <TabList onChange={handleMenuChange} aria-label="Favorite Menu">
                      <Tab label="My Profile" className="text-[#F0CA83] font-bold" value="1" />
                      <Tab label="Edit Profile" className="text-[#F0CA83] font-bold" value="2" />
                      <Tab label="Change Password" className="text-[#F0CA83] font-bold" value="3" />
                    </TabList>
                  </Box>
                )}
                <TabPanel value="1">
                  {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-72 bg-[#f0ca8350] rounded-md" />) : (
                    <MyDetail_Profile />
                  )}
                </TabPanel>
                <TabPanel value="2" data-aos="fade-up">
                  <EditProfile_Profile />
                </TabPanel>
                <TabPanel value="3" data-aos="fade-up">
                  <ChangePassword_Profile />
                </TabPanel>
                <hr data-aos="fade-zoom-in" className="w-full h-[1px] rounded border-0 bg-[#886828] mt-3"></hr>
              </TabContext>
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>


    </div>
  );
}