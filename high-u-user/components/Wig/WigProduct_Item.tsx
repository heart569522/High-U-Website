import * as React from 'react';
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
} from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';



import Wig_Color from '../../helper/Wig_Color.json';
import Wig_Product from '../../helper/Wig_Product.json';

import Link from 'next/link'

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

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', paddingTop: 8, paddingBottom: 2 }}>
                <Container maxWidth="xl" >
                    <Grid container>
                        <Grid item xs={12} spacing={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                หน้าแรก / วิก / ....
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={5}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369"
                                className="max-w-xl w-full"
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Typography variant="subtitle1" gutterBottom className="text-stone-600">
                                Ellen Wille
                            </Typography>
                            <Typography variant="h4" className="my-2">
                                Cascade | Remy Human Hair Lace Front Wig (Hand-Tied)
                            </Typography>
                            <hr className="mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                            <Typography variant="h5" className="mt-4">
                                Color
                            </Typography>
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
                            <Typography variant="h5" className="mt-8">
                                Details
                            </Typography>
                            <Typography variant="subtitle1" className="text-stone-600 mt-3">
                                CASCADE by ELLEN WILLE in SANDY BLONDE ROOTED | Medium Honey Blonde, Light Ash Blonde, and Lightest Reddish Brown blend with Dark Roots
                            </Typography>
                            <Grid item className="mt-8 space-x-4 max-sm:text-center">
                                <Button variant="contained" className="w-[45%] p-3 bg-red-400 hover:bg-red-500 text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Add Your Favorite</Button>
                                <Button href="/TryAR" variant="contained" className="w-[45%] p-3 bg-[#F0CA83] hover:bg-[#e9aa35] text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Try AR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr className="my-10 mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                    <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Recomended
                            </Typography>
                        </Grid>
                        {
                            Wig_Product.slice(0, 4).map((item, i) =>
                                <Grid item xs={6} sm={6} md={3}>
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

                </Container>
            </Paper>

        </ThemeProvider>

    );
}