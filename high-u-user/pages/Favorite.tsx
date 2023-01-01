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

import Wig_Product from '../helper/Wig_Product.json';

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
                <Paper className="bg-[#252525] h-full">
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
                                <Grid container spacing={3} className="mb-8">
                        {
                            Wig_Product.slice(0, 7).map((item, i) =>
                                <Grid item xs={4} sm={3} md={2}>
                                    <Link href="/WigProduct">
                                        <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }} >
                                            <CardActionArea>
                                                <CardMedia className="content-overlay" />
                                                <CardMedia
                                                    className="content-image"
                                                    component="img"
                                                    image={item.image}
                                                />
                                                <CardContent className="content-details fadeIn-bottom">
                                                    <Typography gutterBottom component="div" className="text-white font-bold text-md mb-2">
                                                        {item.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        }
                    </Grid>
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
