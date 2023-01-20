import * as React from 'react';
import {
    Typography,
    Box,
    Grid,
    Tooltip,
    IconButton
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

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


export default function UserHeader() {
    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item className="pt-8 inline-flex" data-aos="fade-up">
                    <Box>
                        <img className="w-36 h-36 rounded-full object-cover" src="../test.png" alt="" />
                    </Box>
                    <Box>
                        <Typography variant='h4' className="text-[#F0CA83] font-bold px-6 pt-8 max-sm:text-[28px]">
                            Matther Alonzo
                        </Typography>
                        <Typography variant='h6' className="text-[#F0CA83] px-6 pb-8">
                            Member
                        </Typography>
                    </Box>
                    {/* <Box className="">
                        <Tooltip title="Sign Out">
                            <IconButton className=" my-10 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-red-500 hover:text-white">
                                <LogoutIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </Box> */}
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}
