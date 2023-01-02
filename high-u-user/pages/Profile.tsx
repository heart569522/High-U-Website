import * as React from 'react';
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
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                                    <TabList onChange={handleChange} aria-label="Favorite Menu">
                                        <Tab label="My Details" className="text-[#F0CA83] font-bold" value="1" />
                                        <Tab label="Edit Profile" className="text-[#F0CA83] font-bold" value="2" />
                                        <Tab label="Change Password" className="text-[#F0CA83] font-bold" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    
                                </TabPanel>
                                <TabPanel value="2">
                                    
                                </TabPanel>
                                <TabPanel value="3">
                                    
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Container>
                </Paper>
            </ThemeProvider>


        </div>
    );
}
