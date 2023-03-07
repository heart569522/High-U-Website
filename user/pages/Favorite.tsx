import * as React from 'react';
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Link,
    Paper,
    Tab,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
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
import EmptyARImage from '../components/Other/EmptyARImage';

import Wig_Product from '../helper/Wig_Product.json';
import { useEffect, useState } from 'react';
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

export default function Favorite() {
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [loading]);

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <div>
            <ThemeProvider theme={theme}>
                <Head><title>Favorite | High U</title></Head>
                <Paper className="bg-[#252525] h-screen">
                    <Navbar />
                    <Container maxWidth="xl" >
                        <UserHeader />
                        <Box className="w-full py-6" sx={{ typography: 'body1' }}>
                            <TabContext value={value}>
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 bg-[#f0ca8350] rounded-md" />) : (
                                    <Box className="border-b border-[#886828]">
                                        <TabList onChange={handleChange} aria-label="Favorite Menu">
                                            <Tab label="My Favorite Wigs" className="text-[#F0CA83] font-bold" value="1" />
                                            <Tab label="My AR Images" className="text-[#F0CA83] font-bold" value="2" />
                                        </TabList>
                                    </Box>
                                )}
                                <TabPanel value="1">
                                    <Grid container spacing={3} className="mb-8">
                                        {
                                            Wig_Product.slice(0, 7).map((item, i) =>
                                                <Grid key={i} item xs={4} sm={3} md={2}>
                                                    {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-52 bg-[#f0ca8350] rounded-md" />) : (
                                                        <Link href="/user/WigProduct">
                                                            <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }} >
                                                                <CardActionArea>
                                                                    <div className="content-overlay" />
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
                                                    )}
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="2" className="mt-36">
                                    <center>
                                        <EmptyARImage />
                                    </center>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Container>
                </Paper>
            </ThemeProvider>


        </div>
    );
}
