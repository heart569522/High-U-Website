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
    Tabs
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

export default function Favorite() {
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
                                    <TabList onChange={handleChange} className="text-[#F0CA83]" aria-label="Favorite Menu">
                                        <Tab label="My Favorite Wigs" value="1" />
                                        <Tab label="My AR Images" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">

                                </TabPanel>
                                <TabPanel value="2">
                                    
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Container>
                </Paper>
            </ThemeProvider>


        </div>
    );
}
