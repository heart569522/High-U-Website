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
import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';
import EditProfile_Profile from '../components/Other/EditProfile_Profile';
import ChangePassword_Profile from '../components/Other/ChangePassword_Profile';
import Head from 'next/head';

interface User {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('http://localhost:3000/api/user_profile/getUserProfile');
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  const [value, setValue] = useState('1');
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
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                        <TextField
                          type='text'
                          fullWidth
                          defaultValue={user?.firstname || ''} // Add a check for null values
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
                          defaultValue={user?.lastname || ''}
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
                          defaultValue={user?.username || ''}
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
                          defaultValue={user?.email || ''}
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
