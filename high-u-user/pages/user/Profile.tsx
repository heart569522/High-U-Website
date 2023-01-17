import React, { useState } from 'react';
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
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';
import MyDetail_Profile from '../components/Other/MyDetail_Profile';
import EditProfile_Profile from '../components/Other/EditProfile_Profile';
import ChangePassword_Profile from '../components/Other/ChangePassword_Profile';

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

  const [value, setValue] = React.useState('1');

  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper className="bg-[#252525] h-screen">
          <Navbar />
          <Container maxWidth="xl" >
            <UserHeader />
            <Box className="w-full py-6" sx={{ typography: 'body1' }}>
              <TabContext value={value}>
                <Box className="border-b border-[#886828]">
                  <TabList onChange={handleMenuChange} aria-label="Favorite Menu">
                    <Tab label="My Details" className="text-[#F0CA83] font-bold" value="1" />
                    <Tab label="Edit Profile" className="text-[#F0CA83] font-bold" value="2" />
                    <Tab label="Change Password" className="text-[#F0CA83] font-bold" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <MyDetail_Profile />
                </TabPanel>
                <TabPanel value="2">
                  <EditProfile_Profile />
                </TabPanel>
                <TabPanel value="3">
                  <ChangePassword_Profile />
                </TabPanel>
                <hr className="w-full h-[1px] rounded border-0 bg-[#886828] mt-3"></hr>
              </TabContext>
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>


    </div>
  );
}
