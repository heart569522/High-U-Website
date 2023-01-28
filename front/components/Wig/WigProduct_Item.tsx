import { useEffect, useState } from 'react';
import {
    Grid,
    Paper,
    Container,
    Typography,
    ImageList,
    ImageListItem,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Skeleton,
} from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Link from 'next/link'

import Wig_Color from '../../helper/Wig_Color.json';
import Wig_Product from '../../helper/Wig_Product.json';

interface MediaProps {
    loading?: boolean;
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

export default function WigProductItem() {
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [loading]);

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', paddingTop: 4, paddingBottom: 2 }}>
                <Container maxWidth="xl" >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-lg rounded-md" />) : (
                                <Typography variant="subtitle1" gutterBottom>
                                    หน้าแรก / วิก / ....
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={5}>
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-[700px] rounded-md" />) : (
                                <img
                                    src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369"
                                    className="max-w-xl w-full"
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-lg rounded-md" />) : (
                                <Typography variant="subtitle1" gutterBottom className="text-stone-600">
                                    Ellen Wille
                                </Typography>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-full text-6xl rounded-md" />) : (
                                <Typography variant="h4" className="my-2">
                                    Cascade | Remy Human Hair Lace Front Wig (Hand-Tied)
                                </Typography>
                            )}
                            <hr data-aos="fade-zoom-in" className="mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-xl rounded-md" />) : (
                                <Typography variant="h5" className="mt-4">
                                    Color
                                </Typography>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-80 rounded-md" />) : (
                                <ImageList
                                    className="w-4/5 overflow-hidden mt-4"
                                    sx={{
                                        height: 350,
                                        '@media (max-width: 1257px)': {
                                            height: 250,
                                        },
                                        '@media (max-width: 991px)': {
                                            height: 310,
                                        },
                                        '@media (max-width: 767px)': {
                                            height: 270,
                                        },
                                        '@media (max-width: 575px)': {
                                            height: 200,
                                        },
                                    }}
                                    cols={5}
                                    rowHeight={0}
                                >
                                    {Wig_Color.map((item) => (
                                        <ImageListItem key={item.image} className="p-2">
                                            <img
                                                className="rounded hover:opacity-80 transition duration-200 ease-in-out"
                                                src={item.image}
                                                alt={item.color}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-xl rounded-md" />) : (
                                <Typography variant="h5" className="mt-8">
                                    Details
                                </Typography>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-full h-24 rounded-md" />) : (
                                <Typography variant="subtitle1" className="text-stone-600 mt-3" >
                                    CASCADE by ELLEN WILLE in SANDY BLONDE ROOTED | Medium Honey Blonde, Light Ash Blonde, and Lightest Reddish Brown blend with Dark Roots
                                </Typography>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-32 rounded-md" />) : (
                                <Grid item className="mt-8 space-x-4 max-sm:text-center" >
                                    <Button variant="contained" className="w-[45%] p-3 bg-red-400 hover:bg-red-500 text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Add Your Favorite</Button>
                                    <Link href="/user/TryAR"><Button variant="contained" className="w-[45%] p-3 bg-[#F0CA83] hover:bg-[#e9aa35] text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Try AR</Button></Link>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <hr data-aos="fade-zoom-in" className="my-10 mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                    <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12} >
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-2xl rounded-md" />) : (
                                <Typography variant="h5">
                                    Recomended
                                </Typography>
                            )}
                        </Grid>
                        {
                            Wig_Product.slice(0, 4).map((item, i) =>
                                <Grid key={i} item xs={6} sm={6} md={3} >
                                    {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-96 rounded-md" />) : (
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

                </Container>
            </Paper>

        </ThemeProvider>

    );
}