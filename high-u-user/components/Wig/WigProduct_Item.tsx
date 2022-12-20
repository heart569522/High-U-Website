import * as React from 'react';
import {
    Grid,
    Paper,
    Container,
    Typography,
    ImageList,
    ImageListItem
} from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';

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
                        <Grid item xs={12} md={4}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369"
                                className="max-w-lg w-full"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="subtitle1" gutterBottom className="text-stone-600">
                                Ellen Wille
                            </Typography>
                            <Typography variant="h4" className="my-3">
                                Cascade | Remy Human Hair Lace Front Wig (Hand-Tied)
                            </Typography>
                            <Typography variant="h5" className="my-3">
                                Color
                            </Typography>
                            <ImageList
                                className="w-auto overflow-hidden"
                                sx={{
                                    height: 375,
                                    '@media (max-width: 991px)': {
                                        height: 320,
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
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img} className="p-2">
                                        <img
                                            className='imageCircle'
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                            <Typography variant="h5" className="mt-7">
                                Details
                            </Typography>            
                            <Typography variant="subtitle1" className="text-stone-600 mt-3">
                                CASCADE by ELLEN WILLE in SANDY BLONDE ROOTED | Medium Honey Blonde, Light Ash Blonde, and Lightest Reddish Brown blend with Dark Roots
                            </Typography> 
                        </Grid>
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
