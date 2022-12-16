import * as React from 'react';
import {
    Grid,
    Paper,
    Container,
    Typography
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

export default function WigProductItem({ item }: { item: any }) {
    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', paddingTop: 8, paddingBottom: 2 }}>
                <Container maxWidth="xl" >
                    <Grid container>
                        <Typography variant="subtitle1" gutterBottom>
                            หน้าแรก / วิก / ....
                        </Typography>
                    </Grid>
                </Container>
            </Paper>

        </ThemeProvider>

    );
}
