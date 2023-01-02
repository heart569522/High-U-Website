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
  const [editFirstname, setEditFirstname] = useState('');
  const [editLastname, setEditLastname] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const handleChange = (setState: (value: string) => void) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(event.target.value);
  };
  
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
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                      <TextField
                        type='text'
                        defaultValue='Matther'
                        fullWidth
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
                </TabPanel>
                <TabPanel value="2">
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                      <TextField
                        type='text'
                        defaultValue='Matther'
                        fullWidth
                        name='editFirstname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditFirstname)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Lastname</Typography>
                      <TextField
                        type='text'
                        defaultValue='Alonzo'
                        fullWidth
                        name='editLastname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditLastname)}
                        inputProps={{ style: { color: "#F0CA83" } }} 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Username</Typography>
                      <TextField
                        type='text'
                        defaultValue='mtalonz123'
                        fullWidth
                        name='editUsername'
                        variant='outlined'
                        className="font-bold rounded"
                        focused 
                        onChange={handleChange(setEditUsername)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Email Address</Typography>
                      <TextField
                        type='email'
                        defaultValue='mt-alz@gmail.com'
                        fullWidth
                        name='editEmail'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditEmail)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <hr className="w-full h-[1px] rounded border-0 bg-[#886828] mt-1"></hr>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h6' className="text-[#F0CA83] font-bold pb-2">Update Profile Picture</Typography>
                      
                    </Grid>
                    
                  </Grid>
                </TabPanel>
                <TabPanel value="3">

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
