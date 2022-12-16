import * as React from 'react';
import {
    Grid,
    Paper,
    Container,
    Typography,
    Card,
    CardMedia
} from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import Image from 'next/image'

import { useRouter } from 'next/router';
import Wig_Product from '../../helper/Wig_Product.json';

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
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                หน้าแรก / วิก / ....
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Image 
                                src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369" 
                                alt="image" 
                                width={500}
                                height={550} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

        </ThemeProvider>

    );
}
