import React from 'react'
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// IMPORT COMPONENT
import { Box, Toolbar, Grid, Typography, Button, Tab, Container } from '@mui/material';
import Link from 'next/link';
import {
    TabContext,
    TabList,
    TabPanel,
} from '@mui/lab';
import ChangePassword_Profile_admin from '../components/Other/ChangePassword_Profile_admin';
import EditProfile_Profile_admin from '../components/Other/EditProfile_Profile_admin';
import MyDetail_Profile_admin from '../components/Other/MyDetail_Profile_admin';
import Image from 'next/image';


const drawerWidth = 240;
const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#303030",
        },
        secondary: {
            main: "#F0CA83"
        }
    },
});

export default function Profile() {
    const [value, setValue] = React.useState('1');

    const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Head><title>Profile | High U Administrator</title></Head>
            <Container maxWidth="xl">
                <Box
                    component="main"
                    className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                    sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Box className="bg-white w-full h-full rounded-xl pt-5 px-5 shadow-md max-[899px]:pb-3">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="flex items-center justify-center">
                                <Typography variant='h3' className="text-[#303030] font-bold">
                                    Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} className="flex items-center justify-center">
                                <Box className="bg-slate-100 p-2 rounded-lg">
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-user-icon.jpg?alt=media&token=edd06ee7-020c-4436-80ae-2e175acc0584" width={176} height={176} className="w-44 h-auto rounded-lg" alt="profile-image" />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box className="w-full py-6" sx={{ typography: 'body1' }} data-aos="fade-zoom-in">
                                    <TabContext value={value}>
                                        <Box className="border-b border-[#6f6f6f]">
                                            <TabList onChange={handleMenuChange} aria-label="Favorite Menu">
                                                <Tab label="My Profile" className="text-[#303030] font-bold" value="1" />
                                                <Tab label="Edit Profile" className="text-[#303030] font-bold" value="2" />
                                                <Tab label="Change Password" className="text-[#303030] font-bold" value="3" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <MyDetail_Profile_admin />
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <EditProfile_Profile_admin />
                                        </TabPanel>
                                        <TabPanel value="3">
                                            <ChangePassword_Profile_admin />
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </ThemeProvider>


    )
}
