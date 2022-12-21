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
                                <Button variant="contained" className="w-[45%] p-3 bg-red-400 hover:bg-red-500 text-white font-bold text-xl max-sm:text-[16px]">Add Your Favorite</Button>
                                <Button variant="contained" className="w-[45%] p-3 bg-[#F0CA83] hover:bg-[#e9aa35] text-white font-bold text-xl max-sm:text-[16px]">Try AR</Button>
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
                                        <Card variant="outlined" sx={{ maxWidth: 'auto', }} >
                                            <CardActionArea>
                                                <CardMedia
                                                    className='hover:opacity-90 transition duration-200 ease-in-out'
                                                    component="img"
                                                    image={item.image}
                                                />
                                                <CardContent >
                                                    <Typography gutterBottom component="div" className="font-bold text-md mb-2">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-500 text-base">
                                                        {item.brand}
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

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
];
